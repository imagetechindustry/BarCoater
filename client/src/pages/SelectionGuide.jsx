import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/technical/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import scrollToTop from "../utils/scrollToTop";

// Bar Coater Rod Sizing Data Matrix
const barCoaterModels = [
  {
    number: "Bar No. 0",
    name: "Small Size Bar Coater",
    rodDia: "6 mm",
    totalLength: "240 mm",
    workingLength: "180 mm",
    wireRange: "0.05 mm – 0.20 mm",
    wetFilmRange: "4 µm – 16 µm",
    bestFor: "Thin gravure inks, solvent primers, barrier coatings, micro-thin optical layers",
    theoreticalPickup: "4 – 16 g/m²",
  },
  {
    number: "Bar No. 1",
    name: "Medium Size Bar Coater",
    rodDia: "8 mm",
    totalLength: "280 mm",
    workingLength: "220 mm",
    wireRange: "0.15 mm – 0.40 mm",
    wetFilmRange: "12 µm – 32 µm",
    bestFor: "Flexo inks, water-based coatings, paper overprint varnishes, release lacquers",
    theoreticalPickup: "12 – 32 g/m²",
  },
  {
    number: "Bar No. 2",
    name: "Big Size Bar Coater",
    rodDia: "10 mm",
    totalLength: "350 mm",
    workingLength: "280 mm",
    wireRange: "0.30 mm – 0.80 mm",
    wetFilmRange: "24 µm – 64 µm",
    bestFor: "Laminating adhesives, heavy paints, topcoats, carton board emulsion coatings",
    theoreticalPickup: "24 – 64 g/m²",
  },
  {
    number: "Bar No. 3",
    name: "Extra Big Size Bar Coater",
    rodDia: "12 mm",
    totalLength: "420 mm",
    workingLength: "350 mm",
    wireRange: "0.60 mm – 1.50 mm",
    wetFilmRange: "48 µm – 150 µm",
    bestFor: "Hot melts, bitumen coatings, thick plastisols, heavy paste adhesives, foil lacquers",
    theoreticalPickup: "48 – 150 g/m²",
  },
];

// Fluid Compatibility Matrix
const compatibilityData = [
  {
    category: "Water-Based Inks & Varnishes",
    viscosity: "18 – 35 sec (B4 Cup)",
    recommendedBars: "No. 0 (4–12 µm) or No. 1 (12–25 µm)",
    wireType: "316 Stainless Steel Closed Wound",
    pressTips: "Requires fast drawdown speed to prevent surface tension beading and orange peel.",
  },
  {
    category: "Solvent-Based Gravure Inks",
    viscosity: "14 – 22 sec (B4 Cup)",
    recommendedBars: "No. 0 (4–10 µm)",
    wireType: "304 / 316 Stainless Steel Micro-Wound",
    pressTips: "Draw quickly before fast solvent evaporation causes dry-film streaking.",
  },
  {
    category: "UV Curable Inks & Coatings",
    viscosity: "300 – 1500 mPa.s",
    recommendedBars: "No. 1 (15–30 µm) or No. 2 (25–50 µm)",
    wireType: "High-Tensile Precision Stainless Wire",
    pressTips: "Zero solvent evaporation gives stable thickness; clean immediately with UV wash.",
  },
  {
    category: "Laminating Adhesives (Solventless/Water)",
    viscosity: "500 – 3500 mPa.s",
    recommendedBars: "No. 2 (30–60 µm) or No. 3 (50–100 µm)",
    wireType: "Reinforced 10mm or 12mm Stainless Core",
    pressTips: "Even two-hand pressure prevents adhesive puddle lines at web edges.",
  },
  {
    category: "Paints, Epoxies & Industrial Topcoats",
    viscosity: "800 – 5000 mPa.s",
    recommendedBars: "No. 2 (40–80 µm) or No. 3 (70–150 µm)",
    wireType: "Heavy-Gauge 12mm Stainless Core",
    pressTips: "Use rigid glass drawdown bed or vacuum bed to ensure micro-flat laydown.",
  },
];

