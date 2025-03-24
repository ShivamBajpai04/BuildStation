import { SignIn } from "@clerk/nextjs";

export default function CompanySignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Company Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your company dashboard
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
          afterSignInUrl="/company/dashboard"
          signUpUrl="/company/sign-up"
        />
      </div>
    </div>
  );
}
