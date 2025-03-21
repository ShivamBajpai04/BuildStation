import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, UserJSON } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
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
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
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
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;
  const data = evt.data as UserJSON;
  const { email_addresses, username, web3_wallets } = data;

  try {
    switch (eventType) {
      case "user.created":
        const primaryEmail = email_addresses?.[0]?.email_address;

        if (!primaryEmail) {
          throw new Error("No email address found for user");
        }

        await prisma.user.create({
          data: {
            email: primaryEmail,
            user_name: username || null,
            wallet_address: web3_wallets[0].web3_wallet,
          },
        });
        break;

      case "user.updated":
        const updatedEmail = email_addresses?.[0]?.email_address;

        if (!updatedEmail) {
          throw new Error("No email address found for user");
        }

        await prisma.user.update({
          where: { email: updatedEmail },
          data: {
            email: updatedEmail,
            user_name: username || null,
            wallet_address: web3_wallets[0].web3_wallet,
          },
        });
        break;

      case "user.deleted":
        await prisma.user.delete({
          where: { email: email_addresses?.[0]?.email_address },
        });
        break;
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
