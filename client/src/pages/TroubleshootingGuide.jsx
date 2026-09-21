import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/technical/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import scrollToTop from "../utils/scrollToTop";

const quickFinderProblems = [
  {
    symptom: "Thin continuous lines or streaks running down the length of the coating",
    likelyCause: "Dried ink/varnish particle or lint fiber stuck inside the wire spiral groove",
    quickFix: "Wipe with solvent-soaked lint-free cloth. Brush gently along the spiral winding with a soft brass brush.",
    urgency: "Immediate",
  },
  {
    symptom: "Wavy corduroy or parallel washboard ridges that fail to level out",
    likelyCause: "Fluid viscosity is too high or manual drawdown speed is excessively fast",
    quickFix: "Dilute coating formulation with recommended solvent; slow down your hand pulling speed to 50–100 mm/sec.",
    urgency: "Immediate",
  },
  {
    symptom: "Tiny bare spots, pinholes, or fish-eye craters with dry centers",
    likelyCause: "Substrate surface tension is too low (poor corona dyne) or silicone/oil contamination",
    quickFix: "Check film dyne level (&gt; 38 dynes/cm); wipe substrate with IPA; allow liquid to de-aerate to eliminate micro-bubbles.",
    urgency: "High",
  },
  {
    symptom: "Coating is thicker on the left or right side of the test sheet",
    likelyCause: "Uneven downward hand pressure or warped/unlevel drawdown clipboard",
    quickFix: "Use two hands positioned evenly over bare ends; inspect drawdown pad with a straightedge level.",
    urgency: "High",
  },
  {
    symptom: "Fluid puddles overflow and flood over the ends of the bar",
    likelyCause: "Applied liquid volume in front of the bar is too large, or working length is too narrow for substrate",
    quickFix: "Apply fluid using a graduated pipette (2–4 mL maximum); upgrade to a longer working length Bar Coater.",
    urgency: "Moderate",
  },
  {
    symptom: "Permanent streak line always appearing in the exact same spot",
    likelyCause: "A wire winding has been physically dented, nicked, or flattened by drop impact",
    quickFix: "Inspect under a 10x magnifying loupe. If wire is dented, the rod must be replaced. Wire cannot be re-straightened.",
    urgency: "Replacement",
  },
];

