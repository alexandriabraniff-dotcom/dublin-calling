import { redirect } from "next/navigation";

// About is now a section on the location homepage; old /about links land there
export default async function AboutPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  redirect(`/${location}#about`);
}
