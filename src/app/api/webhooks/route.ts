import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, UserJSON } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

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

    // Connect to MongoDB
    await connectDB();

    // Process the webhook event
    switch (eventType) {
      case "user.created": {
        const primaryEmail = email_addresses?.[0]?.email_address;
        if (!primaryEmail) {
          return new Response("No email address found", { status: 400 });
        }

        try {
          await User.create({
            clerk_id: id,
            email: primaryEmail,
            user_name: username || null,
            wallet_address: web3_wallets?.[0]?.web3_wallet || "",
          });
        } catch (error) {
          console.error("Error creating user:", error);
          return new Response("Error creating user", { status: 500 });
        }
        break;
      }

      case "user.updated": {
        const updatedEmail = email_addresses?.[0]?.email_address;
        if (!updatedEmail) {
          return new Response("No email address found", { status: 400 });
        }

        try {
          await User.findOneAndUpdate(
            { clerk_id: id },
            {
              email: updatedEmail,
              user_name: username || null,
              wallet_address: web3_wallets?.[0]?.web3_wallet || "",
            }
          );
        } catch (error) {
          console.error("Error updating user:", error);
          return new Response("Error updating user", { status: 500 });
        }
        break;
      }

      case "user.deleted": {
        try {
          await User.findOneAndDelete({ clerk_id: id });
        } catch (error) {
          console.error("Error deleting user:", error);
          return new Response("Error deleting user", { status: 500 });
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
