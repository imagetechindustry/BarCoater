import React, { useEffect } from "react";
import CertificationsHero from "../components/certifications/CertificationsHero";
import CertificateDisplay from "../components/certifications/CertificateDisplay";
import CertificationScope from "../components/certifications/CertificationScope";
import CertificationsFAQ from "../components/certifications/CertificationsFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Certifications = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Certifications | ImageTech Industries",
    "description": "ISO 9001:2015 Certified Manufacturer of Bar Coaters. We adhere to global standards of quality and excellence.",
  };

  return (
    <>
      <SEO 
        title="Certified Bar Coater Manufacturer - ISO 9001:2015 | ImageTech Industries"
        description="ImageTech Industries is an ISO 9001:2015 certified Bar Coater manufacturer committed to rigorous international quality benchmarks. Every precision Bar Coater undergoes strict dimensional testing and surface inspection for flawless laboratory coating results. Explore our certified Bar Coater standards and quality assurance processes."
        keywords={['certified bar coater manufacturer', 'ISO 9001 bar coater', 'bar coater quality standards', 'precision bar coater inspection']}
        schema={certSchema}
      />
      <div className="flex flex-col min-h-screen">
        <CertificationsHero />
        <CertificateDisplay />
        <CertificationScope />
        <CertificationsFAQ />

        {/* Reusing HomeCTA for consistency */}
        <div className="bg-slate-50 pt-16 pb-24 border-t border-gray-200">
          <HomeCTA />
        </div>
      </div>
    </>
  );
};

export default Certifications;
