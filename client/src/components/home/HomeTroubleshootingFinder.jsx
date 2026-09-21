import React from "react";
import { Link } from "react-router-dom";

const commonDefects = [
  {
    code: "BC-ERR-01",
    name: "Streak Lines & Scratches",
    symptom: "Uncoated thin line running parallel to drawdown",
    cause: "Dried ink/particle wedged in wire winding",
    fix: "Wipe with solvent-soaked cloth; brush along groove with soft brass brush.",
    urgency: "Immediate",
  },
  {
    code: "BC-ERR-02",
    name: "Corduroy Ribbing",
    symptom: "Parallel wavy ridges that fail to level out",
    cause: "Viscosity too high or drawdown speed too fast",
    fix: "Dilute fluid slightly; reduce hand pulling speed to 50–100 mm/sec.",
    urgency: "Immediate",
  },
  {
    code: "BC-ERR-03",
    name: "Pinholes & Fish-Eyes",
    symptom: "Circular bare spots where liquid pulls away",
    cause: "Film surface tension < 38 dynes or trapped air",
    fix: "Corona-treat film; allow coating to de-aerate 15 min after mixing.",
    urgency: "High",
  },
  {
    code: "BC-ERR-04",
    name: "Uneven Left/Right Thickness",
    symptom: "One side of sample is visibly heavier",
    cause: "Uneven hand pressure or unlevel clipboard",
    fix: "Place index fingers symmetrically on bare ends; use flat glass bed.",
    urgency: "High",
  },
];

const HomeTroubleshootingFinder = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Operator Diagnostic Tool
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Coating Defect Quick-Finder
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Identify coating failures instantly. Match your visible sample defect to find root causes and pressroom countermeasures.
            </p>
          </div>
          <div className="mt-6 md:mt-0 shrink-0">
            <Link
              to="/troubleshooting-guide"
              className="inline-flex items-center text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 px-6 py-2.5 rounded-full font-semibold transition-colors shadow-xs text-sm"
            >
              Full Troubleshooting Guide & 6 Defect Cards
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commonDefects.map((defect) => (
            <div
              key={defect.code}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-black tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                    {defect.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md ${
                      defect.urgency === "Immediate"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {defect.urgency}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">
                  {defect.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 italic">
                  "{defect.symptom}"
                </p>
                <div className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 space-y-1">
                  <div>
                    <span className="font-bold text-gray-900">Cause: </span>
                    {defect.cause}
                  </div>
                  <div>
                    <span className="font-bold text-blue-700">Fix: </span>
                    {defect.fix}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link
                  to="/troubleshooting-guide"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View full diagnostic card &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTroubleshootingFinder;