const diagnosticCards = [
  {
    code: "BC-ERR-01",
    title: "Longitudinal Streak Lines",
    visual: "Fine, unbroken vertical lines running parallel to the direction of the drawdown stroke.",
    mechanism:
      "A dry pigment agglomerate, dust particle, or paper lint fiber has wedged itself into the narrow triangular gap between adjacent wire coils. As the rod is pulled, this particle blocks fluid passage, starving the substrate and leaving an uncoated scratch-like stripe.",
    countermeasure:
      "1. Stop the drawdown immediately and inspect the wire under good light.\n2. Soak a soft cloth in ethyl acetate, MEK, or warm water.\n3. Wrap the cloth around the rod and twist in the direction of the winding.\n4. If dried resin remains, use a soft brass bristle brush along the spiral angle. Never scrape with razor blades or steel screwdrivers.",
    recommendedModel: "Use Bar Coater No. 0 or No. 1 with smooth 316 stainless electropolished wire.",
  },
  {
    code: "BC-ERR-02",
    title: "Ribbing & Corduroy Patterns",
    visual: "The entire wet film looks like corrugated cardboard or corduroy fabric with distinct parallel ridges.",
    mechanism:
      "When coating fluid exits the wire gaps, it forms microscopic ridges. Under high shear rates or excessive viscosity (&gt; 1,500 mPa.s), the fluid's yield stress prevents surface tension from leveling these ridges before solvent evaporation freezes them in place.",
    countermeasure:
      "1. Check fluid viscosity with a Zahn cup or Ford cup.\n2. Add 2% to 5% recommended retarder solvent to slow down surface flash-off.\n3. Reduce operator pulling speed. A steady, gentle glide of 50 mm/sec allows maximum time for capillary meniscus leveling.\n4. If coating must remain thick, switch to a larger wire gauge (Bar No. 2).",
    recommendedModel: "Bar Coater Medium Size (No. 1) with slower drawdown rate.",
  },
  {
    code: "BC-ERR-03",
    title: "Pinholes, Craters & Dewetting",
    visual: "Circular dry voids where the liquid pulls away, leaving bare substrate or a doughnut-shaped rim.",
    mechanism:
      "Thermodynamic surface tension mismatch. If the liquid surface tension is higher than the substrate's critical surface energy, the liquid cannot wet the surface and contracts into beads (like water on a waxed car). Also caused by aerosol silicone or air bubbles.",
    countermeasure:
      "1. Measure film surface dyne level with dyne pens. Corona-treat film if below 38 dynes/cm.\n2. Add 0.1% to 0.3% leveling additive/surfactant to lower liquid surface tension.\n3. Allow ink/varnish to rest for 15 minutes after high-speed mixing to eliminate entrapped micro-foam.",
    recommendedModel: "Standard Bar Coater on vacuum drawdown bed.",
  },
  {
    code: "BC-ERR-04",
    title: "Transverse Thickness Taper",
    visual: "The left side of the coated panel is 25 µm thick while the right side is only 14 µm thick.",
    mechanism:
      "Uneven human operator grip pressure, or a deformed drawdown clipboard. Manual operators naturally exert more downward force with their dominant hand, tilting the rod microscopic degrees into the soft substrate.",
    countermeasure:
      "1. Place your index fingers symmetrically on the bare metal ends of the bar.\n2. Pull from the elbows and shoulders rather than twisting wrists.\n3. Ensure your drawdown clipboard is perfectly flat; replace worn rubber backing pads every 6 months.\n4. For ISO certified labs, use an automatic motorized film applicator.",
    recommendedModel: "Bar Coater Big Size (No. 2) with rigid 10mm core rod.",
  },
  {
    code: "BC-ERR-05",
    title: "Edge Bead & Fluid Overflow",
    visual: "Heavy fluid ridges along both outer borders of the sample with puddles spilling onto the clipboard.",
    mechanism:
      "Applying an excessive pool of fluid ahead of the bar coater. Hydrodynamic pressure forces fluid sideways along the rod face, overflowing the working wound section and flooding over the bare ends.",
    countermeasure:
      "1. Meter the starting fluid with a disposable pipette: 2 mL is plenty for an A4 panel.\n2. Apply the liquid in a continuous horizontal bead across the top of the substrate, 15 mm below the top edge.\n3. Always select a Bar Coater with working length 30 mm wider than the sample sheet.",
    recommendedModel: "Upgrade working length from 180mm to 220mm or 280mm.",
  },
  {
    code: "BC-ERR-06",
    title: "Wire Denting & Rod Bending",
    visual: "A permanent defect line that repeats at identical distance across every test sheet.",
    mechanism:
      "Physical impact trauma. The Bar Coater was dropped onto a hard stainless lab bench, or clamped too tightly in an unpadded vise, or an abrasive metal particle was dragged under high downward pressure, nicking the stainless wire coils.",
    countermeasure:
      "1. Inspect the rod with a 10x eye loupe to confirm dented wire.\n2. A dented wire wound rod cannot be repaired or unbent without ruining calibration.\n3. Retire the rod immediately to prevent false laboratory test data.\n4. Always store Bar Coaters horizontally on padded wall racks or in cylindrical protective plastic shipping tubes.",
    recommendedModel: "Replace with genuine ImageTech 316 Stainless Bar Coater.",
  },
];

const cleaningSteps = [
  {
    step: "01",
    title: "Immediate Solvent Flush",
    action:
      "Never let ink or adhesive dry on the rod. The second your drawdown is complete, wipe the bar immediately with a solvent-soaked lint-free microfiber cloth while the coating is still wet.",
    time: "Within 10 seconds",
  },
  {
    step: "02",
    title: "Groove Spiral Brushing",
    action:
      "To remove fluid trapped deep between the wire coils, use a soft brass or nylon bristle brush. Always brush gently along the spiral winding angle—never scrub aggressively across the wires, which can dislodge fine coils.",
    time: "30 seconds",
  },
  {
    step: "03",
    title: "Ultrasonic Bath for Stubborn Resins",
    action:
      "For cross-linked UV coatings, epoxy lacquers, or dried water-based emulsions, submerge the rod in an ultrasonic cleaning tank filled with mild solvent or ultrasonic detergent for 3–5 minutes at 40°C.",
    time: "3 to 5 minutes",
  },
  {
    step: "04",
    title: "Horizontal Storage",
    action:
      "Dry the bar with clean compressed air or a soft cloth. Store horizontally on a grooved PVC or rubber wall rack. Never stand Bar Coaters upright in beakers or toss them loose in tool drawers where wires can strike metal edges.",
    time: "End of Shift",
  },
];