const faqs = [
  {
    question: "How do I choose the correct Bar Coater number for my testing lab?",
    answer:
      "To choose the right Bar Coater number, start with your target wet film thickness in microns (µm). For example, if you need a 10 µm wet layer of ink, select a Bar Coater No. 0 or No. 1 with a 0.12 mm wire. If you only know your desired dry coating weight (e.g. 5 g/m²), divide that dry weight by the percent of solid contents in your coating fluid (for example, 5 g/m² ÷ 0.50 solids = 10 g/m² wet, which corresponds to approximately a 10 µm wet film Bar Coater).",
  },
  {
    question: "What is the difference between overall length and working coating length of a Bar Coater?",
    answer:
      "The overall length includes the bare metal handling ends on both sides where your hands or machine clamps hold the rod. The working coating length is the center section wrapped with precision stainless steel wire that actually applies the fluid. Always select a working length at least 20 mm to 50 mm wider than your test substrate paper or film.",
  },
  {
    question: "Can I use the same Bar Coater for both thin inks and heavy adhesives?",
    answer:
      "You can physically use the rod, but you will achieve very different results. Thin liquids like water-based gravure inks flow freely through small wire grooves (Bar No. 0 or 1), while thick viscous adhesives require wider grooves (Bar No. 2 or 3) so the liquid can pass through the gaps without causing hydraulic hydroplaning or rod skips.",
  },
  {
    question: "How does coating speed affect wet film thickness with a manual Bar Coater?",
    answer:
      "Drawing a manual Bar Coater too fast can cause air entrapment and micro-bubbles, while pulling too slow with high-viscosity liquids can create uneven longitudinal streaks. For most solvent and water coatings, a smooth, steady pulling speed of about 50 mm to 100 mm per second with gentle, even downward hand pressure delivers the most uniform, reproducible drawdown.",
  },
  {
    question: "What stainless steel grades are used in ImageTech Bar Coaters?",
    answer:
      "ImageTech Industries manufactures precision Bar Coaters using high-grade 304 and 316 stainless steel for both the solid center core rod and the outer spiraled winding wire. This provides maximum corrosion resistance against harsh solvents, acidic chemicals, water-based emulsions, and industrial wash solutions.",
  },
  {
    question: "Do you manufacture custom-diameter or custom-length Bar Coaters in India?",
    answer:
      "Yes. In addition to standard sizes (180 mm, 220 mm, 280 mm, and 350 mm working lengths), ImageTech Industries customizes wire wound Bar Coaters with custom core diameters (6 mm, 8 mm, 10 mm, 12 mm, 16 mm), specific total lengths up to 1200 mm, and custom wire gauges tailored to your coating equipment.",
  },
  {
    question: "What is the exact difference between wet film thickness and dry film thickness?",
    answer:
      "Wet film thickness (WFT) is the depth of the liquid coating layer immediately after the Bar Coater passes over the substrate before any solvent or water evaporates. Dry film thickness (DFT) is the final coating layer that remains after baking or air-drying. The relationship is governed by the non-volatile solid content: DFT = WFT × (Solids % ÷ 100). If your fluid has 40% solids and you apply a 25 µm wet film with a Bar Coater, your final dry film will measure exactly 10 µm.",
  },
  {
    question: "How can I tell if my Bar Coater wire is worn or damaged?",
    answer:
      "Inspect the wire coils under a simple 10x or 20x pocket magnifier or handheld microscope. Healthy Bar Coater coils are perfectly round, tightly packed against each other with zero gaps, and free of flat spots. If you notice flattened wire crowns, loose wire wraps, or repeating longitudinal streak lines on test sheets that appear in the exact same horizontal position every time, the winding wire has sustained mechanical damage and the rod must be replaced.",
  },
  {
    question: "Can a Bar Coater be used on rough or textured kraft paperboards?",
    answer:
      "Yes, but you must account for substrate porosity and surface roughness. On rough kraft paper or folding boxboard, liquid immediately penetrates into surface pores, which reduces the effective wet film sitting on top. For porous papers, select a Bar Coater with a slightly larger wire gauge (one or two numbers higher than theoretical calculation) or use a resilient rubber backing pad under the paper to allow the bar to follow slight surface contours uniformly.",
  },
  {
    question: "How long does a stainless steel Bar Coater last in a daily QA testing lab?",
    answer:
      "When tested with non-abrasive printing inks, varnishes, and laminating adhesives, an ImageTech 316 stainless steel Bar Coater easily lasts 2 to 3+ years of daily use. For highly abrasive slurries containing titanium dioxide (TiO2) pigments, ceramic particles, or calcium carbonate, wire wear accelerates, and laboratories typically replace drawdown rods every 6 to 12 months to maintain strict ± 1 µm quality assurance repeatability.",
  },
];

