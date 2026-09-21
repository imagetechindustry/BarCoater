import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/technical/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import scrollToTop from "../utils/scrollToTop";

const sectors = [
  {
    id: "flexible-packaging",
    name: "Flexible Packaging & Barrier Films",
    badge: "Sector 01",
    subtitle: "BOPP, PET, CPP, Aluminium Foil & Multilayer Pouches",
    description:
      "Flexible packaging converters rely on precision Bar Coaters to evaluate heat-seal lacquers, PVDC barrier coatings, cold seals, and anti-fog layers. Because barrier effectiveness requires zero pinholes, test drawdowns must deliver absolute wet film consistency.",
    recommendedBar: "Bar No. 0 (4–12 µm) or No. 1 (12–25 µm)",
    typicalCoatings: ["Heat-seal lacquer", "PVDC oxygen barrier", "Cold seal adhesive", "Primer for metallization"],
    substrates: ["Plain BOPP (12–30 µm)", "Corona-treated PET (12 µm)", "Aluminium foil (7–20 µm)", "Cast PP"],
    operatorTip:
      "Always check the substrate surface dyne level before drawdown. Corona-treated films (&gt; 38 dynes/cm) prevent fluid beading and ensure uniform wetting under the rod.",
  },
  {
    id: "printing-laboratories",
    name: "Rotogravure & Flexo Printing Labs",
    badge: "Sector 02",
    subtitle: "Ink Proofing, Viscosity Verification & Spectrophotometer Matching",
    description:
      "Before mounting heavy printing cylinders on a multimillion-rupee press, ink chemists use Bar Coaters to verify color density, drying time, and gloss. A 10-second drawdown on the actual production substrate accurately predicts how ink will print on press.",
    recommendedBar: "Bar No. 0 (6–12 µm) or No. 1 (15–25 µm)",
    typicalCoatings: ["Solvent-based gravure inks", "Water-based flexo inks", "Overprint varnishes (OPV)", "Metallic gold/silver inks"],
    substrates: ["Coated art paper", "Met-PET film", "Polyethylene liners", "Duplex board"],
    operatorTip:
      "Perform drawdowns immediately after taking an ink sample from the press tank. Solvent evaporation in open air changes ink viscosity in seconds.",
  },
  {
    id: "paper-mills",
    name: "Paper Mills & Silicone Coating",
    badge: "Sector 03",
    subtitle: "Release Liners, Barrier Sizing & Clay Coating",
    description:
      "Paper laboratories utilize heavy-gauge Bar Coaters to formulate silicone release liners for stickers and labels, barrier sizing against grease/moisture, and optical brightening agents for high-end graphic papers.",
    recommendedBar: "Bar No. 1 (15–30 µm) or No. 2 (30–60 µm)",
    typicalCoatings: ["Silicone release polymers", "Clay starch sizing", "Fluorocarbon grease-proof coatings", "Thermal dye emulsions"],
    substrates: ["Glassine paper (40–80 gsm)", "Kraft paper", "Bleached board", "Parchment base paper"],
    operatorTip:
      "Because raw paper absorbs water instantly, use a fast, assertive drawdown stroke to ensure the wet film meters before liquid penetrates into the cellulose fibers.",
  },
  {
    id: "adhesives-tapes",
    name: "Pressure-Sensitive Adhesives & Tapes",
    badge: "Sector 04",
    subtitle: "BOPP Tapes, Masking Tapes, Foam & Label Stocks",
    description:
      "Adhesive manufacturers require exact coating thicknesses to evaluate peel strength, tackiness, and shear resistance. Bar Coaters ensure high-viscosity emulsions and hot-melt resins are laid down without ridges or bubbles.",
    recommendedBar: "Bar No. 2 (25–60 µm) or No. 3 (50–120 µm)",
    typicalCoatings: ["Water-based acrylic PSA", "Hot-melt rubber adhesives", "Laminating polyurethanes", "Solvent-based acrylics"],
    substrates: ["BOPP tape film (25–50 µm)", "Crepe paper", "Cross-linked PE foam", "Polyester release film"],
    operatorTip:
      "For high-viscosity adhesives (&gt; 1,000 mPa.s), warm the formulation slightly or use a 10 mm/12 mm diameter core rod to prevent rod deflection during manual pulling.",
  },
  {
    id: "paints-industrial",
    name: "Paints, Resins & Corrosion Coatings",
    badge: "Sector 05",
    subtitle: "Automotive Primers, Wood Varnishes & Metal Lacquers",
    description:
      "Paints and protective coatings must pass rigorous salt-spray, cross-hatch adhesion, and scrub-resistance tests. Bar Coaters apply standardized micron layers onto Leneta drawdown charts, steel panels, and glass plates.",
    recommendedBar: "Bar No. 1 (20–40 µm) or No. 2 (40–80 µm)",
    typicalCoatings: ["Anti-corrosion epoxy primers", "Polyurethane topcoats", "Clear wood lacquers", "Architectural acrylic emulsions"],
    substrates: ["Black/white Leneta cards", "Cold-rolled steel test panels", "Float glass plates", "Aluminium Q-panels"],
    operatorTip:
      "When coating rigid metal or glass panels, use a vacuum hold-down plate or heavy-duty drawdown clipboard to prevent panel slipping while pulling the bar.",
  },
  {
    id: "batteries-electronics",
    name: "Battery Electrodes & Advanced Materials",
    badge: "Sector 06",
    subtitle: "Lithium-Ion Slurries, Solar Cells & Conductive Inks",
    description:
      "High-tech research centers and battery gigafactories use surgical-grade stainless steel Bar Coaters to spread battery cathode/anode slurries onto copper and aluminium current collector foils with ultra-strict thickness tolerances.",
    recommendedBar: "Bar No. 2 (30–60 µm) or No. 3 (60–150 µm)",
    typicalCoatings: ["Lithium iron phosphate (LFP) slurry", "Graphite anode paste", "Conductive silver inks", "Perovskite solar layers"],
    substrates: ["Copper battery foil (8–15 µm)", "Aluminium battery foil (12–20 µm)", "ITO coated glass", "Polyimide (Kapton) films"],
    operatorTip:
      "Use motorized automatic film applicators in cleanroom environments to eliminate vibration ripples and achieve sub-micron cross-directional uniformity.",
  },
];

