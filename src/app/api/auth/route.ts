import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Always redirect to /dashboard on successful login
      return NextResponse.redirect(`${origin}/dashboard?success=true`);
    } else {
      // Redirect with error query param on failure
      return NextResponse.redirect(`${origin}/dashboard?error=${encodeURIComponent(error.message)}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login`);
}
