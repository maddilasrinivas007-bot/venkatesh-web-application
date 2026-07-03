import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero';
import { FeaturesSection, TrustedBySection, ConstitutionSection } from '@/components/landing/features';
import { AdvocatesSection, ResearchSection } from '@/components/landing/advocates';
import { DocumentGeneratorSection, HighCourtSection } from '@/components/landing/content-sections';
import { GovernmentNotificationsSection, BlogSection, NewsletterSection } from '@/components/landing/blog-newsletter';
import { TestimonialsSection, FAQSection, CTASection } from '@/components/landing/sections';
import { ContactSection } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <DocumentGeneratorSection />
      <ConstitutionSection />
      <ResearchSection />
      <HighCourtSection />
      <GovernmentNotificationsSection />
      <AdvocatesSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </main>
  );
}
