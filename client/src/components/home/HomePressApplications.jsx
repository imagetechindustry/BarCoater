import React from "react";
import { Link } from "react-router-dom";

const sectors = [
  {
    name: "Flexible Packaging & Barrier Films",
    desc: "BOPP, PET, and aluminium foil heat-seal lacquers, PVDC barriers, and primers.",
    badge: "Packaging",
    bar: "Bar No. 0 & 1",
  },
  {
    name: "Rotogravure & Flexo Printing Labs",
    desc: "Ink proofing, color matching with spectrophotometers, and solvent varnish testing.",
    badge: "Printing",
    bar: "Bar No. 0 & 1",
  },
  {
    name: "Paper Mills & Silicone Release",
    desc: "Release liners for label stock, clay coating, and barrier sizing against moisture.",
    badge: "Paper",
    bar: "Bar No. 1 & 2",
  },
  {
    name: "Pressure-Sensitive Adhesives",
    desc: "Water-based acrylic emulsions and hot melt adhesives for tape peel/shear tests.",
    badge: "Adhesives",
    bar: "Bar No. 2 & 3",
  },
  {
    name: "Paints & Protective Coatings",
    desc: "Leneta chart opacity drawdowns, automotive primers, and anti-corrosion epoxies.",
    badge: "Paints",
    bar: "Bar No. 1 & 2",
  },
  {
    name: "Battery Slurries & Electronics",
    desc: "Lithium-ion cathode/anode slurry drawdown onto copper/aluminium foils.",
    badge: "Cleanroom",
    bar: "Bar No. 2 & 3",
  },
];

const HomePressApplications = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Industry Verticals
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Applications Across 6 Industrial Sectors
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              ImageTech Bar Coaters are deployed in quality control laboratories, pilot coating lines, and packaging conversion plants across India.
            </p>
          </div>
          <div className="mt-6 md:mt-0 shrink-0">
            <Link
              to="/press-applications"
              className="inline-flex items-center text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-xs text-sm"
            >
              View Sector Guide & Case Studies
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, idx) => (
            <Link
              key={idx}
              to="/press-applications"
              className="group bg-gray-50 hover:bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-black tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                    {s.badge}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {s.bar}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {s.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                Read sector guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePressApplications;
