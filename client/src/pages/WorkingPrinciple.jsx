import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/technical/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import scrollToTop from "../utils/scrollToTop";

const equipmentComparison = [
  {
    parameter: "Thickness Accuracy & Repeatability",
    barCoater: "Extremely High (± 1 µm across web)",
    doctorBlade: "High (dependent on blade pressure/angle)",
    birdApplicator: "Moderate (fixed gap, can hydroplane)",
    spinCoater: "High (rigid round substrates only)",
    rollerCoater: "Moderate (sensitive to speed variations)",
  },
  {
    parameter: "Substrate Versatility",
    barCoater: "Paper, Film, Foil, Glass, Board, Metal",
    doctorBlade: "Cylinders & Anilox rolls primarily",
    birdApplicator: "Rigid flat test charts only",
    spinCoater: "Silicon wafers & glass disks only",
    rollerCoater: "Continuous webs and rigid boards",
  },
  {
    parameter: "Viscosity Tolerance",
    barCoater: "10 mPa.s to 10,000+ mPa.s",
    doctorBlade: "10 to 1,500 mPa.s",
    birdApplicator: "50 to 2,000 mPa.s",
    spinCoater: "1 to 500 mPa.s (Low viscosity only)",
    rollerCoater: "100 to 5,000 mPa.s",
  },
  {
    parameter: "Cleaning Time & Ease",
    barCoater: "Under 60 seconds with solvent rinse",
    doctorBlade: "2 to 5 minutes (blade clamp removal)",
    birdApplicator: "1 to 2 minutes",
    spinCoater: "5 to 10 minutes (bowl wipe down)",
    rollerCoater: "15 to 30 minutes (roller washup)",
  },
  {
    parameter: "Operator Skill Requirement",
    barCoater: "Very Low (simple steady manual pull)",
    doctorBlade: "Medium to High (blade angle alignment)",
    birdApplicator: "Low",
    spinCoater: "Medium (recipe speed tuning)",
    rollerCoater: "High (nip pressure & speed sync)",
  },
  {
    parameter: "Equipment Investment Cost",
    barCoater: "Economical / Low Cost",
    doctorBlade: "Moderate",
    birdApplicator: "Moderate",
    spinCoater: "High",
    rollerCoater: "Very High",
  },
];

