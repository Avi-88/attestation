export async function GET(
  request: Request,
  { params }: { params: { spaceID: string } }
) {
  try {
    const slug = params.spaceID;
    console.log(slug);
    return Response.json("hi");
  } catch (error: any) {}
}
