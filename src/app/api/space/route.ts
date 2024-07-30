import { ErrorResponse, SuccessResponse, TestimonialConfig } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { Tables } from "@/types/database";

async function handleLogoUpload(file: File, spaceUUID: string) {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  let filePath = `${spaceUUID}.${fileExt}`;
  const { error, data } = await supabase.storage
    .from("spaces-logos")
    .upload(filePath, file);
  if (error) {
    throw new Error(error.message);
  }
  const resData = supabase.storage.from("spaces-logos").getPublicUrl(filePath);
  return {
    publicUrl: resData.data.publicUrl,
    objectId: data.id,
  };
}

async function handleSpaceCreation(spaceData: Tables<"spaces">) {
  const { id, name, owner_id, logo_url, testimonial_config } = spaceData;
  const supabase = createClient();
  const { error, data } = await supabase.from("spaces").insert({
    id,
    name,
    owner_id,
    logo_url,
    testimonial_config,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.getAll("file")[0] as File;
  const name = formData.get("name") as string;
  const config = formData.get("testimonial_config") as string;

  const testimonial_config: TestimonialConfig = JSON.parse(config);

  const spaceUUID = uuid();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let logo_url = "";
  let objId;
  try {
    if (file) {
      const response = await handleLogoUpload(file, spaceUUID);
      logo_url = response.publicUrl;
      objId = response.objectId;
      testimonial_config["logo_url"] = logo_url;
    }

    const resData = await handleSpaceCreation({
      id: spaceUUID,
      name,
      logo_url,
      testimonial_config: JSON.stringify(testimonial_config),
      owner_id: user?.id || "",
    });
    return Response.json(
      { message: "success", data: resData },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("An error occured while creating space - server");
    return Response.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const response = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("spaces")
      .select("id,name, collected_testimonials,logo_url")
      .eq("owner_id", response.data.user?.id);

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json(
      { message: "Success", data: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
