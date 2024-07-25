import { createClient } from "@/utils/supabase/server";

export default async function getCurrentUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}
