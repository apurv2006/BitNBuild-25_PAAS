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
      className="min-h-screen flex flex-col items-center justify-start bg-base-100 p-10 relative"
    >
      {/* Try New Recipe Button */}
      <button
        className="btn btn-primary mb-4 absolute top-4 left-1/2 transform -translate-x-1/2"
        onClick={() => setShowForm(true)}
      >
        Try New Recipe
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-error"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Recipe Preferences</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Allergies */}
              <div>
                <label className="font-semibold">Allergies</label>
                <div className="flex gap-4">
                  {["Dairy", "Gluten", "Nuts"].map((item) => (
                    <label key={item} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="allergies"
                        value={item}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Diet */}
              <select
                name="diet"
                className="select select-bordered w-full"
                onChange={handleChange}
              >
                <option value="">Select Diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>

              {/* Favorite Cuisine */}
              <input
                type="text"
                name="favorite_cuisine"
                placeholder="Favorite Cuisines (comma separated)"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />

              {/* Adventurousness */}
              <input
                type="text"
                name="adventurousness"
                placeholder="Adventurousness (1-5)"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />

              {/* Spice Level */}
              <select
                name="spice_level"
                className="select select-bordered w-full"
                onChange={handleChange}
              >
                <option value="">Spice Level</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
              </select>

              {/* Ingredients */}
              <input
                type="text"
                name="ingredients_love"
                placeholder="Ingredients you love"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              <input
                type="text"
                name="ingredients_hate"
                placeholder="Ingredients you dislike"
                className="input input-bordered w-full"
                onChange={handleChange}
              />

              {/* Primary Goal */}
              <select
                name="primary_goal"
                className="select select-bordered w-full"
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
      <div className="flex flex-row w-full mt-20 gap-10">
        {/* Recipe Output */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Shopping List Sidebar */}
        <div className="w-1/3 bg-base-200 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">🛒 Shopping List</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RecipeGenerator;
