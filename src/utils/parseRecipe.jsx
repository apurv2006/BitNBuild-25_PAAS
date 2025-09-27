// utils/parseRecipe.js
export function parseRecipeSteps(recipeText) {
  // Match lines starting with a number + period (1., 2., 3., etc.)
  const stepRegex = /^\d+\.\s*(.+)$/gm;
  const matches = [...recipeText.matchAll(stepRegex)];

  // Convert matches to step objects
  return matches.map((match, i) => ({
    id: i + 1,
    title: match[1].split(":")[0].trim(),      // Step title (before colon)
    description: match[1].split(":")[1]?.trim() || match[1].trim(), // Step description
    time: 0, // You can customize if you want a timer per step
  }));
}

export function parseIngredients(recipeText) {
  // Extract everything under "#### **Ingredients:**" until next "---" section
  const ingredientsMatch = recipeText.match(/#### \*\*Ingredients:\*\*([\s\S]*?)---/);
  if (!ingredientsMatch) return [];

  // Extract bullet points
  const bullets = ingredientsMatch[1].split("\n").filter(line => line.startsWith("*")).map(line =>
    line.replace(/[*\s]+/g, "").replace(/\*\*/g, "").trim()
  );

  return bullets;
}
