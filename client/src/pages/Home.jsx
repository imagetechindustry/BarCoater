import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Home = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageTech Industries",
    "url": "https://www.barcoater.com/",
    "logo": "https://www.barcoater.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9811000000",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Bar Coaters",
    "image": "https://www.barcoater.com/heroimage.webp",
    "description": "The best Bar Coaters in India. Premium Bar Coaters for laboratory testing, coating application, and quality control.",
    "brand": {
      "@type": "Brand",
      "name": "ImageTech Industries"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <>
      <SEO 
        title="Best Bar Coaters in India | ImageTech Industries"
        description="Looking for the best Bar Coaters in India? ImageTech Industries supplies premium Small Size and Big Size Bar Coaters for flawless coating evaluation."
        keywords={['best bar coaters in india', 'bar coaters supplier', 'small size bar coater', 'big size bar coater', 'laboratory bar coater']}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        <HomeHero />
        <HomeProducts />
        <HomeIndustries />
        <HomeAbout />
        <HomeCertifications />
        <HomeWhyChoose />
        <HomeFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default Home;
