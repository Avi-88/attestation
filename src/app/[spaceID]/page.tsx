"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TestimonialPage = ({ params }: { params: { spaceID: string } }) => {
  useEffect(() => {
    const fetchdata = async () => {
      let resp = await fetch(`/api/space/${params.spaceID}`, {
        method: "GET",
      });
      resp = await resp.json();
      console.log("data", resp);
      setPageConfig(resp?.data[0]);
    };
    fetchdata();
  }, [params.spaceID]);

  const [pageConfig, setPageConfig] = useState<any>();

  return (
    <>
      <div className="flex justify-start items-center py-4 px-6  shadow-lg">
        <div className="font-bold">Testes</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
            
        </div>
      </div>
    </>
  );
};

export default TestimonialPage;