const SelectionGuide = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  // Interactive Calculator State
  const [substrateWidth, setSubstrateWidth] = useState(210); // A4 width mm
  const [targetDryFilm, setTargetDryFilm] = useState(12); // µm
  const [solidsPercent, setSolidsPercent] = useState(45); // %
  const [fluidViscosity, setFluidViscosity] = useState("medium"); // low, medium, high

  // Calculation logic
  const calculatedWetFilm = useMemo(() => {
    const solids = Math.max(1, Number(solidsPercent) || 1) / 100;
    const dry = Number(targetDryFilm) || 1;
    return Math.round((dry / solids) * 10) / 10;
  }, [targetDryFilm, solidsPercent]);

  const recommendedRod = useMemo(() => {
    if (calculatedWetFilm <= 16) {
      return {
        model: "Bar Coater Small Size (No. 0)",
        core: "6 mm diameter",
        length: substrateWidth > 160 ? "220 mm or 280 mm working length" : "180 mm working length",
        wireGauge: "0.08 mm – 0.20 mm",
        pickup: `${calculatedWetFilm} g/m² (approx.)`,
        reason: "Ideal for micro-thin coatings, flexo proofing, and solvent gravure inks.",
      };
    } else if (calculatedWetFilm <= 32) {
      return {
        model: "Bar Coater Medium Size (No. 1)",
        core: "8 mm diameter",
        length: substrateWidth > 200 ? "280 mm working length" : "220 mm working length",
        wireGauge: "0.20 mm – 0.40 mm",
        pickup: `${calculatedWetFilm} g/m² (approx.)`,
        reason: "Standard workhorse for water-based barrier varnishes, primers, and paper coatings.",
      };
    } else if (calculatedWetFilm <= 64) {
      return {
        model: "Bar Coater Big Size (No. 2)",
        core: "10 mm diameter",
        length: substrateWidth > 260 ? "350 mm working length" : "280 mm working length",
        wireGauge: "0.40 mm – 0.80 mm",
        pickup: `${calculatedWetFilm} g/m² (approx.)`,
        reason: "Best for laminating adhesives, topcoats, paint drawdowns, and emulsion layers.",
      };
    } else {
      return {
        model: "Bar Coater Extra Big Size (No. 3)",
        core: "12 mm diameter",
        length: "350 mm working length",
        wireGauge: "0.80 mm – 1.50 mm",
        pickup: `${calculatedWetFilm} g/m² (approx.)`,
        reason: "Designed for heavy hot-melts, thick resin pastes, and high-build coatings.",
      };
    }
  }, [calculatedWetFilm, substrateWidth]);

  return (
    <>
      <SEO
        title="Bar Coater Selection & Sizing Guide | Mayer Rod Calculator | ImageTech Industries"
        description="Comprehensive Bar Coater selection guide and interactive wet film calculator. Learn how to choose the right wire wound Bar Coater number, calculate wet vs dry film thickness, and match wire gauges to fluid viscosity. Precision stainless steel Mayer rods engineered by ImageTech Industries India."
        keywords={[
          "bar coater selection guide",
          "bar coater sizing",
          "bar coater calculator",
          "mayer rod sizing",
          "wire wound bar coater chart",
          "wet film thickness bar coater",
          "how to choose bar coater",
          "drawdown bar selection",
          "bar coater number chart",
          "ImageTech Industries",
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80 py-7 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Engineering Guide & Calculator
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Bar Coater <span className="text-blue-600">Selection & Sizing</span> Guide
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Choose the perfect wire wound Bar Coater for your coating formulation, substrate width, and target wet film thickness. Use our plain-English sizing guide and live formula calculator built for lab operators and quality control engineers.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Updated for 2026 Press Standards
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                ASTM D823 & ISO 9001 Compliant
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Factory Direct Pan-India Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 4-Pill Sub-Nav */}
      <TechnicalGuidesNav />

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-14">
        {/* Interactive Calculator Section */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 overflow-hidden p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Live Coating Engineering Tool
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Interactive Bar Coater & Wet Film Calculator
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Enter your test substrate size, required dry coating thickness, and solid contents percentage. Our formula instantly calculates the target wet film thickness and identifies your exact recommended Bar Coater model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 border border-gray-200/80 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Target Dry Film Thickness (µm)
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {targetDryFilm} µm
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={targetDryFilm}
                  onChange={(e) => setTargetDryFilm(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
                  <span>1 µm (Ultra-thin primer)</span>
                  <span>30 µm (Standard varnish)</span>
                  <span>60 µm (Heavy adhesive)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Coating Solid Content (%)
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {solidsPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={solidsPercent}
                  onChange={(e) => setSolidsPercent(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
                  <span>10% (Solvent ink)</span>
                  <span>50% (Aqueous dispersion)</span>
                  <span>100% (100% Solid UV / Hot Melt)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Substrate Width (mm)
                  </label>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {substrateWidth} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="350"
                  step="10"
                  value={substrateWidth}
                  onChange={(e) => setSubstrateWidth(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
                  <span>100 mm (Narrow strip)</span>
                  <span>210 mm (A4 Panel)</span>
                  <span>350 mm (Wide web test)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wide block mb-2">
                  Fluid Viscosity Behavior
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "low", label: "Watery / Low", desc: "< 50 mPa.s (Inks)" },
                    { id: "medium", label: "Medium", desc: "50–500 mPa.s (Varnishes)" },
                    { id: "high", label: "High / Paste", desc: "> 500 mPa.s (Adhesives)" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setFluidViscosity(v.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        fluidViscosity === v.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{v.label}</div>
                      <div className={`text-[10px] mt-0.5 ${fluidViscosity === v.id ? "text-blue-100" : "text-gray-400"}`}>
                        {v.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Display Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 to-white rounded-2xl p-6 border-2 border-blue-200/80 shadow-md">
              <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
                Engineering Recommendation
              </div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">
                {recommendedRod.model}
              </h3>
              <p className="text-xs text-gray-600 mt-1.5">
                {recommendedRod.reason}
              </p>

              <div className="mt-6 pt-6 border-t border-blue-200/60 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Target Wet Film:</span>
                  <span className="font-extrabold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                    {calculatedWetFilm} µm
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Recommended Core Rod:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.core}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Estimated Wire Gauge:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.wireGauge}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Working Rod Length:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Theoretical Wet Deposit:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.pickup}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-blue-200/60">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <span>Request Quote For This Bar Coater</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <p className="text-[11px] text-center text-gray-500 mt-2 font-medium">
                  Custom wire winding gauges available within 24–48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Sizing Table Section */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Standardized Dimension Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              ImageTech Bar Coater Sizing & Thickness Decision Table
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Every precision Bar Coater is machined using surgical-grade 304/316 stainless steel to ensure uniform coating drawdowns, zero corrosion, and long service life.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Model Number</th>
                  <th className="py-4 px-4">Core Diameter</th>
                  <th className="py-4 px-4">Working Length</th>
                  <th className="py-4 px-4">Total Length</th>
                  <th className="py-4 px-4">Wire Gauge</th>
                  <th className="py-4 px-4">Wet Film (µm)</th>
                  <th className="py-4 px-4 sm:px-6">Primary Lab Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {barCoaterModels.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-blue-700 whitespace-nowrap">
                      {row.number}
                      <span className="block text-xs text-slate-500 font-normal">{row.name}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-slate-900">{row.rodDia}</td>
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-blue-600">{row.workingLength}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">{row.totalLength}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-700">{row.wireRange}</td>
                    <td className="py-4 px-4 whitespace-nowrap font-bold text-emerald-700 bg-emerald-50/60 rounded-md">
                      {row.wetFilmRange}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-600 min-w-[220px]">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 Simple Steps Guide */}
        <section className="bg-gradient-to-b from-slate-50/80 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Operator Practical Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How to Measure and Choose Your Bar Coater in 3 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Follow these simple pressroom checks before ordering your replacement wire wound rod.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm shadow-blue-500/20">
                  01
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Measure Substrate Coating Width
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use a standard measuring tape to measure the width of your sample paper, PET film, or aluminium foil. Always select a Bar Coater with a <strong>working length at least 25 mm wider</strong> than your sample sheet so fluid does not leak off the edges.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                Rule of Thumb: A4 sheet (210mm) needs 220mm–280mm working rod.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm shadow-blue-500/20">
                  02
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Identify Required Wet Film (µm)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If your formula sheet says 10 g/m² dry film and your coating has 50% solid content, you require 20 g/m² wet coating (equivalent to a <strong>20 µm wet layer</strong>). Match this target micron thickness directly to the bar number.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                Formula: Wet Film (µm) = Dry Film (µm) ÷ (Solids % ÷ 100)
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm shadow-blue-500/20">
                  03
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Confirm Manual vs Machine Mount
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For handheld manual drawdowns, 6 mm or 10 mm rods with comfortable knurled bare ends are ideal. For automated motorized drawdown machines (such as automatic film applicators), verify the clamp chuck diameter (standard 10 mm or 12 mm).
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                Mounting: Standard 10mm chuck fits 95% of laboratory drawdown machines.
              </div>
            </div>
          </div>
        </section>

        {/* Chemical & Fluid Tolerance Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Chemical Resistance & Viscosity Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Coating Fluid Compatibility & Pressroom Tips
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Different coating chemistries behave differently under the shear force of a wire wound rod. Follow these fluid-specific guidelines to achieve streak-free coatings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibilityData.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:border-blue-300 hover:bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{item.category}</h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Viscosity Range:</span>
                      <span className="font-bold text-slate-800">{item.viscosity}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Recommended Rod:</span>
                      <span className="font-bold text-blue-700">{item.recommendedBars}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Wire Metallurgy:</span>
                      <span className="font-bold text-slate-800">{item.wireType}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-4 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70">
                    <span className="font-bold text-slate-800">Operator Tip: </span>
                    {item.pressTips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wire Wound Bar Coaters vs Formed (Grooved) Rods Comparison */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Engineering Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Wire Wound Bar Coater vs Formed (Grooved) Rod: Which One Do You Need?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              In printing, packaging, and R&D coating laboratories, choosing between a traditional wire wound Bar Coater and a CNC-formed grooved rod depends on your fluid rheology, pigment abrasiveness, and target wet film tolerance.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Feature / Parameter</th>
                  <th className="py-3 px-4 text-blue-700 bg-blue-50/50">Wire Wound Bar Coater (Mayer Rod)</th>
                  <th className="py-3 px-4 text-slate-700">Formed / Grooved Rod (Cutter-Milled)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700 text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Manufacturing Construction</td>
                  <td className="py-3.5 px-4 text-blue-900 font-medium bg-blue-50/20">
                    Precision stainless steel spring wire helically wrapped around a solid steel core rod.
                  </td>
                  <td className="py-3.5 px-4">
                    Continuous thread grooves CNC-milled directly into the surface of a solid steel rod.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Film Thickness Accuracy</td>
                  <td className="py-3.5 px-4 text-blue-900 font-bold bg-blue-50/20">
                    Highest Precision (± 1 µm across the entire web width).
                  </td>
                  <td className="py-3.5 px-4">
                    Moderate to High (± 2 to 3 µm depending on tool cutter wear).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Ultra-Thin Coating Capability</td>
                  <td className="py-3.5 px-4 text-blue-900 font-bold bg-blue-50/20">
                    Superb (Can apply films as thin as 4 µm with 0.05 mm wire).
                  </td>
                  <td className="py-3.5 px-4">
                    Limited (Cutting ultra-fine micro-grooves below 15 µm is difficult).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Handling Abrasive Slurries</td>
                  <td className="py-3.5 px-4 text-slate-600 bg-blue-50/20">
                    Good for general testing. Highly abrasive slurry wears wire faster.
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Superior durability for abrasive ceramic or metal slurries.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Cleaning Difficulty</td>
                  <td className="py-3.5 px-4 text-slate-600 bg-blue-50/20">
                    Requires prompt wiping before ink cures inside wire coils.
                  </td>
                  <td className="py-3.5 px-4">
                    Smooth rounded valleys allow slightly easier physical cleaning.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Cost & Availability in India</td>
                  <td className="py-3.5 px-4 text-blue-700 font-bold bg-blue-50/20">
                    Economical, standard stock available for instant pan-India dispatch.
                  </td>
                  <td className="py-3.5 px-4">
                    Higher manufacturing cost and longer custom machining lead times.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Best Application</td>
                  <td className="py-3.5 px-4 text-blue-900 font-bold bg-blue-50/20">
                    Flexo/Gravure ink proofing, barrier coatings, paper overprints, QA testing.
                  </td>
                  <td className="py-3.5 px-4">
                    Thick hot-melt adhesives, heavy battery slurries, high-wear production webs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5-Step ASTM D823 Standard Operating Procedure */}
        <section className="bg-gradient-to-b from-slate-50/80 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Lab Standard Operating Procedure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How to Perform a Repeatable Manual Bar Coater Drawdown (ASTM D823)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              Achieving repeatable test results across different laboratory technicians requires a standardized drawdown method. Follow this step-by-step procedure used by leading packaging and ink QA departments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                  1
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Clean Bed Setup</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Place a micro-flat glass drawdown plate or smooth rubber pad on a rigid, vibration-free workbench. Wipe the surface clean of any dust particles or dried specks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Ensure surface is 100% horizontal.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                  2
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Secure Substrate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lay your test substrate (BOPP, paper, or foil) flat on the plate. Secure the top leading edge firmly with a magnetic bar or drafting tape to prevent slipping.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Smooth out any wrinkles or static.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                  3
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Dispense Puddle</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Position your Bar Coater near the top of the substrate. Using a disposable pipette or syringe, pour a continuous horizontal puddle of coating liquid 10 mm to 15 mm ahead of the rod.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Avoid dripping bubbles or aerated foam.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                  4
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Continuous Pull</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Grip both bare ends of the Bar Coater lightly with thumb and forefinger. Pull the rod toward you in one steady, continuous motion at roughly 75 mm to 100 mm per second.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                Do not push down hard; let rod weight glide.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                  5
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">Immediate Clean</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediately wipe the Bar Coater with a solvent-dampened lint-free cloth before the sample enters the oven. Never allow coating fluid to dry inside the wire grooves.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold">
                Store horizontally on padded rack.
              </div>
            </div>
          </div>
        </section>

        {/* Uniform FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions on Bar Coater Selection"
          subtitle="Expert Sizing Help"
          description="Straightforward answers from ImageTech technical engineers on how to choose, calibrate, and order wire wound Bar Coaters."
          faqs={faqs}
        />

        {/* Bottom CTA Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs text-blue-100 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Need A Custom Wire Gauge or Sizing Advice?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              Get Expert Bar Coater Recommendations for Your Lab
            </h2>
            <p className="text-blue-100/90 text-sm mt-2 leading-relaxed">
              Send us your coating fluid viscosity and target wet film thickness. Our engineering team in Delhi will recommend the exact wire diameter and deliver custom Bar Coaters anywhere in India.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-md text-center"
            >
              Get Custom Quote
            </button>
            <Link
              to="/troubleshooting-guide"
              className="border border-white/40 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all text-center"
            >
              Troubleshooting Guide &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default SelectionGuide;
