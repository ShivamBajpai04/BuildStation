import { SignUp } from "@clerk/nextjs";

export default function CompanySignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Company Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your company account
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
          afterSignUpUrl="/company/dashboard"
          signInUrl="/company/sign-in"
        />
      </div>
    </div>
  );
}