const faqs = [
  {
    question: "Which Bar Coater is best for testing ink color on flexible packaging film?",
    answer:
      "For flexible packaging film (BOPP, PET, CPP), we recommend our Bar Coater Small Size (No. 0) with a 0.08 mm to 0.15 mm wire gauge. This deposits an ultra-thin wet film of 6 µm to 12 µm, which closely mimics the actual ink transfer volume of a 300–400 LPI rotogravure cylinder or ceramic anilox roll on press.",
  },
  {
    question: "How do I prevent paper substrate from wrinkling or buckling during a Bar Coater drawdown?",
    answer:
      "When testing water-based coatings on absorbent paper, place the paper sample on a smooth rubber drawdown mat or vacuum plate. Hold the top edge firmly with a magnetic clamp or drafting tape, and pull the Bar Coater in one swift, continuous motion without stopping. Stopping mid-stroke allows water to soak into the fibers and cause instant wrinkling.",
  },
  {
    question: "Can Bar Coaters apply solventless 100% solid adhesives?",
    answer:
      "Yes. For solventless laminating adhesives or high-viscosity resins, choose a Big Size (No. 2) or Extra Big Size (No. 3) Bar Coater with a 10 mm or 12 mm solid core rod. The heavy core prevents the bar from bowing in the middle, and the wider wire grooves allow the thick liquid to pass freely without dry friction.",
  },
  {
    question: "Why do I get pinholes when coating barrier varnishes on aluminium foil?",
    answer:
      "Pinholes on aluminium foil are usually caused by residual rolling oils on the foil or micro-air bubbles in the coating liquid. Wipe the foil lightly with isopropyl alcohol (IPA) before coating, and allow your coating fluid to de-aerate for 15 minutes after mixing to let entrapped air escape before drawing down.",
  },
  {
    question: "What is the recommended Bar Coater length for standard A4 laboratory test sheets?",
    answer:
      "Standard A4 paper or film is 210 mm wide. We recommend our Medium Size Bar Coater (220 mm working length, 280 mm total length) or Big Size Bar Coater (280 mm working length, 350 mm total length). Both provide ample margin on the left and right so coating fluid does not spill onto the drawdown clipboard.",
  },
  {
    question: "Can ImageTech Bar Coaters be used in food-grade packaging laboratories?",
    answer:
      "Yes. All ImageTech Bar Coaters are fabricated from food-grade 304 and 316 stainless steel with electropolished smooth surfaces. They contain no brass, lead, or toxic alloys, making them fully compliant for testing food-contact packaging lacquers and pharmaceutical barrier blister foils.",
  },
  {
    question: "How do I correlate an Anilox roller volume with a Bar Coater number?",
    answer:
      "In flexographic printing, anilox cell volumes are measured in BCM (Billion Cubic Microns per square inch) or cm³/m². As a practical rule of thumb, anilox transfer efficiency to the plate and substrate is roughly 25% to 35%. A 5.0 BCM anilox roller deposits approximately 2.0 to 2.8 µm dry ink, which corresponds closely to a Bar Coater Small Size (No. 0) with a 0.08 mm wire (approx. 8 µm wet film of 30% solids ink).",
  },
  {
    question: "Can a Bar Coater be used to test heat-seal lacquers for pharmaceutical blister foil?",
    answer:
      "Yes. Testing heat-seal lacquer on 20 µm hard-temper aluminium foil is one of the most common applications for our Medium Size Bar Coaters. Applying 4 to 6 g/m² dry lacquer (using a 12 µm wet Bar Coater with 40% solids lacquer) produces uniform heat-seal strength against PVC and PVdC blister films without pinholes.",
  },
  {
    question: "Why do cold-seal adhesives foam or form bubbles during Bar Coater drawdowns?",
    answer:
      "Natural rubber cold-seal emulsions contain surfactants that readily generate foam under mechanical agitation. When drawing down with a Bar Coater, bubbles trapped in the puddle pass under the wire and leave crater voids. To avoid this, allow the adhesive to de-aerate in a sealed beaker for 30 minutes, and pour the puddle gently against the glass plate without splashing.",
  },
  {
    question: "What is the best way to clean cross-linked UV-curable varnishes from a Bar Coater?",
    answer:
      "UV varnishes do not air-dry, which gives operators ample working time. However, exposure to ambient room daylight or UV tubes can trigger polymerization in the wire crevices. Immediately after the drawdown stroke, wipe the bar with an ethyl acetate or isopropanol cloth. If residual varnish cures in the grooves, submerge the rod in an ultrasonic cleaning bath with warm cleaning detergent for 5 minutes.",
  },
];

