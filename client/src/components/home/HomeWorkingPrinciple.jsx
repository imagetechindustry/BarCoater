import React from "react";
import { Link } from "react-router-dom";

const HomeWorkingPrinciple = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Fluid Mechanics & Core Physics
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              How Wire Wound Bar Coaters Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              The Mayer rod uses precision capillary channels to meter liquid coatings with sub-micron repeatability.
            </p>
          </div>
          <div className="mt-6 md:mt-0 shrink-0">
            <Link
              to="/working-principle"
              className="inline-flex items-center text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 px-6 py-2.5 rounded-full font-semibold transition-colors shadow-xs text-sm"
            >
              Explore Full Working Principle & Physics
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Triangular Capillary Channels
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Tightly wound stainless steel wire creates micro-sized triangular cavities between adjacent wire coils and the substrate. The cross-sectional void area is mathematically fixed by the wire gauge.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-bold text-blue-600">
              Cross Section: Area ≈ 0.2146 × d²
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Hydrodynamic Meniscus Split
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              As the Bar Coater glides over the substrate, fluid boundary layers split approximately 50/50. Exactly half of the channel volume transfers to the substrate, yielding a wet film of ~10% of the wire diameter.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-bold text-blue-600">
              Thickness Rule: Wet Film ≈ 0.10 × Wire Diameter
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Surface Tension Leveling
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Fluid ridges initially exit the wire coils as micro-lines. Natural capillary surface tension forces pull the ridges sideways into the valleys within 20 milliseconds, leveling into a flawless uniform film.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-bold text-blue-600">
              Leveling Time: 10–50 ms before drying
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWorkingPrinciple;
