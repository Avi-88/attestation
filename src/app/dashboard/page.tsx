import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SpaceDialog from "@/components/spaceForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Create Space</Button>
      </DialogTrigger>
      <SpaceDialog />
    </Dialog>
  );
}

export default Dashboard;