const PressApplications = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <SEO
        title="Bar Coater Applications Across 6 Industrial Sectors | ImageTech Industries"
        description="Explore how wire wound Bar Coaters are applied across 6 major industrial sectors: flexible packaging, rotogravure & flexo printing, paper mills, adhesive tapes, paints & varnishes, and lithium-ion battery coatings. Technical operational guide by ImageTech Industries India."
        keywords={[
          "bar coater applications",
          "bar coater for packaging",
          "bar coater for flexo printing",
          "bar coater for gravure ink",
          "paper coating bar coater",
          "adhesive drawdown bar",
          "battery slurry coating bar",
          "mayer rod industrial uses",
          "ImageTech Industries",
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-gray-50 border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Industrial Sectors & Case Studies
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Bar Coater <span className="text-blue-600">Industrial Applications</span> & Sectors
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              From barrier pouch packaging to lithium-ion battery electrode drawdowns, discover how manufacturers and testing laboratories across India use precision wire wound Bar Coaters for reproducible quality control.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                6 Diverse Industrial Verticals
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Tested on 20+ Substrates
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Food-Grade 316 Stainless Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 4-Pill Sub-Nav */}
      <TechnicalGuidesNav />

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Sector Cards Breakdown */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Industrial Case Studies
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Sector-by-Sector Technical Breakdown
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Every industry presents distinct fluid viscosities, drying speeds, and substrate wetting dynamics. Learn how to calibrate your Bar Coater for your exact operational environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                id={sector.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                      {sector.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {sector.recommendedBar}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-bold mt-1">
                    {sector.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                    {sector.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                        Common Coating Fluids:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sector.typicalCoatings.map((coating, cIdx) => (
                          <span
                            key={cIdx}
                            className="bg-gray-100 text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
                          >
                            {coating}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                        Target Substrates:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sector.substrates.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-blue-50 text-blue-800 text-[11px] font-medium px-2.5 py-1 rounded-md"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                  <span className="font-extrabold text-amber-800 block mb-0.5">
                    Operator Press Tip:
                  </span>
                  {sector.operatorTip}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Substrate Behavior Guide */}
        <section className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Substrate Mechanics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              How Different Substrates Behave Under a Bar Coater
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              The physics of coating transfer changes depending on whether your substrate is smooth, porous, flexible, or rigid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-blue-600 font-bold text-sm mb-2">Polymer Films (BOPP/PET/CPP)</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Films are 100% non-porous. All liquid remains on the surface. If the film is untreated (&lt; 36 dynes/cm), water-based coatings will dewet into droplets. Corona-treatment is mandatory.
              </p>
              <div className="mt-3 text-[11px] text-blue-700 font-bold">Recommended Bed: Rubber Drawdown Pad</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-blue-600 font-bold text-sm mb-2">Aluminium Foils & Metal</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Foil has high thermal conductivity and surface energy. Coatings dry faster due to heat dissipation. Requires gentle rod pressure to avoid wrinkling ultra-thin 9 µm soft foil.
              </p>
              <div className="mt-3 text-[11px] text-blue-700 font-bold">Recommended Bed: Smooth Glass Bed</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-blue-600 font-bold text-sm mb-2">Paper & Folding Boxboard</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Cellulose fibers rapidly absorb low-viscosity carrier solvents (water/alcohol). Actual surface coating thickness is slightly lower than theoretical due to internal penetration.
              </p>
              <div className="mt-3 text-[11px] text-blue-700 font-bold">Recommended Bed: Clipboard Clamp</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
              <div className="text-blue-600 font-bold text-sm mb-2">Rigid Glass / Steel Panels</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rigid substrates require precision 10 mm or 12 mm core rods. Any dirt or grit under the substrate will lift the rod and cause transverse thickness streaks.
              </p>
              <div className="mt-3 text-[11px] text-blue-700 font-bold">Recommended Bed: Vacuum Plate System</div>
            </div>
          </div>
        </section>

        {/* Industrial Substrate Coating Parameters Table */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Pressroom Reference Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Substrate-Specific Coating Parameters & Bar Coater Selection
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Matching your substrate surface energy (dyne level), fluid viscosity, and target dry coat weight with the right Bar Coater ensures immediate pressroom correlation and zero batch rejections.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Substrate Material</th>
                  <th className="py-3.5 px-4">Min. Surface Dyne</th>
                  <th className="py-3.5 px-4">Coating Viscosity</th>
                  <th className="py-3.5 px-4 text-blue-700 bg-blue-50/50">Recommended Bar Model</th>
                  <th className="py-3.5 px-4">Target Dry Coat Weight</th>
                  <th className="py-3.5 px-4 sm:px-6">Drying Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700 text-xs sm:text-sm">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">BOPP / PET / CPP Film</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">≥ 38 – 42 dynes</td>
                  <td className="py-3 px-4">14 – 18 sec (Ford 4)</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 0 (Small Size)</td>
                  <td className="py-3 px-4">1.5 – 3.0 g/m²</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">Hot air 60°C – 70°C for 15 sec</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">Aluminium Blister Foil</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">≥ 50 – 56 dynes</td>
                  <td className="py-3 px-4">18 – 25 sec (Ford 4)</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 1 (Medium Size)</td>
                  <td className="py-3 px-4">4.0 – 6.0 g/m²</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">Convection oven 120°C for 20 sec</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">Duplex / Folding Boxboard</td>
                  <td className="py-3 px-4 text-gray-600">Natural Porous</td>
                  <td className="py-3 px-4">25 – 45 sec (Zahn 3)</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 1 or No. 2</td>
                  <td className="py-3 px-4">3.5 – 8.0 g/m²</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">IR lamp or hot air 80°C</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">Kraft Liner / Release Paper</td>
                  <td className="py-3 px-4 text-gray-600">High Absorbency</td>
                  <td className="py-3 px-4">150 – 400 mPa.s</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 2 (Big Size)</td>
                  <td className="py-3 px-4">0.8 – 1.8 g/m² (silicone)</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">Tunnel dryer 140°C thermal cure</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">PSA Tape Substrates (OPP/PVC)</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">≥ 40 dynes</td>
                  <td className="py-3 px-4">800 – 2,500 cPs</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 2 or No. 3</td>
                  <td className="py-3 px-4">15 – 35 g/m²</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">Zone-controlled drying 90°C – 110°C</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 sm:px-6 font-bold text-gray-900">Battery Cathode/Anode Foils</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">Electropolished Copper/Al</td>
                  <td className="py-3 px-4">1,500 – 4,000 cPs</td>
                  <td className="py-3 px-4 font-bold text-blue-700 bg-blue-50/20">Bar No. 3 (Extra Big Size)</td>
                  <td className="py-3 px-4">60 – 140 g/m²</td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-gray-600">Vacuum drying chamber 110°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Lab-to-Press Correlation Guide */}
        <section className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Scale-Up Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              How to Translate Lab Bar Coater Results to High-Speed Press Runs
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              A major advantage of wire wound Bar Coaters is predictable correlation with continuous web coating machinery. Here is how leading converters map benchtop drawdowns to production settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                  Correlation 01
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  Rotogravure Cylinders
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Gravure cylinders transfer 40% to 50% of engraved cell volume. A Bar Coater No. 0 (10 µm wet) accurately reproduces the optical density and coverage of a 60–70 line/cm gravure cylinder running at 250 m/min.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-bold">
                Direct color and shade matching before engraving.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                  Correlation 02
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  Flexo Ceramic Anilox
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Anilox roll ink split is roughly one-third of total theoretical volume. A 4.5 BCM anilox roller transfers roughly 2.3 µm dry ink—perfectly simulated by a 0.08 mm wire Bar Coater on flexible packaging film.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-bold">
                Saves 4 hours of press make-ready downtime.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                  Correlation 03
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  Continuous Mayer Rod Stations
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  In paper siliconizing and adhesive tape lines, production machines employ motorized rotating Mayer rods. Benchtop Bar Coater tests provide a 1:1 direct wire gauge match for the line rod.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-bold">
                100% direct 1:1 wire diameter equivalence.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                  Correlation 04
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  Slot-Die & Reverse Roll Coaters
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  For pilot battery electrodes and optical film coatings, a Bar Coater drawdown establishes the target wet coating thickness window before setting micro-gap feed pumps on production lines.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-bold">
                Verifies solid loading and slurry stability.
              </div>
            </div>
          </div>
        </section>

        {/* Uniform FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions on Industrial Applications"
          subtitle="Application Troubleshooting"
          description="Straight answers from ImageTech engineers on packaging, printing, paper, and adhesive coating questions."
          faqs={faqs}
        />

        {/* Bottom CTA Card */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-200 text-xs font-black uppercase tracking-widest block mb-2">
              Need Samples Tested or Custom Bar Coater Sizing?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Partner with India's Premier Bar Coater Manufacturer
            </h2>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              Serving flexible packaging plants, ink manufacturers, paper mills, and testing labs nationwide with ISO 9001:2015 certified Bar Coaters since 1992.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-md text-center"
            >
              Request Custom Quote
            </button>
            <Link
              to="/selection-guide"
              className="border border-white/50 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all text-center"
            >
              View Sizing Calculator &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default PressApplications;
