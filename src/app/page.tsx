import { HeroSection } from "@/components/home/HeroSection";
import { ToolGrid } from "@/components/home/ToolGrid";
import { FaqSection } from "@/components/home/FaqSection";
import { SeoContentSection } from "@/components/home/SeoContentSection";
import { RelatedToolsSection } from "@/components/home/RelatedToolsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ToolGrid />
      <SeoContentSection />
      <FaqSection />
      <RelatedToolsSection />
    </>
  );
}
