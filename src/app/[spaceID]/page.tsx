"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TestimonialPage = ({ params }: { params: { spaceID: string } }) => {
  useEffect(() => {
    const fetchdata = async () => {
      let resp = await fetch(`/api/space/${params.spaceID}`, {
        method: "GET",
      });
      resp = await resp.json();
      setPageConfig(JSON.parse(resp?.data[0]?.testimonial_config));
    };
    fetchdata();
  }, [params.spaceID]);

  const [pageConfig, setPageConfig] = useState<any>();

  return (
    <>
      <div className="flex justify-start items-center py-4 px-6  shadow-lg">
        <div className="font-bold">Testes</div>
      </div>
      <div className="flex min-h-screen w-full p-8 flex-col justify-start items-center">
        <div className="w-[500px] p-4 bg-white rounded-md flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={pageConfig?.logo_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl text-center font-extrabold text-gray-600 mt-4">
              {pageConfig?.header}
            </h1>
            <h3 className="text-lg text-center text-gray-500">
              {pageConfig?.message}
            </h3>
          </div>
          <div className="w-full">
            <h2 className="font-bold text-gray-600 text-lg mb-2">QUESTIONS</h2>
            {pageConfig?.questions?.map((question: string, index: number) => {
              return (
                <div key={index} className="text-gray-500">
                  • {question}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 w-full justify-center items-center">
            <Button className="w-full flex items-center gap-2 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              Record a video
            </Button>
            <Button className="w-full flex items-center gap-2 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Send in text
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialPage;
