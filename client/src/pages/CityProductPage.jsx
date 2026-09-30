import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Shield,
  Truck,
  Target,
  CheckCircle2,
  Settings,
  Layout,
  ArrowRight,
  Maximize,
  Activity,
} from "lucide-react";
import { useLocation as useLocationQuery, useProduct } from "../services/api";
import SEO from "../components/common/SEO";
import NotFound from "../components/common/NotFound";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
  Activity: <Activity className="w-6 h-6 text-blue-600" />,
};

const CityProductPageSkeleton = () => (
  <div className="bg-[#f8f9fa] min-h-screen py-6 lg:py-10 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-36 bg-slate-200 rounded"></div>
      </div>

      {/* Main Product Card Skeleton */}
      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12 mb-12">
        {/* Left: Image Skeleton */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="aspect-square bg-slate-100 rounded-2xl border border-slate-100"></div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-square bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="h-6 w-48 bg-blue-100 rounded-full"></div>
          <div className="h-10 w-4/5 bg-slate-200 rounded-xl"></div>
          <div className="h-5 w-3/5 bg-slate-200 rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-14 w-full sm:w-56 bg-blue-600/30 rounded-full"></div>
            <div className="h-14 w-full sm:w-56 bg-emerald-600/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const isInvalidSlug = (slug) =>
  !slug || slug.includes(".") || slug === "robots" || slug === "sitemap";

const CityProductPage = () => {
  const { locationSlug, productSlug } = useParams();
  const invalid = isInvalidSlug(locationSlug) || isInvalidSlug(productSlug);

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Image Zoom State
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setActiveTab("overview");
  }, [locationSlug, productSlug]);

  const {
    data: location,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
    refetch: refetchLocation,
  } = useLocationQuery(locationSlug, { enabled: !invalid });

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProduct(productSlug, { enabled: !invalid });

  if (invalid || (isLocationError && locationError?.status === 404)) {
    return (
      <NotFound
        title="Product or Location Not Found"
        message={`We could not find the requested combination of "${locationSlug}" and "${productSlug}". Please verify the location and product or browse our sitemap.`}
      />
    );
  }

  if (isLocationLoading || (isProductLoading && !product)) {
    return <CityProductPageSkeleton />;
  }

  if (isLocationError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load details</h2>
        <p className="text-gray-600 mb-6 max-w-md">There was a temporary problem communicating with our server. Please try again.</p>
        <button
          onClick={() => refetchLocation()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!location || !location.isActive || !product) {
    return (
      <NotFound
        title="Product or Location Not Found"
        message={`We could not find the requested combination of "${locationSlug}" and "${productSlug}". Please verify the location and product or browse our sitemap.`}
      />
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "https://www.barcoater.com/heroimage.webp"];

  // Dynamic city-specific FAQs combined with base product FAQs
  const combinedFaqs = [
    {
      question: `How does ImageTech Industries deliver ${product.name} to ${location.name}?`,
      answer: `ImageTech Industries dispatches ${product.name} orders via trusted express courier and freight services directly to your facility in ${location.name}, ${location.state}. Typical delivery times range from 2 to 4 business days.`
    },
    {
      question: `Can ImageTech Industries provide custom dimensions for ${product.name} in ${location.name}?`,
      answer: `Yes. As the original manufacturer, ImageTech Industries customizes wire wound rod lengths and coating wet film thicknesses to match your exact machine specifications.`
    },
    {
      question: `How can I get a quote or place an order in ${location.name}?`,
      answer: `You can click "Get a Quote for ${location.name}" on this page, contact our sales team on WhatsApp, or call ImageTech Industries directly. We provide competitive manufacturer pricing and guidance for customers in ${location.name}.`
    },
    ...(product.faqs || [])
  ];

  const formatImageUrl = (imgPath) => {
    if (!imgPath) return "https://www.barcoater.com/heroimage.webp";
    if (imgPath.startsWith("http")) return encodeURI(imgPath);
    return `https://www.barcoater.com${encodeURI(imgPath)}`;
  };
  const productImages = (images || []).map(formatImageUrl);

  const rawSku = (product.slug || product.id || "product").toUpperCase();
  const productSku = `BARCOATER-${rawSku}-${(location.slug || "CITY").toUpperCase()}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: `${product.name} in ${location.name}`,
    image: productImages.length > 1 ? productImages : productImages[0] || "https://www.barcoater.com/heroimage.webp",
    description: `${product.shortDescription || product.shortDesc || product.name}. Manufactured and supplied by ImageTech Industries in ${location.name}, ${location.state}.`,
    sku: productSku,
    mpn: productSku,
    brand: {
      "@type": "Brand",
      name: "ImageTech Industries",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue || "4.9",
      reviewCount: product.reviewCount || "120",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "1200",
      validFrom: "2025-01-01",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://www.barcoater.com/${location.slug}/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "ImageTech Industries",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 15,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: combinedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={`${product.name} in ${location.name}, ${location.state} | ImageTech Industries`}
        description={`Looking for ${product.name} in ${location.name}, ${location.state}? ImageTech Industries manufactures precision wire wound Bar Coaters for laboratory testing in ${location.name}. Order your ${product.name} today with fast direct delivery across ${location.name}, ${location.state}.`}
        image={productImages[0]}
        keywords={[
          `${product.name} in ${location.name}`,
          `${product.name} supplier ${location.name}`,
          `${product.name} manufacturer ${location.state}`,
          `Bar Coater ${location.name}`,
          `Bar Coaters ${location.name}`,
          `Bar Coaters ${location.state}`,
          product.name,
          "ImageTech Industries",
        ]}
        schema={[productSchema, faqSchema]}
      />

      <div className="bg-[#f8f9fa] min-h-screen py-4 lg:py-8 font-sans">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm font-semibold mb-8 flex text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/${location.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {location.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 flex flex-col lg:flex-row gap-12 items-start mb-16">
            {/* Image Gallery with Zoom */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div
                className="bg-gray-50 p-8 rounded-2xl w-full aspect-square flex items-center justify-center border border-gray-200 relative overflow-hidden cursor-crosshair group select-none"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <img
                  src={images[activeImage]}
                  alt={`${product.name} in ${location.name} - Wire Wound Bar Coater`}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className={`w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-200 ease-out ${
                    isZooming ? "scale-[2.5]" : "scale-100"
                  }`}
                  style={
                    isZooming
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                />
                {!isZooming && (
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 pointer-events-none flex items-center gap-1.5 shadow-sm">
                    <Maximize className="w-3.5 h-3.5" /> Hover to Zoom
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`border-2 rounded-xl overflow-hidden aspect-square bg-gray-50 p-2 flex items-center justify-center transition-all cursor-pointer ${
                        activeImage === idx
                          ? "border-[#1e3a8a] shadow-md scale-105"
                          : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start">
              {/* Manufacturer Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-4 self-start">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Manufactured by ImageTech Industries | Supplying {location.name}, {location.state}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                {product.name} <br />
                <span className="text-[#1e3a8a] text-2xl md:text-3xl lg:text-4xl">
                  in {location.name}
                </span>
              </h1>

              {/* Company Note */}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-6">
                <Truck className="w-4 h-4 shrink-0 text-[#1e3a8a]" />
                <span>Supplied directly by ImageTech Industries to customers across {location.name}, {location.state}</span>
              </div>

              {/* Overview Text */}
              <div className="text-[16px] text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {product.overview}
              </div>

              {/* Quick Feature Highlights */}
              <ul className="space-y-3 mb-8">
                {product.keyFeatures?.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                    <span className="font-medium text-[15px]">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                  <span className="font-medium text-[15px]">Reliable and fast direct delivery across {location.name}</span>
                </li>
              </ul>

              {/* Company Credibility Callout */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900 block">Supplied by ImageTech Industries:</span>
                    Precision manufacturer of wire wound bar coaters with over 30 years of engineering excellence. We provide custom dimension options with express dispatch to facilities in {location.name}, {location.state}.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-quote-modal", {
                        detail: { productName: `${product.name} (${location.name})` },
                      })
                    )
                  }
                  className="bg-[#1e3a8a] text-white px-8 py-3.5 rounded-lg font-bold text-[14px] hover:bg-[#152960] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Layout className="w-4 h-4" />
                  GET A QUOTE FOR {location.name.toUpperCase()}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/918448336036?text=Hi,%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                    product.name
                  )}%20in%20${encodeURIComponent(location.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-green-500 text-green-600 px-8 py-3.5 rounded-lg font-bold text-[14px] hover:bg-green-50 transition-colors flex items-center justify-center gap-2 shadow-sm uppercase cursor-pointer"
                >
                  BUY NOW / WHATSAPP US
                </a>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              TABS SECTION: PRODUCT OVERVIEW & SPECIFICATIONS
              ══════════════════════════════════════════════════════════════ */}
          <div className="mb-20">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              {["overview", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-[14px] font-black uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                    activeTab === tab
                      ? "text-[#1e3a8a]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e3a8a] rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Body Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[350px]">
              {/* Tab 1: Product Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Product Overview
                    </h3>
                    <div className="space-y-4 mb-8">
                      {product.longDesc ? (
                        <div
                          className="prose max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-[#0f172a] prose-h2:text-2xl prose-h2:mb-4 prose-h2:font-bold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-bold prose-p:text-[15px] prose-p:text-gray-700 prose-p:mb-5 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-[15px] prose-li:text-gray-700 prose-li:mb-2"
                          dangerouslySetInnerHTML={{ __html: product.longDesc }}
                        />
                      ) : (
                        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                          {product.detailedDescription || product.overview}
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-5 flex items-center gap-4 my-8">
                      <Shield className="w-8 h-8 text-blue-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-[15px] mb-1">
                          Direct Manufacturer Quality Assurance
                        </h4>
                        <p className="text-[13px] text-gray-600 font-medium">
                          Each wire wound bar coater is calibrated with high-grade stainless steel to ensure consistent wet film coatings across all your testing substrates in {location.name}.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Localized Supply & Distribution Block */}
                  <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Direct Supply & Delivery in {location.name} by ImageTech Industries
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                      ImageTech Industries is a trusted manufacturer of {product.name} supplying laboratories, ink testing facilities, and packaging companies in {location.name} and across {location.state}. With decades of industry expertise, our wire wound rods deliver accurate wet film thickness and dependable longevity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-blue-600" /> Fast Dispatch
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Safe and prompt delivery directly to your facility in {location.name}.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-blue-600" /> Custom Sizing Available
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Manufactured to your required dimensions to suit your machine.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" /> 30+ Years of Quality
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          ISO 9001:2015 certified manufacturer with direct technical and after-sales support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Applications & Features */}
                  {product.applications && (
                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        Industrial Applications in {location.name}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-[15px]">
                        {product.applications}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Technical Specifications */}
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Technical Specifications
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <th className="py-4 px-6 text-[14px] font-bold text-gray-700 bg-gray-50/50 w-1/3 border-r border-gray-100">
                            Delivery Region
                          </th>
                          <td className="py-4 px-6 text-[14px] font-medium text-gray-900">
                            {location.name}, {location.state}
                          </td>
                        </tr>
                        {(product.specifications || []).map((spec, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <th className="py-4 px-6 text-[14px] font-bold text-gray-700 bg-gray-50/50 w-1/3 border-r border-gray-100">
                              {spec.label}
                            </th>
                            <td className="py-4 px-6 text-[14px] font-medium text-gray-900">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product FAQ */}
          <div className="mb-16">
            <FAQSection
              title={`${product.name} FAQs in ${location.name}`}
              subtitle="Common Questions"
              description={`Find answers to frequently asked questions regarding ${product.name} orders, sizing, and delivery in ${location.name}, ${location.state}.`}
              faqs={combinedFaqs}
            />
          </div>

          <HomeCTA locationData={location} />
        </div>
      </div>
    </>
  );
};

export default CityProductPage;
