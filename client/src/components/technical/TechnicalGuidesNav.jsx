import React from "react";
import { Link, useLocation } from "react-router-dom";
import scrollToTop from "../../utils/scrollToTop";

const guides = [
  {
    name: "Selection & Sizing",
    href: "/selection-guide",
    badge: "Calculator",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Working Principle",
    href: "/working-principle",
    badge: "Physics Core",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: "Press Applications",
    href: "/press-applications",
    badge: "6 Sectors",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "Defect Troubleshooting",
    href: "/troubleshooting-guide",
    badge: "Quick-Finder",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

const TechnicalGuidesNav = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-20 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 pr-2 border-r border-gray-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Technical Suite
          </span>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {guides.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={scrollToTop}
                  className={`group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap shadow-xs ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200/80"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-blue-600 group-hover:text-blue-700"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  <span
                    className={`hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider ${
                      isActive
                        ? "bg-blue-700/80 text-blue-100"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalGuidesNav;
