export default function SpaceDetailsPage({
  params,
}: {
  params: { spaceID: string };
}) {
  return <div>page for {params.spaceID}</div>;
}
