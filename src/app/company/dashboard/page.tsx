import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export default async function CompanyDashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/company/sign-in");
  }

  // Check if user has company role
  const userRole = user?.publicMetadata?.role;
  if (userRole !== "company") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Company Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Listings Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-600 mt-2">No active listings</p>
          </div>

          {/* Applications Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-gray-600 mt-2">No new applications</p>
          </div>

          {/* Company Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
            <p className="text-gray-600">
              Company Name: {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-600">
              Email: {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-600">
            <p>No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
}
