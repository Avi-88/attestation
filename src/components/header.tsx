"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const [user, setUser] = useState<object | null>();

  const handelSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast({
        title: "Sucessfully logged out",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Failed to signout:",
        description: `${error?.message || "unexpected error occured"}`,
      });
    }
  };

  return (
    <div className="flex justify-between items-center py-3 px-6  shadow-lg">
      <div className="font-bold">Testes</div>
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handelSignOut}>Sign out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/auth")}>Log in</Button>
        )}
      </div>
    </div>
  );
}