const faqs = [
  {
    question: "Can I clean dried, cured ink out of a Bar Coater with a razor blade?",
    answer:
      "No, absolutely not. Scraping with razor blades, screwdrivers, or harsh wire brushes will permanently scratch or dent the stainless steel winding wire. Once a wire is nicked or flattened, it leaves a permanent streak on every future drawdown and the rod must be replaced. Use appropriate solvents, soft brass brushes, or an ultrasonic bath instead.",
  },
  {
    question: "How do I know if my Bar Coater is worn out and needs replacement?",
    answer:
      "Signs that your Bar Coater is worn out include: 1) Measuring dry coating weights that are consistently 15% to 20% lower than calibration specs, 2) Visible shiny flat spots on the crowns of the wires when inspected under a 10x eye loupe, or 3) Loose wire coils that slide along the core when pushed gently with a fingernail.",
  },
  {
    question: "What is the best cleaning solvent for water-based flexo ink on Bar Coaters?",
    answer:
      "For wet water-based flexo inks, warm water with a mild alkaline cleaner (or 10% IPA solution) works best. If the ink has dried, use a specialized anilox/plate cleaner or 50% isopropanol with 50% water. Rinse with clean water and dry thoroughly with compressed air.",
  },
  {
    question: "What is the best cleaning solvent for solvent-based gravure inks and varnishes?",
    answer:
      "Ethyl acetate or methyl ethyl ketone (MEK) is standard for dissolving dried gravure resins, nitrocellulose inks, and polyurethane coatings. Always wear nitrile gloves and work under a laboratory fume hood when handling volatile solvents.",
  },
  {
    question: "Why does my Bar Coater bend or bow in the middle during manual drawdowns?",
    answer:
      "If you are coating a wide web (e.g. 300 mm) with a thin 6 mm core rod, heavy downward hand pressure will cause the rod to bow upward in the middle, leaving a coating that is thick in the center and thin at the edges. For wide panels or high-viscosity coatings, upgrade to our 10 mm or 12 mm solid stainless steel core Bar Coaters, which possess 4x higher rigidity.",
  },
  {
    question: "How often should commercial quality control labs calibrate or replace Bar Coaters?",
    answer:
      "For high-volume laboratories running 20+ drawdowns daily on abrasive substrates (such as pigmented titanium dioxide white inks or clay slurry), we recommend replacing Bar Coaters every 6 to 12 months. For standard QA ink proofing, rods last 2 to 3+ years with proper cleaning and horizontal storage.",
  },
  {
    question: "Why does a streak line appear in the exact same spot on every single test sheet?",
    answer:
      "If a continuous longitudinal line appears at the exact same horizontal position across multiple test sheets, the cause is 100% mechanical. Either a tiny particle of cured resin or lint is wedged deep inside the wire groove at that exact spot, or one of the wire coils has sustained a physical dent or nick. Try cleaning that localized spot with an ultrasonic bath and soft brass brush. If the streak persists under a clean wire, the wire is dented and the rod must be replaced.",
  },
  {
    question: "Can a damaged or dented Bar Coater wire be repaired or rewound?",
    answer:
      "Attempting to re-wrap wire manually in a lab destroys spiral tension and creates uneven pitch spacing, ruining film accuracy. ImageTech Industries offers professional factory stripping and CNC rewinding for heavy solid core bars (10 mm and 12 mm cores). For standard 6 mm and 8 mm lab rods, replacement with a brand new factory-calibrated Bar Coater is more economical and ensures guaranteed ± 1 µm calibration.",
  },
  {
    question: "Why does coating fluid leak out of the left and right edges during drawdowns?",
    answer:
      "Fluid overflow at the edges happens when the liquid puddle is poured wider than the working coating width of the bar, or when too much fluid volume is dispensed. Always pour a bead that is 20 mm narrower than the wound wire length. Ensure your Bar Coater working length is at least 25 mm wider than your test paper or film sheet.",
  },
  {
    question: "What causes micro-foaming or bubbling when drawing down water-based coatings?",
    answer:
      "Micro-bubbles are caused by rapid liquid shearing entrapping ambient air, or by using a fresh coating mixture that hasn't de-aerated. To fix this: 1) Let the liquid rest for 20 minutes after high-speed mechanical mixing, 2) Add 0.1% defoamer additive if approved by formulation, and 3) Pull the Bar Coater at a smooth, steady 60 to 80 mm/sec rather than yanking it fast.",
  },
];

