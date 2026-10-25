import { HomePage } from "@/components/home-page";
import { en } from "@/copy/en";
import { pageMetadata } from "@/copy/metadata";

export const metadata = pageMetadata(en, "home");

export default function Page() {
  return <HomePage copy={en} />;
}
