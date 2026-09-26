import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeSelectionCalculator from "../components/home/HomeSelectionCalculator";
import HomeWorkingPrinciple from "../components/home/HomeWorkingPrinciple";
import HomePressApplications from "../components/home/HomePressApplications";
import HomeTroubleshootingFinder from "../components/home/HomeTroubleshootingFinder";
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 8448336036",
        "contactType": "sales",
        "email": "imagetechindustries@gmail.com",
        "areaServed": "IN",
        "availableLanguage": "en"
      }
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave",
        "addressLocality": "Delhi",
        "postalCode": "110045",
        "addressCountry": "IN"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Bar Coaters",
    "image": "https://www.barcoater.com/heroimage.webp",
    "description": "The best Bar Coaters in India. Premium Bar Coaters for laboratory testing, coating application, and quality control.",
    "sku": "BARCOATER-MAIN",
    "mpn": "BARCOATER-MAIN",
    "brand": {
      "@type": "Brand",
      "name": "ImageTech Industries"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "950",
      "validFrom": "2025-01-01",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": "https://www.barcoater.com/",
      "seller": {
        "@type": "Organization",
        "name": "ImageTech Industries"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 4,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 15,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };

  return (
    <>
      <SEO
        title="Bar Coater - Best Bar Coaters Manufacturer in India | ImageTech Industries"
        description="Looking for a high-precision Bar Coater in India? ImageTech Industries provide quality Bar Coater, supplying durable wire wound Bar Coaters for laboratory testing. Order your custom Bar Coater today with fast pan-India delivery."
        keywords={['bar coater', 'bar coaters', 'best bar coater in india', 'bar coater manufacturer', 'wire wound bar coater', 'laboratory bar coater', 'mayer bar coater', 'drawdown bar coater']}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        <HomeHero />
        <HomeProducts />
        <HomeIndustries />
        <HomeAbout />
        <HomeCertifications />
        <HomeWhyChoose />
        <HomeSelectionCalculator />
        <HomeWorkingPrinciple />
        <HomePressApplications />
        <HomeTroubleshootingFinder />
        <HomeFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default Home;
