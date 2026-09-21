import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scrollToTop from "../../utils/scrollToTop";

const technicalLinks = [
  { name: "Selection & Sizing Guide", href: "/selection-guide" },
  { name: "Working Principle & Physics", href: "/working-principle" },
  { name: "Press Applications", href: "/press-applications" },
  { name: "Defect Troubleshooting", href: "/troubleshooting-guide" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Certifications", href: "/certifications" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href) || location.hash === href;
  };

  const isTechActive = technicalLinks.some((l) => location.pathname === l.href);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTechDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTechDropdownOpen(false);
    }, 150);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTechDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="https://www.imagetechindustries.com"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="ImageTech Industries Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/") && !isTechActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/about")
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              About Us
            </Link>

            {/* Technical Guides Dropdown */}
            <div
              className="relative py-2"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  isTechActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-900 font-bold hover:text-blue-600"
                }`}
                aria-expanded={techDropdownOpen}
              >
                <span>Technical Guides</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    techDropdownOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Simple & Smooth Dropdown Menu with zero gap */}
              {techDropdownOpen && (
                <div
                  className="absolute left-0 top-full pt-1 w-64 z-50 animate-fadeIn"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden">
                    {technicalLinks.map((tech) => {
                      const active = location.pathname === tech.href;
                      return (
                        <Link
                          key={tech.href}
                          to={tech.href}
                          onClick={() => {
                            setTechDropdownOpen(false);
                            scrollToTop();
                          }}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                            active
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                          }`}
                        >
                          <span>{tech.name}</span>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/certifications"
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/certifications")
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Certifications
            </Link>
            <Link
              to="/sitemap"
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/sitemap")
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Sitemap
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/contact")
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-quote-modal"))
              }
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center"
            >
              Get A Quote
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-gray-900 focus:outline-none p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full z-50">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive("/") && !isTechActive
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive("/about")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              About Us
            </Link>

            {/* Mobile Technical Guides Accordion */}
            <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50/70">
              <button
                type="button"
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-base font-bold transition-colors ${
                  isTechActive ? "text-blue-600" : "text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Technical Guides</span>
                  <span className="text-[10px] uppercase font-black tracking-wider bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md">
                    4 Guides
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    mobileTechOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileTechOpen && (
                <div className="px-2 pb-2 space-y-1 border-t border-gray-200/60 pt-1.5 bg-white">
                  {technicalLinks.map((tech) => {
                    const active = location.pathname === tech.href;
                    return (
                      <Link
                        key={tech.href}
                        to={tech.href}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileTechOpen(false);
                          scrollToTop();
                        }}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? "bg-blue-50 text-blue-700 font-bold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        {tech.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Link
              to="/certifications"
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive("/certifications")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Certifications
            </Link>
            <Link
              to="/sitemap"
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive("/sitemap")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Sitemap
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`block px-3 py-2.5 rounded-xl text-base font-semibold ${
                isActive("/contact")
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Contact Us
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                Get A Quote
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
