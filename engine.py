import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# ----------------- Setup ----------------- #
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("Google API key not found in .env file.")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")
print("✅ GourmetNet Engine Initialized...")

# ----------------- Pipeline ----------------- #
def generate_recipe_pipeline(user_profile, ingredients):
    """
    Full multi-stage GourmetNet pipeline:
    1. Ideation: Generate creative dish concepts
    2. Validation: Score and pick the best idea
    3. Elaboration: Generate complete recipe
    """
    # Phase 1: Ideation
    dish_ideas = run_ideation_phase(ingredients, user_profile)

    # Phase 2: Validation
    selected_idea = run_validation_phase(dish_ideas, user_profile)

    # Phase 3: Elaboration
    final_recipe = run_elaboration_phase(selected_idea, ingredients, user_profile)

    return {"title": selected_idea, "recipe_text": final_recipe}

# ----------------- Phase 1: Ideation ----------------- #
def run_ideation_phase(ingredients, user_profile):
    prompt = f"""
    You are a gourmet recipe innovator. Generate 5–7 unique dish titles tailored to the user.
    Consider the following:
    Allergies: {user_profile.get('allergies', [])}
    Diet: {user_profile.get('diet', 'None')}
    Favorite Cuisines: {user_profile.get('favorite_cuisines', [])}
    Ingredients Loved: {user_profile.get('ingredients_loved', '')}
    Ingredients Hated: {user_profile.get('ingredients_hated', '')}
    Adventurousness (1-5): {user_profile.get('adventurousness', 3)}
    Spice Level: {user_profile.get('spice_level', 'Medium')}
    Primary Goal: {user_profile.get('primary_goal', 'Quick & Easy')}
    Available Ingredients: {ingredients}

    Output: JSON array of dish titles.
    """
    response = model.generate_content(prompt)
    cleaned = response.text.strip().replace('`', '')
    try:
        ideas = json.loads(cleaned)
    except:
        ideas = ["Creative Dish 1", "Creative Dish 2", "Creative Dish 3"]
    print("💡 Ideation Phase:", ideas)
    return ideas

# ----------------- Phase 2: Validation ----------------- #
def run_validation_phase(ideas, user_profile):
    best_idea = None
    highest_score = -1
    for idea in ideas:
        score = 0
        # Match primary goal
        if user_profile.get("primary_goal", "").lower() in idea.lower():
            score += 20
        # Match favorite cuisines
        for cuisine in user_profile.get("favorite_cuisines", []):
            if cuisine.lower() in idea.lower():
                score += 15
        # Reward adventurousness
        if user_profile.get("adventurousness", 3) >= 4:
            score += 5
        if score > highest_score:
            highest_score = score
            best_idea = idea
    if not best_idea:
        best_idea = ideas[0]
    print("🏆 Validation Phase: Selected Idea =", best_idea)
    return best_idea

# ----------------- Phase 3: Elaboration ----------------- #
def run_elaboration_phase(winning_idea, ingredients, user_profile):
    prompt = f"""
    You are a professional chef. Create a **structured JSON recipe** for '{winning_idea}'.
    
    User Profile:
    Allergies: {user_profile.get('allergies', [])}
    Diet: {user_profile.get('diet', 'None')}
    Favorite Cuisines: {user_profile.get('favorite_cuisines', [])}
    Ingredients Loved: {user_profile.get('ingredients_loved', '')}
    Ingredients Hated: {user_profile.get('ingredients_hated', '')}
    Flavor Profile: {user_profile.get('flavor_profile', {})}
    Spice Level: {user_profile.get('spice_level', 'Medium')}
    Primary Goal: {user_profile.get('primary_goal', 'Quick & Easy')}
    Available Ingredients: {ingredients}

    Instructions:
    1. Output **JSON only**.
    2. Structure must include:
       - "title": string (recipe title)
       - "ingredients": array of strings with quantities
       - "steps": array of objects, each with:
          - "id": integer
          - "title": string
          - "description": string
          - "time": estimated time in seconds
       - "flavor_guidance": string
       - "spice_adjustment": string
       - "chef_notes": string

    Make sure JSON is valid and can be parsed programmatically.
    """

    response = model.generate_content(prompt)

    # Try to parse JSON safely
    try:
        recipe_json = json.loads(response.text.strip())
    except json.JSONDecodeError:
        # fallback in case model returns invalid JSON
        recipe_json = {
            "title": winning_idea,
            "ingredients": [],
            "steps": [],
            "flavor_guidance": "",
            "spice_adjustment": "",
            "chef_notes": ""
        }

    print("🍳 Elaboration Phase: Recipe Generated")
    return recipe_json

# ----------------- Example Run ----------------- #
# if __name__ == "__main__":
#     sample_user_profile = {
#         "username": "ChefRavi",
#         "diet": "Vegetarian",
#         "allergies": ["Gluten", "Dairy"],
#         "favorite_cuisines": ["Italian (Tuscan)"],
#         "adventurousness": 4,
#         "spice_level": "Medium",
#         "flavor_profile": {"savory": 5, "sweet": 2, "sour": 4},
#         "ingredients_loved": "garlic, ginger, avocado",
#         "ingredients_hated": "mushrooms, cilantro",
#         "primary_goal": "Quick & Easy"
#     }

#     available_ingredients = "chicken breast, cannellini beans, rosemary, spinach"

#     print(f"🚀 Starting GourmetNet pipeline for {sample_user_profile['username']}...\n")

#     # Run pipeline
#     ideas = run_ideation_phase(available_ingredients, sample_user_profile)
#     selected_idea = run_validation_phase(ideas, sample_user_profile)
#     final_recipe = run_elaboration_phase(selected_idea, available_ingredients, sample_user_profile)

#     print("\n========== FINAL RECIPE ==========")
#     print(final_recipe)
#     print("================================")
