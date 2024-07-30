import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { spaceID: string } }
) {
  try {
    const slug = params.spaceID;
    const supabase = createClient();
    const { error, data } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", slug);
    if (error) {
      throw new Error(error.message);
    }
    return Response.json({ message: "Success", data: data }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
