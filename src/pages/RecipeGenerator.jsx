import { useState } from "react";
import axios from "axios";

function RecipeGenerator({ userPreferences, onRecipeReady }) {
  const [showForm, setShowForm] = useState(false);
  const [usePreferencesMode, setUsePreferencesMode] = useState(false);

  const [formData, setFormData] = useState({
    allergies: [],
    diet: "",
    favorite_cuisine: "",
    adventurousness: 0,
    spice_level: "",
    ingredients_love: "",
    ingredients_hate: "",
    primary_goal: "",
    ingredients: "",
  });

  const [recipe, setRecipe] = useState({
    title: "Your Recipe Will Appear Here",
    text: `Click one of the buttons above to generate a new recipe! You can either specify all your preferences or use your saved ones and just tell us what ingredients you have on hand.`,
    steps: [],
  });

  // --- MODIFICATION: Add state to hold the calculated shopping list ---
  const [shoppingList, setShoppingList] = useState([]);

  // --- MODIFICATION: Add a dedicated function to parse ingredients from the raw text ---
  const parseIngredients = (recipeText) => {
    if (!recipeText) return [];

    const ingredientSectionRegex = /(?:Ingredients|Ingredient List)\s*:?\s*\n([\s\S]*?)(?=\n\s*\n\s*(?:---|###|Step-by-Step))/i;
    const match = recipeText.match(ingredientSectionRegex);
    
    if (!match || !match[1]) return [];

    const ingredientsBlock = match[1];
    return ingredientsBlock
      .split('\n')
      .map(line => line
        .replace(/^\s*[-*]\s*/, '')
        .replace(/\(.+?\)/g, '')
        .replace(/,.*$/, '')
        .replace(/\*\*/g, '')
        .trim()
      )
      .filter(line => line.length > 2);
  };

  const parseAndCleanRecipe = (recipeText) => {
    if (!recipeText || typeof recipeText !== "string") {
      return {
        embeddedTitle: null,
        displayText: "Could not parse recipe.",
        steps: [],
      };
    }
    
    let recipeContent = recipeText;
    const firstLine = recipeText.split('\n')[0].trim();
    if (firstLine.length < 30 && !firstLine.includes(':')) {
        const recipeStartIndex = recipeText.indexOf("### ");
        if (recipeStartIndex !== -1) {
            recipeContent = recipeText.substring(recipeStartIndex);
        }
    }

    let embeddedTitle = null;
    const titleMatch = recipeContent.match(/^###\s*(?:\*\*)?(.*?)(?:\*\*)?$/m);
    if (titleMatch && titleMatch[1]) {
        embeddedTitle = titleMatch[1].trim();
    } else {
        embeddedTitle = recipeContent.split('\n')[0].trim();
    }

    let extractedSteps = [];
    const stepsSectionMatch = recipeContent.match(
      /Step-by-Step Cooking Instructions([\s\S]*)/
    );
    if (stepsSectionMatch && stepsSectionMatch[1]) {
      const stepLines = stepsSectionMatch[1].split("\n");
      extractedSteps = stepLines
        .filter((line) => /^\d+\.\s/.test(line.trim()))
        .map((line) =>
          line
            .replace(/^\d+\.\s/, "")
            .replace(/\*.*?\*:/g, "")
            .trim()
        );
    }

    const stepsBlockRegex =
      /#{2,}\s*\**\s*Step-by-Step Cooking Instructions[\s\S]*?(?=(?:#{2,})|$)/;
    let displayText = recipeContent.replace(stepsBlockRegex, "");

    displayText = displayText
      .replace(/^###\s*(?:\*\*)?.*?(?:\*\*)?\s*?\n/m, "")
      .replace(new RegExp(`^${embeddedTitle.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\s*`, 'm'), "")
      .replace(/\n---\n/g, "\n\n")
      .replace(/^#{2,}\s*(.*?)\s*$/gm, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/^\s*\*\s/gm, "")
      .replace(/\n\s*\n/g, "\n\n")
      .trim();

    return { embeddedTitle, displayText, steps: extractedSteps };
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
    } else if (name === "adventurousness") {
      setFormData({ ...formData, [name]: parseInt(value, 10) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUsePreferencesClick = () => {
    setUsePreferencesMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShoppingList([]); // Reset shopping list on new submission
    try {
      const payload = usePreferencesMode
        ? { ...userPreferences, ingredients: formData.ingredients }
        : { ...formData };

      const response = await axios.post(
        "http://127.0.0.1:5000/api/generate-recipe",
        payload
      );

      let recipeData = response.data.recipe;
      let parsedRecipe = {
        title: "Untitled Recipe",
        text: "",
        steps: [],
      };

      if (recipeData && recipeData.recipe_text) {
        const { embeddedTitle, displayText, steps } = parseAndCleanRecipe(
          recipeData.recipe_text
        );
        parsedRecipe.title =
          embeddedTitle || recipeData.title || "Untitled Recipe";
        parsedRecipe.text = displayText;
        parsedRecipe.steps = steps;

        // --- MODIFICATION: Logic to calculate and set the shopping list ---
        const requiredIngredients = parseIngredients(recipeData.recipe_text);
        const userHasIngredients = formData.ingredients
          .split(',')
          .map(i => i.trim().toLowerCase())
          .filter(i => i);

        const missingIngredients = requiredIngredients.filter(requiredItem => {
          const requiredLower = requiredItem.toLowerCase();
          return !userHasIngredients.some(hasItem => requiredLower.includes(hasItem));
        });

        setShoppingList(missingIngredients);

      } else if (typeof recipeData === "object" && recipeData !== null) {
        parsedRecipe.title = recipeData.title || "Untitled Recipe";
        parsedRecipe.text = JSON.stringify(recipeData, null, 2);
        parsedRecipe.steps = Array.isArray(recipeData.steps)
          ? recipeData.steps
          : [];
      } else {
        parsedRecipe.text = String(recipeData);
      }

      setRecipe(parsedRecipe);
      if (onRecipeReady) onRecipeReady(parsedRecipe.steps);
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to generate recipe. Check console for details.");
    }

    setShowForm(false);
    setUsePreferencesMode(false);
  };

  return (
    <section
      id="recipe-generator"
      className="min-h-screen flex flex-col items-center justify-start p-10 relative bg-base-100 dark:bg-gray-900 dark:text-gray-200"
    >
      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <button
          className="btn btn-primary transition-colors duration-300"
          onClick={() => {
            setUsePreferencesMode(false);
            setShowForm(true);
          }}
        >
          Try New Recipe
        </button>

        <button
          className="btn btn-secondary transition-colors duration-300"
          onClick={handleUsePreferencesClick}
        >
          Use My Preferences
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative transition-colors duration-300">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors duration-300"
              onClick={() => {
                setShowForm(false);
                setUsePreferencesMode(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              {usePreferencesMode
                ? "Enter Ingredients You Have"
                : "Recipe Preferences"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {usePreferencesMode ? (
                <input
                  type="text"
                  name="ingredients"
                  placeholder="Ingredients (comma separated)"
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                  onChange={handleChange}
                  required
                />
              ) : (
                <>
                  {/* Allergies */}
                  <div>
                    <label className="font-semibold text-gray-700 dark:text-gray-300">
                      Allergies
                    </label>
                    <div className="flex gap-4 mt-1">
                      {["Dairy", "Gluten", "Nuts"].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="allergies"
                            value={item}
                            onChange={handleChange}
                            className="checkbox checkbox-primary"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            {item}
                          </span>
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

                  <input
                    type="text"
                    name="favorite_cuisine"
                    placeholder="Favorite Cuisines (comma separated)"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
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
                  <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients you have (comma separated)"
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
                </>
              )}

              <button type="submit" className="btn btn-primary w-full">
                Generate Recipe
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Recipe + Shopping List */}
      <div className="w-full mt-20 gap-10 grid grid-cols-1 lg:grid-cols-3">
        <div className="flex-1 lg:col-span-2 bg-white dark:bg-gray-800 dark:text-white p-8 rounded-2xl shadow-xl transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
          <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
            {recipe.text}
          </pre>
        </div>

        {/* --- MODIFICATION: The JSX for the shopping list is now dynamic --- */}
        <div className="w-full bg-base-200 dark:bg-gray-800 dark:text-white p-8 rounded-2xl shadow-xl transition-colors duration-300 mt-8 lg:mt-0">
          <h2 className="text-xl font-bold mb-4">🛒 Shopping List</h2>
          {recipe.steps.length > 0 ? (
            shoppingList.length > 0 ? (
              <ul className="space-y-2">
                {shoppingList.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                    <span className="text-gray-500 dark:text-gray-400">☐</span>
                    <span className="text-gray-800 dark:text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600 dark:text-green-400 font-semibold">
                🎉 Good news! You have all the ingredients you need.
              </p>
            )
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Generate a recipe to see what you need to buy.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipeGenerator;

