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

  return (
    <section
      id="nutrition"
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-10"
    >
    

      {/* Macro Cards */}
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <div className="card p-6 shadow-lg w-44 flex flex-col items-center bg-white">
          <FaAppleAlt className="text-red-500 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900">{macros.calories} kcal</p>
          <p className="text-gray-700 font-semibold">Calories</p>
        </div>
        <div className="card p-6 shadow-lg w-44 flex flex-col items-center bg-white">
          <FaDrumstickBite className="text-yellow-700 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900">{macros.protein} g</p>
          <p className="text-gray-700 font-semibold">Protein</p>
        </div>
        <div className="card p-6 shadow-lg w-44 flex flex-col items-center bg-white">
          <FaBreadSlice className="text-orange-500 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900">{macros.carbs} g</p>
          <p className="text-gray-700 font-semibold">Carbs</p>
        </div>
        <div className="card p-6 shadow-lg w-44 flex flex-col items-center bg-white">
          <FaLeaf className="text-green-600 text-4xl mb-2" />
          <p className="font-bold text-xl text-gray-900">{macros.fat} g</p>
          <p className="text-gray-700 font-semibold">Fat</p>
        </div>
      </div>

      {/* Expandable Vitamins/Minerals */}
      <button
        className="btn btn-outline mb-6"
        onClick={() => setShowVitamins(!showVitamins)}
      >
        {showVitamins ? "Hide Vitamins & Minerals" : "Show Vitamins & Minerals"}
      </button>

      {showVitamins && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {Object.entries(macros.vitamins).map(([vit, val]) => (
            <div
              key={vit}
              className="p-4 bg-gray-100 rounded shadow flex justify-between"
            >
              <span className="font-semibold text-gray-800">{vit}</span>
              <span className="font-bold text-gray-900">{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* Macro Chart */}
      <div className="w-full max-w-xl h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "#111827", fontWeight: 'bold' }} />
            <YAxis tick={{ fill: "#111827", fontWeight: 'bold' }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: "8px", color: "#111827" }}
            />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default NutritionInfo;
