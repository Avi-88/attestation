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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <DashboardUI user={user} />
      <SpaceDialog />
    </div>
  );
}

export default Dashboard;
