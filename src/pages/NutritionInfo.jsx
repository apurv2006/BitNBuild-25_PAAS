import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaAppleAlt, FaDrumstickBite, FaBreadSlice, FaLeaf } from "react-icons/fa";

function NutritionInfo({ nutritionData }) {
  const [showVitamins, setShowVitamins] = useState(false);

  // Example data (replace with backend fetch)
  const macros = nutritionData || {
    calories: 500,
    protein: 30,
    carbs: 60,
    fat: 20,
    vitamins: {
      A: "500 IU",
      C: "60 mg",
      D: "10 IU",
      Calcium: "200 mg",
    },
  };

  const chartData = [
    { name: "Protein", value: macros.protein },
    { name: "Carbs", value: macros.carbs },
    { name: "Fat", value: macros.fat },
  ];

  const getTickColor = (isDarkMode) => (isDarkMode ? "#E5E7EB" : "#111827");
  const getTooltipStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? "#1F2937" : "#F3F4F6",
    color: isDarkMode ? "#E5E7EB" : "#111827",
    borderRadius: "8px",
    border: "1px solid #6B7280"
  });

  // Small helper function to check for dark mode.
  const isDarkModeActive = () => document.documentElement.classList.contains('dark');

  return (
    <section
      id="nutrition"
      className="min-h-screen flex flex-col items-center justify-center p-10 bg-base-100 dark:bg-gray-900 transition-colors duration-500"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Nutritional Information</h2>

      {/* Macro Cards */}
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <div className="p-6 rounded-2xl shadow-xl w-44 flex flex-col items-center bg-white dark:bg-gray-800 transition-colors duration-500">
          <FaAppleAlt className="text-red-500 dark:text-red-400 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900 dark:text-white">{macros.calories} kcal</p>
          <p className="text-gray-700 dark:text-gray-400 font-semibold">Calories</p>
        </div>
        <div className="p-6 rounded-2xl shadow-xl w-44 flex flex-col items-center bg-white dark:bg-gray-800 transition-colors duration-500">
          <FaDrumstickBite className="text-yellow-700 dark:text-yellow-500 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900 dark:text-white">{macros.protein} g</p>
          <p className="text-gray-700 dark:text-gray-400 font-semibold">Protein</p>
        </div>
        <div className="p-6 rounded-2xl shadow-xl w-44 flex flex-col items-center bg-white dark:bg-gray-800 transition-colors duration-500">
          <FaBreadSlice className="text-orange-500 dark:text-orange-400 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900 dark:text-white">{macros.carbs} g</p>
          <p className="text-gray-700 dark:text-gray-400 font-semibold">Carbs</p>
        </div>
        <div className="p-6 rounded-2xl shadow-xl w-44 flex flex-col items-center bg-white dark:bg-gray-800 transition-colors duration-500">
          <FaLeaf className="text-green-600 dark:text-green-400 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900 dark:text-white">{macros.fat} g</p>
          <p className="text-gray-700 dark:text-gray-400 font-semibold">Fat</p>
        </div>
      </div>

      {/* Expandable Vitamins/Minerals */}
      <button
        className="btn btn-outline mb-6 bg-transparent text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500"
        onClick={() => setShowVitamins(!showVitamins)}
      >
        {showVitamins ? "Hide Vitamins & Minerals" : "Show Vitamins & Minerals"}
      </button>

      {showVitamins && (
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-xl">
          {Object.entries(macros.vitamins).map(([vit, val]) => (
            <div
              key={vit}
              className="p-4 rounded-xl shadow bg-gray-100 dark:bg-gray-800 dark:text-white flex justify-between transition-colors duration-500"
            >
              <span className="font-semibold text-gray-800 dark:text-gray-200">{vit}</span>
              <span className="font-bold text-gray-900 dark:text-white">{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* Macro Chart */}
      <div className="w-full max-w-xl h-64 p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-500">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: getTickColor(isDarkModeActive()), fontWeight: 'bold' }} />
            <YAxis tick={{ fill: getTickColor(isDarkModeActive()), fontWeight: 'bold' }} />
            <Tooltip
              contentStyle={getTooltipStyle(isDarkModeActive())}
              itemStyle={{ color: getTickColor(isDarkModeActive()) }}
            />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default NutritionInfo;