const faqs = [
  {
    question: "What is the Mayer Rod working principle in a Bar Coater?",
    answer:
      "A Bar Coater (invented by Charles W. Mayer in 1905, hence 'Mayer Rod') operates by winding a tight spiral of stainless steel wire around a precision solid steel core. As the bar is pulled across a puddle of liquid on a substrate, the fluid is metered through the precise triangular open spaces between adjacent wire coils. Surface tension immediately levels these tiny liquid ridges into a continuous, uniform wet film.",
  },
  {
    question: "Why is the wet film thickness roughly 10% of the wire diameter?",
    answer:
      "Geometrically, the triangular gaps between tight round wires have a theoretical volume of about 21.5% of the wire diameter squared. As the rod glides over the substrate, viscous drag splits the fluid: approximately half of the liquid passes through under the rod onto the substrate, while the other half rolls in the puddle ahead of the rod. This hydrodynamic split results in a wet film thickness equal to approximately 9% to 11% of the wire diameter.",
  },
  {
    question: "How does meniscus leveling eliminate streak marks in bar coating?",
    answer:
      "When liquid leaves the triangular gaps between the wire coils, it initially forms tiny parallel lines or ridges. If the coating fluid has adequate surface tension and correct solvent balance, capillary forces pull these fluid ridges sideways into each other within milliseconds before drying, creating a perfectly smooth, mirror-like coating.",
  },
  {
    question: "What causes ribbing or corduroy lines when using a Bar Coater?",
    answer:
      "Ribbing happens when the coating fluid is too viscous (thick) or has high thixotropic yield stress, preventing the fluid ridges from flowing together before drying. It also happens if the operator pulls the bar coater too fast, creating high shear rates that freeze the liquid ridges in place. Lowering the viscosity slightly or slowing the drawdown speed fixes this.",
  },
  {
    question: "Is manual drawdown as accurate as an automated motorized drawdown machine?",
    answer:
      "A skilled technician pulling a Bar Coater with steady hand speed and uniform downward pressure can achieve ± 1.5 µm repeatability. However, automated motorized film applicators eliminate human hand variability completely, providing ± 0.5 µm consistency across different laboratory operators and shifts.",
  },
  {
    question: "Can a Bar Coater be used in continuous roll-to-roll production lines?",
    answer:
      "Yes. In continuous web coating machines (such as siliconizing lines, carbonless paper coating, and adhesive tape manufacturing), motorized rotating Bar Coaters are mounted across the web. The bar is slowly rotated against or with web direction to prevent uneven wire wear and keep the wire grooves continuously clean.",
  },
  {
    question: "How does fluid shear rate affect coating thickness during a Bar Coater drawdown?",
    answer:
      "Because the wet liquid film is typically only 10 to 50 microns thin, drawing the Bar Coater at 100 mm/sec generates high shear rates exceeding 2,000 to 10,000 s⁻¹. For pseudoplastic (shear-thinning) fluids like flexo inks and latex emulsions, viscosity drops dramatically under the bar, allowing the fluid to pass cleanly through the triangular wire voids. Once the bar passes, shear drops to zero and viscosity recovers, allowing surface tension to level the ridges before sagging.",
  },
  {
    question: "Why does core rod diameter matter for wide substrate coating?",
    answer:
      "Stiffness against flexural bending scales with the fourth power of diameter (I = πd⁴/64). An 8 mm or 10 mm core rod is significantly stiffer than a 6 mm rod. When drawing down wide test sheets (280 mm to 350 mm), slight downward pressure on a thin rod causes the middle to bow upward by a few microns, leaving the coating heavier in the center than at the edges. ImageTech uses rigid 10 mm and 12 mm solid stainless cores for wide sizes to guarantee completely flat, uniform thickness from edge to edge.",
  },
  {
    question: "How does ambient temperature influence Bar Coater results?",
    answer:
      "Coating viscosity is inversely proportional to temperature. In summer, warm lab temperatures lower fluid viscosity, causing wet film to flow faster and level more easily, but solvent evaporates quicker. In cold winter labs, higher liquid viscosity can cause ribbing streaks. For ISO-certified repeatability, always run Bar Coater drawdowns in a climate-controlled room (23°C ± 2°C and 50% ± 5% relative humidity).",
  },
  {
    question: "Can a Bar Coater handle hot melt adhesives or molten wax?",
    answer:
      "Yes. For hot melts, waxes, and thermoplastic coatings, heated drawdown beds or pre-warmed Bar Coaters are used. Because stainless steel has high thermal endurance, ImageTech 316 Bar Coaters can withstand operating temperatures up to 300°C without wire loosening or core distortion.",
  },
];

