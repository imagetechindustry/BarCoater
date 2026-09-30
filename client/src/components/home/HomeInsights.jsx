import React from "react";

const articles = [
  {
    id: 1,
    title: "How to Choose the Right Bar Coater for Your Testing Needs",
    date: "Mar 15, 2024",
    category: "Technical Guide",
    image: "/BARCOATER/bar-coater-no-0/143.jpg",
  },
  {
    id: 2,
    title: "Improving Laboratory Testing with Precision Bar Coaters",
    date: "Feb 28, 2024",
    category: "Industry Insight",
    image: "/BARCOATER/bar-coater-no-1/159.jpg",
  },
  {
    id: 3,
    title: "Advancements in Industrial Coating Evaluations",
    date: "Jan 15, 2024",
    category: "Product Update",
    image: "/BARCOATER/bar-coater-no-3/158.jpg",
  },
];

const HomeInsights = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
          <div>
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Latest Insights
            </h4>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              Technical Knowledge for Better Performance
            </h2>
          </div>
          <div className="mt-4 md:mt-0 shrink-0">
            <button className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
              View All Articles
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer h-28"
            >
              <div className="w-1/3 h-full overflow-hidden shrink-0 relative bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <h3 className="font-bold text-sm text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-900 font-medium truncate">
                  {article.date} | {article.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInsights;
