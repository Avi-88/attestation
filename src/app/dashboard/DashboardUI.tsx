"use client";
import { Space } from "@/types";
import { useState, useEffect, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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
    <div className="w-5/6">
      {isPending ? (
        "Loading"
      ) : spaces.length > 0 ? (
        <div className="grid md:grid-cols-2 auto-rows-auto grid-cols-1 lg:grid-cols-3  gap-2  justify-around items-center w-full">
          {spaces.map((space: Tables<"spaces">, index: number) => {
            return (
              <Link href={`/space/${space.id}`} key={index}>
                <Card className="">
                  <CardHeader>
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>
                      {space.testimonial_ids?.length ?? 0} total testimonials
                      collected so far
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        "You dont seem to have any spaces , maybe create"
      )}
    </div>
  );
}