const WorkingPrinciple = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <SEO
        title="Bar Coater Working Principle & Fluid Dynamics | Mayer Rod Physics | ImageTech Industries"
        description="Learn the physics and fluid mechanics behind wire wound Bar Coaters (Mayer Rods). Discover how capillary channel geometry, meniscus leveling, and hydrodynamic shear rate govern wet film thickness. Compare Bar Coaters against Doctor Blades, Bird Applicators, and Spin Coaters."
        keywords={[
          "bar coater working principle",
          "mayer rod principle",
          "how bar coater works",
          "wire wound rod physics",
          "drawdown bar fluid mechanics",
          "wet film thickness formula",
          "mayer rod vs doctor blade",
          "meniscus leveling",
          "ImageTech Industries",
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80 py-7 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Core Physics & Mechanics
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bar Coater <span className="text-blue-600">Working Principle</span> & Fluid Dynamics
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Understand the core physics of Mayer rod wire-wound technology. Learn how precision triangular capillaries, hydrodynamic shear, and surface tension meniscus leveling create mirror-flat coatings on paper, plastic, and foils.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Capillary Hydrodynamic Model
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                ASTM D823 Certified Standard
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Engineered for Operators & Chemists
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 4-Pill Sub-Nav */}
      <TechnicalGuidesNav />

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* Core Physics Breakdown */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              The Mayer Rod Mechanism
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              How Wire Wound Bar Coaters Meter Fluid with Micron Accuracy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              At first glance, a Bar Coater looks like a simple metal rod wrapped in wire. But underneath lies an elegant principle of fluid mechanics that delivers micro-metered coating layers with zero electronic sensors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-700 flex items-center justify-center font-black text-sm mb-4">
                  01
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  The Triangular Capillary Gaps
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When round wire is wrapped tightly around a cylindrical core rod, the space between two adjacent coils and the flat substrate below forms a tiny <strong>triangular orifice</strong>. The exact cross-sectional area of this triangular void is determined solely by the wire diameter ($d$):
                </p>
                <div className="mt-4 bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-blue-800 font-bold shadow-2xs">
                  Area ≈ 0.2146 × d²
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200/60">
                Because the wire diameter is controlled to ± 0.002 mm at our factory, the volume of this channel is completely uniform across the entire bar length.
              </p>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-700 flex items-center justify-center font-black text-sm mb-4">
                  02
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  The 50/50 Hydrodynamic Meniscus Split
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As the bar glides forward across the fluid pool, viscous drag and boundary layer shear cause the liquid in the capillary channel to split:
                </p>
                <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc pl-4">
                  <li><strong>50% of the volume</strong> adheres to the substrate and exits beneath the rod.</li>
                  <li><strong>50% of the volume</strong> rolls back into the forward liquid puddle.</li>
                </ul>
                <div className="mt-4 bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-emerald-800 font-bold shadow-2xs">
                  Wet Film (µm) ≈ 0.10 × d (wire in µm)
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200/60">
                Example: A 0.20 mm (200 µm) wire deposits an approximate 20 µm wet layer.
              </p>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-700 flex items-center justify-center font-black text-sm mb-4">
                  03
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  Capillary Surface Tension Leveling
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediately behind the trailing edge of the wire, the wet liquid exits as microscopic parallel ridges. Within <strong>10 to 50 milliseconds</strong>, surface tension pulls the peaks of these liquid ridges into the valleys.
                </p>
                <div className="mt-4 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
                  <span className="font-bold text-blue-700">Key Condition: </span>
                  If coating fluid has normal surface tension (&gt; 25 mN/m) and viscosity (&lt; 2,000 mPa.s), the ridges merge into a mirror-smooth continuous film before solvent evaporation begins.
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200/60">
                Self-leveling ensures high optical clarity and uniform barrier coat distribution.
              </p>
            </div>
          </div>
        </section>

        {/* Why Bar Coaters Are Indispensable */}
        <section className="bg-gradient-to-b from-slate-50/80 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Industrial Relevance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Bar Coaters are Critical in Modern Testing & Quality Control
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              In manufacturing industries where coating thickness directly dictates product performance—such as barrier pouch shelf life, optical clarity, or electrical conductivity—hand-brushing or roller testing fails due to operator inconsistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Zero Hand-Pressure Bias</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Because the wire windings physically rest on the substrate, extra hand downward force does not squeeze the gap smaller. Thickness is mechanically fixed by the wire diameter.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">60-Second Turnaround</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applying a coating sample and cleaning the rod with an alcohol wipe takes less than a minute, enabling labs to run 30+ formula iterations per hour.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Zero Raw Material Waste</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only 2 to 5 mL of coating fluid is needed per drawdown test, saving tens of thousands of rupees compared to filling an entire press coater pan.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Global Standard Compliance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Satisfies strict international test standards including ASTM D823 (producing uniform film thickness on test panels) and TAPPI T559.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Methodology Benchmarking
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Head-to-Head Comparison: Bar Coater vs Alternative Coating Methods
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              See why industrial laboratories, ink manufacturers, and packaging converters choose wire wound Bar Coaters over traditional doctor blades, bird bar applicators, or spin coaters.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Performance Parameter</th>
                  <th className="py-4 px-4 bg-blue-50/80 text-blue-900">Wire Wound Bar Coater</th>
                  <th className="py-4 px-4 text-slate-700">Doctor Blade</th>
                  <th className="py-4 px-4 text-slate-700">Bird Applicator</th>
                  <th className="py-4 px-4 text-slate-700">Spin Coater</th>
                  <th className="py-4 px-4 sm:px-6 text-slate-700">Lab Roller Coater</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700 text-xs sm:text-sm">
                {equipmentComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-4 bg-blue-50/40 font-bold text-blue-700">
                      {row.barCoater}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{row.doctorBlade}</td>
                    <td className="py-4 px-4 text-slate-600">{row.birdApplicator}</td>
                    <td className="py-4 px-4 text-slate-600">{row.spinCoater}</td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">{row.rollerCoater}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fluid Rheology, Shear Rate & Meniscus Behavior */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all duration-300 p-6 sm:p-10 overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Fluid Mechanics Deep-Dive
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fluid Rheology & High-Shear Dynamics Under a Wire Wound Bar Coater
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              When a Bar Coater glides forward across a test sheet, the fluid experiences high shear rates inside the microscopic triangular wire gaps. Understanding how different fluid types respond ensures zero streaks, zero ribbing, and 100% film repeatability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-50 border border-blue-200/60 text-blue-800 rounded-lg text-xs font-bold mb-3">
                  Newtonian Fluids
                </span>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Solvent Primers & Thin Inks
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Viscosity remains completely constant regardless of how fast you pull the bar. Capillary surface tension levels the microscopic wire ridges instantly within 10 to 20 milliseconds.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
                <strong className="text-blue-700">Recommended Drawdown Speed: </strong>
                75 to 100 mm/sec. Pulling too fast can pull air bubbles into thin liquids.
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 text-emerald-800 rounded-lg text-xs font-bold mb-3">
                  Pseudoplastic Fluids
                </span>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Water-Based Flexo & Emulsions
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Shear-thinning fluids experience a dramatic drop in viscosity while passing under the high shear of the Bar Coater wire. Once the bar moves past, viscosity recovers to prevent sagging or running off the sheet.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
                <strong className="text-emerald-700">Recommended Drawdown Speed: </strong>
                Steady 100 mm/sec to maintain uniform shear-thinning across the stroke.
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-purple-50 border border-purple-200/60 text-purple-800 rounded-lg text-xs font-bold mb-3">
                  Thixotropic Pastes
                </span>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  Adhesives, Epoxies & Slurries
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thick pastes possess a yield stress that resists flowing sideways to close wire ridges. If pulled too fast, the liquid ridges freeze in place, producing visible &quot;corduroy&quot; ribbing lines.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
                <strong className="text-purple-700">Operator Countermeasure: </strong>
                Use larger wire gauge (Bar No. 2 or 3) and pull at a slower, smoother speed.
              </div>
            </div>
          </div>
        </section>

        {/* Rod Diameter Physics: Why 10mm & 12mm Solid Cores Prevent Center Bowing */}
        <section className="bg-gradient-to-b from-slate-50/80 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/70 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Structural Rigidity & Accuracy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Core Rod Diameter Governs Coating Uniformity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-medium">
              When applying coatings across wide sample sheets (250 mm to 350 mm+), downward hand pressure or machine clamp forces can cause thin metal rods to bow slightly in the center. Here is the physics behind ImageTech&apos;s solid core engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">Core Size 6 mm</span>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Small Size Bar Coater</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ultra-lightweight rod designed for narrow test strips (up to 180 mm). Excellent tactile hand sensitivity for laboratory proofing with micro-thin inks and solvent primers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Max Recommended Width: 180 mm
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">Core Size 8 mm</span>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Medium Size Bar Coater</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Balanced rigidity and handling. Offers 3.1× higher resistance to bending than a 6 mm rod, making it perfect for standard A4 test sheets (210 mm to 240 mm width).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Max Recommended Width: 240 mm
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">Core Size 10 mm</span>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Big Size Bar Coater</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  7.7× stiffer than 6 mm. Completely eliminates center deflection on wide 280 mm working widths. Universal fit for 10 mm automatic motorized film applicator clamps.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                Industry Standard for A4+ & Machine Mounts
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">Core Size 12 mm</span>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Extra Big Size Bar Coater</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  16× stiffer than 6 mm. Built for extra-wide 350 mm+ sheets, heavy viscous adhesives, battery slurry testing, and pilot production coating lines without any sagging.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold">
                Heavy-Duty Industrial Laboratory Workhorse
              </div>
            </div>
          </div>
        </section>

        {/* Uniform FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions on Bar Coater Physics"
          subtitle="Theoretical & Practical FAQ"
          description="Everything you need to know about fluid mechanics, capillary flow, shear rate, and meniscus leveling in wire wound rods."
          faqs={faqs}
        />

        {/* Bottom CTA Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs text-blue-100 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Ready to Upgrade Your Laboratory Drawdowns?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              Order High-Precision Wire Wound Bar Coaters from ImageTech
            </h2>
            <p className="text-blue-100/90 text-sm mt-2 leading-relaxed">
              Manufactured with surgical stainless steel cores and micro-wound precision wires for maximum thickness repeatability. Pan-India same-day dispatch available from Delhi.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-md text-center"
            >
              Request A Quote
            </button>
            <Link
              to="/selection-guide"
              className="border border-white/40 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all text-center"
            >
              Selection Calculator &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default WorkingPrinciple;
