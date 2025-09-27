import { useState } from "react";

function RecipeGenerator() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    allergies: [],
    diet: "",
    favorite_cuisine: "",
    adventurousness: "",
    spice_level: "",
    ingredients_love: "",
    ingredients_hate: "",
    primary_goal: "",
  });

  // Example recipe output (replace later with backend data)
  const recipe = {
    title: "Spicy Tomato Pasta",
    ingredients: ["Tomato", "Onion", "Garlic", "Pasta", "Olive Oil", "Chili Flakes"],
    steps: [
      "Boil pasta until al dente.",
      "Sauté onion and garlic in olive oil.",
      "Add tomato and chili flakes.",
      "Mix with pasta and serve hot.",
    ],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        allergies: checked
          ? [...prev.allergies, value]
          : prev.allergies.filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Form Data:", formData); // send to backend
    setShowForm(false); // auto-close after submit
  };

  return (
    <section
      id="recipe-generator"
      // Added padding and dark mode background
      className="min-h-screen flex flex-col items-center justify-start p-10 relative bg-base-100 dark:bg-gray-900 dark:text-gray-200"
    >
      {/* Try New Recipe Button */}
      {/* Updated with a more prominent style */}
      <button
        className="btn btn-primary mb-4 absolute top-4 left-1/2 transform -translate-x-1/2 transition-colors duration-300"
        onClick={() => setShowForm(true)}
      >
        Try New Recipe
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Added smoother look with shadow, padding, and rounded corners */}
          <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative transition-colors duration-300">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors duration-300"
              onClick={() => setShowForm(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Recipe Preferences</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Allergies */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300">Allergies</label>
                <div className="flex gap-4 mt-1">
                  {["Dairy", "Gluten", "Nuts"].map((item) => (
                    <label key={item} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        name="allergies"
                        value={item}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diet */}
              <select
                name="diet"
                className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
              >
                <option value="">Select Diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>

              {/* Other Inputs */}
              <input
                type="text"
                name="favorite_cuisine"
                placeholder="Favorite Cuisines (comma separated)"
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="adventurousness"
                placeholder="Adventurousness (1-5)"
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
                required
              />
              <select
                name="spice_level"
                className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
              >
                <option value="">Spice Level</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
              </select>
              <input
                type="text"
                name="ingredients_love"
                placeholder="Ingredients you love"
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
              />
              <input
                type="text"
                name="ingredients_hate"
                placeholder="Ingredients you dislike"
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
              />
              <select
                name="primary_goal"
                className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                onChange={handleChange}
              >
                <option value="">Primary Goal</option>
                <option value="Quick">Quick & Easy</option>
                <option value="Healthy">Healthy Eating</option>
                <option value="Gourmet">Gourmet Cooking</option>
              </select>

              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Layout: Recipe + Shopping List */}
      {/* Updated layout to be a grid for responsiveness and added gap */}
      <div className="w-full mt-20 gap-10 grid grid-cols-1 lg:grid-cols-3">
        {/* Recipe Output */}
        {/* Added smooth, sleek card styling */}
        <div className="flex-1 lg:col-span-2 bg-white dark:bg-gray-800 dark:text-white p-8 rounded-2xl shadow-xl transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Shopping List Sidebar */}
        {/* Added smooth, sleek card styling */}
        <div className="w-full bg-base-200 dark:bg-gray-800 dark:text-white p-8 rounded-2xl shadow-xl transition-colors duration-300 mt-8 lg:mt-0">
          <h2 className="text-xl font-bold mb-4">🛒 Shopping List</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RecipeGenerator;