import { PricingPage } from "@/components/pricing-page";
import { en } from "@/copy/en";
import { pageMetadata } from "@/copy/metadata";

export const metadata = pageMetadata(en, "pricing");

export default function Page() {
  return <PricingPage copy={en} />;
}
