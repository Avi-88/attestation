import { createClient } from "@/utils/supabase/client";

export async function signUpWithEmailAndPassword(payload: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  if (error) throw error;
  return JSON.stringify(data);
}

export async function signInWithEmailAndPassword(payload: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  if (error) throw error;
  return JSON.stringify(data);
}
