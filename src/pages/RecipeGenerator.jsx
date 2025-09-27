import { useState } from "react";
import toast from "react-hot-toast";

function RecipeGenerator({ currentUser }) {
  const [ingredients, setIngredients] = useState("");
  const [recipeResult, setRecipeResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!currentUser) {
      toast.error("Please log in to generate recipes.");
      return;
    }

    const trimmedIngredients = ingredients.trim();
    if (!trimmedIngredients) {
      toast.error("Please enter your available ingredients.");
      return;
    }

    const payload = {
      ...currentUser, // send all profile info
      ingredients: trimmedIngredients.split(",").map((i) => i.trim()), // array of ingredients
    };

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate recipe");

      const data = await res.json();
      setRecipeResult(data.recipe);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Error generating recipe. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-base-100 p-10 relative">
      <div className="flex gap-4 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Close Form" : "Enter Ingredients"}
        </button>
      </div>

      {/* Ingredients Form */}
      {showForm && (
        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6"
          onSubmit={handleSubmit}
        >
          <label className="font-semibold mb-2 block">
            Ingredients you have (comma separated):
          </label>
          <input
            type="text"
            name="ingredients"
            placeholder="e.g., tomato, cheese, avocado"
            className="input input-bordered w-full mb-4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          >
            Generate Recipe
          </button>
        </form>
      )}

      {/* Display Generated Recipe */}
      {recipeResult && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-6">
          <h2 className="text-2xl font-bold mb-2">{recipeResult.title}</h2>
          <p className="whitespace-pre-line text-gray-800">
            {recipeResult.recipe_text}
          </p>
        </div>
      )}

      {!recipeResult && !showForm && (
        <p className="mt-10 text-gray-500 text-center">
          Your generated recipe will appear here.
        </p>
      )}
    </section>
  );
}

export default RecipeGenerator;
