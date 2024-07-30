import SpaceDialog from "@/components/spaceForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardUI from "./DashboardUI";

async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <div className="flex flex-col justify-start p-8 gap-6 items-center min-h-screen bg-gray-100">
      <div className="flex w-5/6 justify-end items-center">
        <SpaceDialog />
      </div>

      <DashboardUI user={user} />
    </div>
  );
}

export default Dashboard;
