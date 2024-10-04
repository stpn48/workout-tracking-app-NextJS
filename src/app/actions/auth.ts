"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function signInWithProvider(provider: Provider) {
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth` },
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
