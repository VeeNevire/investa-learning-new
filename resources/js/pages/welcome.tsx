import AboutSection from '@/components/landing/about-section';
import CtaBanner from '@/components/landing/cta-banner';
import FaqSection from '@/components/landing/faq-section';
import HeroSection from '@/components/landing/hero-section';
import HowItWorksSection from '@/components/landing/how-it-works-section';
import MetricsSection from '@/components/landing/metrics-section';
import ProgramsSection from '@/components/landing/programs-section';
import ServicesSection from '@/components/landing/services-section';
import PublicLayout from '@/layouts/public-layout';

export default function Welcome() {
    return (
        <PublicLayout title="Persiapan Ujian Sertifikasi Pasar Modal">
            <HeroSection />
            <MetricsSection />
            <ProgramsSection />
            <HowItWorksSection />
            <ServicesSection />
            <AboutSection />
            <FaqSection />
            <CtaBanner />
        </PublicLayout>
    );
}
