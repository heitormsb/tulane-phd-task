import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/copy/metadata";
import { pt } from "@/copy/pt";

export const metadata = pageMetadata(pt, "home");

export default function Page() {
  return <HomePage copy={pt} />;
}
