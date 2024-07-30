"use client";

import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Badge } from "@/components/ui/badge";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useFieldArray } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(1, { message: "This is a required field" }),
  header: z.string().min(1, { message: "This is a required field" }),
  message: z.string(),
  questions: z.array(z.string()),
  includeJobPosition: z.boolean(),
  includeRating: z.boolean(),
  includeSocials: z.boolean(),
});

export default function SpaceDialog() {
  const [logo, setLogo] = useState<File | null>();
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [spaceName, setSpaceName] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [question3, setQuestion3] = useState<string>("");
  const [doTitleCompany, setDoTitleCompany] = useState<boolean>(false);
  const [doRating, setDoRating] = useState<boolean>(false);
  const [doSocials, setDoSocials] = useState<boolean>(false);

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     name: "",
  //     header: "",
  //     message: "",
  //     questions: ["", "", ""],
  //     includeJobPosition: false,
  //     includeRating: true,
  //     includeSocials: true,
  //   },
  // });

  //TODO : add zod validation for create space form here

  const [isPending, startTransition] = useTransition();

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
    let config = {
      includeTitleandCompany: doTitleCompany,
      includeRating: doRating,
      includeSocials: doSocials,
      questions: [question1, question2, question3],
    };
    const body: SpaceBody = {
      spaceName,
      header,
      message,
    };

    startTransition(async () => {
      try {
        const data = new FormData();
        if (logo) {
          data.append("file", logo);
        }
        data.append("name", body.spaceName);
        data.append("header", body.header);
        data.append("message", body.message);
        data.append("config", JSON.stringify(config));

        const res = await fetch("/api/space", {
          method: "POST",
          body: data,
        });
        setSpaceName("");
        setMessage("");
        setHeader("");
        setLogo(null);
        setLogoUrl("");
        setOpen(false);
        setQuestion1("");
        setQuestion2("");
        setQuestion3("");
        setDoSocials(false);
        setDoRating(false);
        setDoTitleCompany(false);

        if (!res.ok) {
          throw new Error("There was a error creating your space");
        } else {
          toast({
            variant: "default",
            title: "Success",
            description: "Your space was created successfully",
          });
        }
      } catch (error: any) {
        console.log("failed to create space", error?.message);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "There was a error creating your space",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">Create Space</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto min-w-[95%] xl:min-w-[80%] h-5/6 ">
        <DialogHeader className="p-6">
          <DialogTitle>Create a new Space</DialogTitle>
          <DialogDescription>
            After the Space is created, it will generate a dedicated page for
            collecting testimonials.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-2">
          <div className=" bg-gray-100 p-8 flex h-fit flex-col gap-4 col-span-4 justify-start items-center relative">
            <Badge
              className="absolute top-[-10px] left-4 bg-green-200 text-green-600"
              variant="outline"
            >
              Live preview - Testimonial page
            </Badge>

            <Avatar className="h-16 w-16 ">
              <AvatarImage src={logoUrl} />
              <AvatarFallback className="bg-gray-800 text-white font-extrabold text-lg">
                T
              </AvatarFallback>
            </Avatar>

            <Label
              htmlFor="name"
              className="text-3xl font-extrabold text-gray-600"
            >
              {header || "Header goes here..."}
            </Label>

            <Label
              htmlFor="username"
              className="text-md font-semibold text-gray-500"
            >
              {message || "Your personal message goes here..."}
            </Label>
            <div className="flex flex-col w-full justify-start items-start">
              <Label className="text-lg mb-4 font-semibold underline text-gray-500 underline-offset-4">
                Questions
              </Label>
              <Label
                htmlFor="question1"
                className="mb-2 font-semibold text-gray-500"
              >
                {question1 || "Question 1"}
              </Label>
              <Label
                htmlFor="question2"
                className="mb-2 font-semibold text-gray-500"
              >
                {question2 || "Question 2."}
              </Label>
              <Label
                htmlFor="question3"
                className="mb-2 font-semibold text-gray-500"
              >
                {question3 || "Question 3"}
              </Label>
            </div>
          </div>

          <div className=" bg-gray-100 p-4 flex flex-col col-span-6 gap-4 justify-start">
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
            <div className="">
              <Label htmlFor="title" className="text-right">
                Questions
              </Label>
              <Input
                id="q1"
                placeholder="What did you like about xyz?"
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                className="col-span-3 mb-4"
              />
              <Input
                id="q2"
                placeholder="Would you like to work with xyz again ?"
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                className="col-span-3 mb-4"
              />
              <Input
                id="3"
                placeholder="Anything that you feel that can be improved ?"
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
                className="col-span-3 mb-4"
              />
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="flex flex-col gap-2 justify-center items-start">
                <Label>Title and Company</Label>
                <Switch
                  checked={doTitleCompany}
                  onCheckedChange={() => setDoTitleCompany(!doTitleCompany)}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-start">
                <Label>Include rating</Label>
                <Switch
                  checked={doRating}
                  onCheckedChange={() => setDoRating(!doRating)}
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-start">
                <Label>Include Social links</Label>
                <Switch
                  checked={doSocials}
                  onCheckedChange={() => setDoSocials(!doSocials)}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSpaceCreation}>
            {isPending ? "Loading" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