const TroubleshootingGuide = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <SEO
        title="Bar Coater Defect Troubleshooting & Cleaning Guide | ImageTech Industries"
        description="Solve coating defects with our visual Quick-Finder table. Diagnose streak lines, ribbing, pinholes, craters, and uneven film thickness. Includes 6 detailed defect diagnostic cards and standard cleaning SOP for wire wound Bar Coaters by ImageTech Industries India."
        keywords={[
          "bar coater troubleshooting",
          "bar coater streak lines",
          "bar coater ribbing",
          "mayer rod defect guide",
          "cleaning wire wound bar coater",
          "drawdown bar maintenance",
          "bar coater pinholes fix",
          "how to clean mayer rod",
          "ImageTech Industries",
        ]}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-gray-50 border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Pressroom Troubleshooting Suite
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Bar Coater <span className="text-blue-600">Defect Troubleshooting</span> & Cleaning Guide
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Eliminate coating streak lines, corduroy ribbing, pinholes, and thickness variations. Use our visual Quick-Finder table and 6 diagnostic cards to resolve coating problems directly on your lab bench.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                6 Diagnostic Defect Cards
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Daily 4-Step Cleaning SOP
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-xs">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Instant Pressroom Countermeasures
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 4-Pill Sub-Nav */}
      <TechnicalGuidesNav />

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Visual Quick-Finder Table */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Immediate Diagnostic Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Visual Quick-Finder: Match Your Coating Symptom
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Find your visible coating problem below to identify root causes and immediate operator fixes.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-black text-gray-700 uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6">Visible Symptom</th>
                  <th className="py-4 px-4">Probable Root Cause</th>
                  <th className="py-4 px-4">Immediate Pressroom Fix</th>
                  <th className="py-4 px-4 sm:px-6">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {quickFinderProblems.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-gray-900 min-w-[200px]">
                      {row.symptom}
                    </td>
                    <td className="py-4 px-4 text-gray-700 min-w-[180px]">
                      {row.likelyCause}
                    </td>
                    <td className="py-4 px-4 text-xs text-blue-900 font-medium min-w-[240px]">
                      {row.quickFix}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          row.urgency === "Immediate"
                            ? "bg-red-100 text-red-800"
                            : row.urgency === "High"
                            ? "bg-amber-100 text-amber-800"
                            : row.urgency === "Replacement"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {row.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 Detailed Defect Diagnostic Cards */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Root Cause Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Detailed Defect Diagnostic Cards
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              In-depth analysis of physical coating failures, hydrodynamic mechanisms, and preventive standard operating procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosticCards.map((card) => (
              <div
                key={card.code}
                className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md">
                      {card.code}
                    </span>
                    <span className="text-xs font-bold text-gray-400">Defect Code</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
                    {card.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-gray-800 block mb-1">Visual Manifestation:</span>
                      <p className="text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        {card.visual}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-gray-800 block mb-1">Physics & Mechanism:</span>
                      <p className="text-gray-600 leading-relaxed">
                        {card.mechanism}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-700 block mb-1">Operator Action Steps:</span>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                        {card.countermeasure}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  <span className="font-bold text-gray-800">Recommendation: </span>
                  {card.recommendedModel}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Maintenance & Cleaning SOP */}
        <section className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Daily Cleaning & Maintenance Protocol for Bar Coaters
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Following this 4-step SOP after every shift prevents dried resin buildup, extends rod life by 300%, and guarantees zero streak lines on your test drawdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cleaningSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-base flex items-center justify-center mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.action}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-[11px] font-bold text-emerald-700">
                  Target Timing: {step.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preventative Maintenance Schedule for Testing Labs */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Quality Assurance Best Practices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Bar Coater Preventative Maintenance & Inspection Schedule
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Establishing a routine inspection and cleaning cycle prevents costly formulation re-tests and extends the operational life of precision wire wound Bar Coaters by up to 300%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold mb-3">
                  Pre-Shift (Start of Day)
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">Visual & Tactile Check</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Inspect the rod under bright LED light with a 10x pocket loupe. Run a clean gloved finger along the wire winding. Check for dried ink specs, flattened crowns, or loose wire wraps.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-gray-600 font-medium">
                Pass criteria: 100% smooth, tight wire coils with zero play.
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold mb-3">
                  In-Process (Between Tests)
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">Immediate Solvent Flush</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Immediately after pulling a drawdown, place the rod horizontally in a shallow solvent trough or wipe firmly with an IPA/ethyl acetate soaked rag before the puddle residue skins over.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-emerald-700 font-bold">
                Never allow resin to dry inside wire valleys.
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold mb-3">
                  End-of-Shift (Daily)
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">Deep Clean & Rack</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Perform a gentle spiral brushing along the wire winding using a soft brass or nylon brush. Submerge in an ultrasonic bath for 3 minutes if testing UV or cross-linked resins. Dry completely.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-gray-600 font-medium">
                Store horizontally on grooved wall rack.
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-orange-100 text-orange-800 rounded-lg text-xs font-bold mb-3">
                  Monthly / Quarterly
                </span>
                <h3 className="font-bold text-base text-gray-900 mb-2">Calibration Verification</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Run a standardized reference drawdown using calibration oil or standard flexo black on Mylar film. Measure dry coat weight. If transfer drops &gt; 15% from baseline, retire and replace the rod.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-[11px] text-blue-700 font-bold">
                Guarantees ISO 9001:2015 audit compliance.
              </div>
            </div>
          </div>
        </section>

        {/* Substrate Surface Energy & Dyne Testing Protocol */}
        <section className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200">
          <div className="max-w-3xl mb-8">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1">
              Substrate Chemistry Troubleshooting
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Solving Dewetting, Fisheyes & Crawling via Dyne Level Testing
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              When a Bar Coater draws down fluid and the wet layer breaks apart into droplets or beads within 3 seconds, the problem is not the rod—it is low substrate surface energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="font-bold text-base text-gray-900 mb-2">
                Perform Dyne Pen Test
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Draw a continuous stroke across your untreated film using a 38-dyne or 40-dyne test pen. If the liquid line beads up within 2 seconds, the substrate surface energy is below 38 dynes/cm.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                Target: Water coatings need ≥ 42 dynes; solvent needs ≥ 36 dynes.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="font-bold text-base text-gray-900 mb-2">
                Corona Discharge Treatment
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For polymer films (BOPP, PET, HDPE), pass the sheet under an electronic benchtop corona discharge wand. This oxidizes the surface, raising surface energy to 44–48 dynes for instant wetting.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-blue-700 font-bold">
                Eliminates 99% of film fisheyes instantly.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mb-3">
                3
              </span>
              <h3 className="font-bold text-base text-gray-900 mb-2">
                Surfactant Wetting Additive
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                If the substrate cannot be corona-treated, lower the liquid&apos;s surface tension instead. Adding 0.2% to 0.5% silicone polyether or fluorosurfactant allows the fluid to wet low-energy substrates smoothly.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-700 font-bold">
                Levels the film before solvent starts evaporating.
              </div>
            </div>
          </div>
        </section>

        {/* Uniform FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions on Bar Coater Troubleshooting"
          subtitle="Maintenance & Defect FAQ"
          description="Straightforward advice on removing streaks, ultrasonic cleaning, repairing wire nicks, and proper storage racks."
          faqs={faqs}
        />

        {/* Bottom CTA Card */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-200 text-xs font-black uppercase tracking-widest block mb-2">
              Persistent Coating Streaks or Dented Wires?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Replace Your Worn Wires with Precision ImageTech Bar Coaters
            </h2>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              Don't let worn or dented wire wound rods ruin your formulation testing. Order precision replacement Bar Coaters with fast pan-India delivery from our Delhi manufacturing plant.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-md text-center"
            >
              Order Replacement Bar Coater
            </button>
            <Link
              to="/selection-guide"
              className="border border-white/50 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all text-center"
            >
              Check Sizing Table &rarr;
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default TroubleshootingGuide;
