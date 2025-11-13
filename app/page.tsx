import { SITE_CONFIG } from '../config';
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProductionCapabilities } from "../components/ProductionCapabilities";
import { CooperationSection } from "../components/CooperationSection";
import { QuestionnaireSection } from "../components/QuestionnaireSection";
import { Footer } from "../components/Footer";

export const metadata = {
  title: SITE_CONFIG.meta.title,
  description: SITE_CONFIG.meta.description,
  keywords: SITE_CONFIG.meta.keywords,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <ProductionCapabilities />
        <CooperationSection />
        <QuestionnaireSection />
      </main>
      <Footer />
    </div>
  );
}