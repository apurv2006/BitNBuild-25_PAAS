export function parseRecipe(rawText) {
  const recipe = {
    title: "",
    ingredients: [],
    steps: [],
    servings: "",
    prep_time: "",
    cook_time: ""
  };

  // --- Title ---
  const titleMatch = rawText.match(/### (.*?)\n/);
  if (titleMatch) recipe.title = titleMatch[1].trim();

  // --- Servings / Times ---
  const servingsMatch = rawText.match(/\*\*Yields:\*\* (.*)/);
  if (servingsMatch) recipe.servings = servingsMatch[1].trim();

  const prepMatch = rawText.match(/\*\*Prep time:\*\* (.*)/);
  if (prepMatch) recipe.prep_time = prepMatch[1].trim();

  const cookMatch = rawText.match(/\*\*Cook time:\*\* (.*)/);
  if (cookMatch) recipe.cook_time = cookMatch[1].trim();

  // --- Ingredients ---
  const ingredientsSection = rawText.split("### Ingredients:")[1]?.split("### Step-by-Step")[0];
  if (ingredientsSection) {
    recipe.ingredients = ingredientsSection
      .split("\n")
      .map(line => line.replace(/[*-]\s*/, "").trim())
      .filter(line => line.length > 0);
  }

  // --- Steps ---
  const stepsSection = rawText.split("### Step-by-Step Cooking Instructions:")[1]?.split("---")[0];
  if (stepsSection) {
    recipe.steps = stepsSection
      .split(/\n\d+\.\s+/) // split at "1. ", "2. " etc
      .map(step => step.trim())
      .filter(step => step.length > 0);
  }

  return recipe;
}
