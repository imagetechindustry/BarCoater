import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const HomeSelectionCalculator = () => {
  const [targetDryFilm, setTargetDryFilm] = useState(12);
  const [solidsPercent, setSolidsPercent] = useState(45);

  const calculatedWetFilm = useMemo(() => {
    const solids = Math.max(1, Number(solidsPercent) || 1) / 100;
    const dry = Number(targetDryFilm) || 1;
    return Math.round((dry / solids) * 10) / 10;
  }, [targetDryFilm, solidsPercent]);

  const recommendedRod = useMemo(() => {
    if (calculatedWetFilm <= 16) {
      return {
        model: "Small Size Bar Coater (No. 0)",
        wire: "0.08 mm – 0.20 mm",
        rodDia: "6 mm core",
        app: "Thin gravure inks, optical coatings & barrier primers",
      };
    } else if (calculatedWetFilm <= 32) {
      return {
        model: "Medium Size Bar Coater (No. 1)",
        wire: "0.20 mm – 0.40 mm",
        rodDia: "8 mm core",
        app: "Water-based varnishes, flexo proofing & paper sizing",
      };
    } else if (calculatedWetFilm <= 64) {
      return {
        model: "Big Size Bar Coater (No. 2)",
        wire: "0.40 mm – 0.80 mm",
        rodDia: "10 mm core",
        app: "Laminating adhesives, paints & emulsion drawdowns",
      };
    } else {
      return {
        model: "Extra Big Size Bar Coater (No. 3)",
        wire: "0.80 mm – 1.50 mm",
        rodDia: "12 mm core",
        app: "Heavy hot melts, paste resins & high-build lacquers",
      };
    }
  }, [calculatedWetFilm]);

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Engineering Sizing Suite
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Instant Bar Coater & Wet Film Calculator
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Calculate your required wet film thickness in seconds and identify the exact wire wound Bar Coater number for your laboratory testing.
            </p>
          </div>
          <div className="mt-6 md:mt-0 shrink-0">
            <Link
              to="/selection-guide"
              className="inline-flex items-center text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-xs text-sm"
            >
              Full Selection Guide & Sizing Table
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  Target Dry Coating Thickness (µm)
                </span>
                <span className="text-sm font-extrabold text-blue-700 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-xs">
                  {targetDryFilm} µm
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                value={targetDryFilm}
                onChange={(e) => setTargetDryFilm(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>2 µm (Thin Primer)</span>
                <span>25 µm (Standard Varnish)</span>
                <span>50 µm (Heavy Adhesive)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  Formulation Solid Content (%)
                </span>
                <span className="text-sm font-extrabold text-blue-700 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-xs">
                  {solidsPercent}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                value={solidsPercent}
                onChange={(e) => setSolidsPercent(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>15% (Solvent Inks)</span>
                <span>50% (Water-based Emulsion)</span>
                <span>100% (100% Solid UV / Hot Melt)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="leading-relaxed">
                <strong>Calculation Formula: </strong>
                Wet Film Thickness (µm) = Dry Film Thickness ÷ (Solids % ÷ 100). Theoretical wet pick-up is equivalent to 1 g/m² per 1 µm wet thickness for standard water/solvent density.
              </p>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Recommended Match
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-2 leading-tight">
                {recommendedRod.model}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {recommendedRod.app}
              </p>

              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Calculated Wet Film:</span>
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {calculatedWetFilm} µm
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Core Rod Diameter:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.rodDia}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">Estimated Wire Gauge:</span>
                  <span className="font-bold text-gray-900">{recommendedRod.wire}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs text-center"
              >
                Get Quote
              </button>
              <Link
                to="/selection-guide"
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-2.5 rounded-xl text-xs transition-colors border border-gray-200 text-center"
              >
                Full Sizing Matrix
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSelectionCalculator;
