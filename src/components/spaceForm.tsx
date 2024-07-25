"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "./ui/use-toast";

export default function SpaceDialog() {
  const [logo, setLogo] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [spaceName, setSpaceName] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const supabase = createClient();
  const maxFileSize = 1024 * 1024 * 2;

  type SpaceBody = {
    spaceName: string;
    header: string;
    message: string;
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      if (e.target.files[0].size > maxFileSize) {
        toast({
          variant: "destructive",
          title: "Please select a smaller file",
          description: "Max supported file size currently is 2MB",
        });
      } else {
        setLogo(e.target.files[0]);
        setLogoUrl(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleSpaceCreation = async () => {
    const body: SpaceBody = {
      spaceName,
      header,
      message,
    };

    try {
      const data = new FormData();
      if (logo) {
        data.append("file", logo);
      }
      data.append("name", body.spaceName);
      data.append("header", body.header);
      data.append("message", body.message);

      const res = await fetch("/api/space", {
        method: "POST",
        body: data,
      });
      console.log(res);
    } catch (error: any) {
      console.log("failed to create space", error?.message);
    }
  };

  return (
    <DialogContent className="overflow-auto min-w-[95%] xl:min-w-[80%] h-5/6 grid grid-cols-2 gap-2">
      <div className=" bg-gray-100 p-4 flex flex-col gap-4 justify-start">
        <div className="">
          <Label htmlFor="name" className="text-right">
            {spaceName || "Name your space"}
          </Label>
        </div>
        <div className="">
          <Label htmlFor="username" className="text-right">
            {header || "Name your header"}
          </Label>
        </div>
      </div>

      <div className=" bg-gray-100 p-4 flex flex-col gap-4 justify-start">
        <div className="">
          <Label htmlFor="name" className="text-right">
            Space name
          </Label>
          <Input
            id="name"
            onChange={(e) => setSpaceName(e.target.value)}
            value={spaceName}
            placeholder="e.g. 'Testamonials for xyz'"
            className="col-span-3"
          />
        </div>
        <div className="">
          <Label htmlFor="logo" className="text-right">
            Logo
          </Label>
          <div className="flex justify-start items-center gap-4">
            <Avatar>
              <AvatarImage src={logoUrl} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <Input
              id="logo"
              onChange={handleLogoSelect}
              type="file"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="">
          <Label htmlFor="title" className="text-right">
            Header title
          </Label>
          <Input
            id="title"
            placeholder="Would you like to give a shoutout to xyz ?"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="">
          <Label htmlFor="message" className="text-right">
            Your custom message
          </Label>
          <Textarea
            id="message"
            placeholder="Write a warm message to your customer, and give them simple directions on how to make the best testamonial."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" onClick={handleSpaceCreation}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
