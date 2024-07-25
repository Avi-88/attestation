import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.getAll("file")[0] as File;
  const name = formData.get("name");
  const header = formData.get("header");
  const message = formData.get("message");

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let imgPath = "";
  console.log("user", user?.id);

  console.log("name", name);
  console.log("header", header);
  console.log("message", message);

  try {
    if (file) {
      const fileExt = file.name.split(".").pop();
      let filePath = `${name}-${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("spaces-logos")
        .upload(filePath, file);
      if (error) {
        throw new Error(error.message);
      }
      const { data } = supabase.storage
        .from("spaces-logos")
        .getPublicUrl(filePath);
      imgPath = data.publicUrl;
    }
    console.log("yo", imgPath);

    const { error, data } = await supabase.from("spaces").insert({
      name: name,
      owner_id: user?.id,
      header: header,
      message: message,
      logo_url: imgPath,
    });
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error: any) {
    console.log("An error occured while creating space - server");
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export function GET(request: Request) {
  return Response.json("hi");
}
