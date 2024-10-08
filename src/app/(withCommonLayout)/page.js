import Clients from "@/components/FrontendComponent/Clients/Clients";
import BannerSection from "@/components/FrontendComponent/HomePage/BannerSection/BannerSection";
import Overview from "@/components/FrontendComponent/HomePage/Overview/Overview";
import Summary from "@/components/FrontendComponent/HomePage/Summary/Summary";
import ProjectShowcase from "@/components/FrontendComponent/ProjectShowcase/ProjectShowcase";
import Review from "@/components/FrontendComponent/Review/Review";
import ServicesSection from "@/components/FrontendComponent/ServicesSection/ServicesSection";
import Vision from "@/components/Vision/Vision";

export default function Home() {
  return (
    <div>
      <BannerSection></BannerSection>
      <Overview></Overview>
      <Summary></Summary>
      <ServicesSection />
      <Vision />
      <ProjectShowcase />
      <Review />
      <Clients />
    </div>
  );
}
