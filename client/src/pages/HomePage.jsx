import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ImpactSection from '../components/home/ImpactSection';
import ProgramsSection from '../components/home/ProgramsSection';
import DonateSection from '../components/home/DonateSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';
import FloatingLogoButton from '../components/common/FloatingLogoButton';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>She Can Foundation — Empowering Women Through Education & Technology</title>
        <meta name="description" content="She Can Foundation empowers women through education, technology, and opportunity. Join our programs and become part of the change." />
        <meta name="keywords" content="NGO, women empowerment, education, technology, workshops, mentorship" />
        <meta property="og:title" content="She Can Foundation" />
        <meta property="og:description" content="Empowering women through education, technology, and opportunity." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://shecanfoundation.org" />
      </Helmet>

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ImpactSection />
        <ProgramsSection />
        <DonateSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <FloatingLogoButton />

      <Footer />
    </>
  );
};

export default HomePage;
