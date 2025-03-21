import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, UserJSON } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const maxDuration = 10; // Set max duration to 10 seconds

export async function POST(req: Request) {
  try {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      return new Response("Missing SIGNING_SECRET", { status: 500 });
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Verification error", { status: 400 });
    }

    const eventType = evt.type;
    const data = evt.data as UserJSON;
    const { id, email_addresses, username, web3_wallets } = data;

    // Process the webhook event
    switch (eventType) {
      case "user.created": {
        const primaryEmail = email_addresses?.[0]?.email_address;
        if (!primaryEmail) {
          return new Response("No email address found", { status: 400 });
        }

        try {
          // Test database connection
          await prisma.$connect();

          await prisma.user.create({
            data: {
              clerk_id: id,
              email: primaryEmail,
              user_name: username || null,
              wallet_address: web3_wallets?.[0]?.web3_wallet || "",
            },
          });
        } catch (error) {
          console.error("Error creating user:", error);
          // Check if it's a connection error
          if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2010"
          ) {
            return new Response("Database connection error", { status: 503 });
          }
          return new Response("Error creating user", { status: 500 });
        } finally {
          await prisma.$disconnect();
        }
        break;
      }

      case "user.updated": {
        const updatedEmail = email_addresses?.[0]?.email_address;
        if (!updatedEmail) {
          return new Response("No email address found", { status: 400 });
        }

        try {
          await prisma.$connect();
          await prisma.user.update({
            where: { clerk_id: id },
            data: {
              email: updatedEmail,
              user_name: username || null,
              wallet_address: web3_wallets?.[0]?.web3_wallet || "",
            },
          });
        } catch (error) {
          console.error("Error updating user:", error);
          if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2010"
          ) {
            return new Response("Database connection error", { status: 503 });
          }
          return new Response("Error updating user", { status: 500 });
        } finally {
          await prisma.$disconnect();
        }
        break;
      }

      case "user.deleted": {
        try {
          await prisma.$connect();
          await prisma.user.delete({
            where: { clerk_id: id },
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2010"
          ) {
            return new Response("Database connection error", { status: 503 });
          }
          return new Response("Error deleting user", { status: 500 });
        } finally {
          await prisma.$disconnect();
        }
        break;
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
