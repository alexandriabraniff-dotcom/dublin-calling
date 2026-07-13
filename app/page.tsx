import { redirect } from "next/navigation";

// Redirect root to the Adelaide (Toronto) location by default
export default function RootPage() {
  redirect("/adelaide");
}
