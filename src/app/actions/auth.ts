"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function createUser(email: string, password: string) {
  if (!email || !password) {
    return { error: "Unexpected error. Email and password are required." };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { error: loginError.message };
  }

  return { error: null };
}
export async function loginUser(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
export async function signInWithProvider(provider: Provider) {
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth` }, //TODO: Create this api route. (supabase docs)
  });

  if (error) {
    return { error: error.message, url: null };
  }

  return { error: null, url: data.url };
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();
}
