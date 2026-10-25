import { PricingPage } from "@/components/pricing-page";
import { pageMetadata } from "@/copy/metadata";
import { pt } from "@/copy/pt";

export const metadata = pageMetadata(pt, "pricing");

export default function Page() {
  return <PricingPage copy={pt} />;
}
