import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

export async function UserAvatar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const providerAvatarUrl = user?.user_metadata.avatar_url;

  return (
    <>
      {providerAvatarUrl && <Image width={30} height={30} className="rounded-full" src={providerAvatarUrl} alt="userPfp" />}
      {!providerAvatarUrl && (
        <div className="h-6 w-6 rounded-full bg-red-500 text-white">
          <p>{user?.email?.slice(0, 1) || "U"}</p>
        </div>
      )}
    </>
  );
}
