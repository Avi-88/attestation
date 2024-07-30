"use client";
import { Space } from "@/types";
import { useState, useEffect, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database";
import { toast } from "@/components/ui/use-toast";

type DashboardUIProps = {
  user: User;
};

export default function DashboardUI(props: DashboardUIProps) {
  const { user } = props;
  const supabase = createClient();
  const [spaces, setSpaces] = useState<any>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const res = await fetch("/api/space", {
        method: "GET",
      });
      const dataObj = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "There was a error while fetching your spaces :(",
        });
      }
      setSpaces(dataObj.data);
    });
  }, [user, supabase]);

  return (
    <div>
      {isPending ? (
        "Loading"
      ) : spaces.length > 0 ? (
        <div>
          {spaces.map((space: Tables<"spaces">, index: number) => {
            return <p key={index}>{space.name}</p>;
          })}
        </div>
      ) : (
        "You dont seem to have any spaces , maybe create"
      )}
    </div>
  );
}
