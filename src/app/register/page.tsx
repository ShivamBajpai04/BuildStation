import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Register | AI SaaS",
  description: "Create your account and get started",
};

export default function RegisterPage() {
  return (
    <main className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Fill out the form below to get started with your plan
          </p>
        </div>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <form className="space-y-4">
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <Button className="w-full">Sign Up</Button>
          </form>
          
          <div className="mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
