import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Protected Main Page</h1>
      <p>Welcome to your protected page!</p>
      <p>Your Clerk ID: {userId}</p>
    </div>
  );
}
