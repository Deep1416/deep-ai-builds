import { JsonLd } from "@/components/common/json-ld";
import { HomePage } from "@/features/home/pages/home-page";
import { homeJsonLd, homeMetadata } from "@/features/home/seo";

export const metadata = homeMetadata;

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomePage />
    </>
  );
}
