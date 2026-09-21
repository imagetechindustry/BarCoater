import React, { useEffect } from "react";
import AboutStory from "../components/about/AboutStory";
import AboutCapabilities from "../components/about/AboutCapabilities";
import AboutValues from "../components/about/AboutValues";
import AboutVisionMission from "../components/about/AboutVisionMission";
import AboutGlobalPresence from "../components/about/AboutGlobalPresence";
import HomeCertifications from "../components/home/HomeCertifications";
import AboutFAQ from "../components/about/AboutFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ImageTech Industries",
    "description": "Learn about ImageTech Industries, a leading manufacturer of Bar Coaters in India with over 30 years of experience.",
    "publisher": {
      "@type": "Organization",
      "name": "ImageTech Industries"
    }
  };

  return (
    <>
      <SEO 
        title="Bar Coater Manufacturer in India - About ImageTech Industries"
        description="Learn about ImageTech Industries, India's trusted Bar Coater manufacturer with over 30 years of engineering excellence. We specialize in manufacturing precision Bar Coaters for laboratory testing and industrial coating applications. Discover our commitment to producing the highest quality Bar Coaters for printing, packaging, and R&D worldwide."
        keywords={['bar coater manufacturer', 'about bar coater manufacturer', 'bar coater supplier in india', 'precision bar coater company', 'laboratory bar coater factory', 'best bar coater in delhi']}
        schema={aboutSchema}
      />
      <main>
        <AboutStory />
        <AboutCapabilities />
        <AboutValues />
        <AboutVisionMission />
        <HomeCertifications />
        <AboutGlobalPresence />
        <AboutFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default AboutUs;
