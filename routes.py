from flask import Blueprint, request, jsonify
from models import create_user, get_user_by_email, check_password,get_user_by_id
import engine
import json

bp = Blueprint('api', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        create_user(data)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = get_user_by_email(data['email'])
    if user and check_password(data['password'], user[3]):  # Assuming password_hash is index 3
        # Convert JSON fields to Python objects
        profile = {
            "id": user[0],
            "username": user[1],
            "email": user[2],
            "allergies": json.loads(user[4]) if user[4] else [],
            "diet": user[5],
            "favorite_cuisines": json.loads(user[6]) if user[6] else [],
            "adventurousness": user[7],
            "spice_level": user[8],
            "flavor_profile": json.loads(user[9]) if user[9] else {},
            "ingredients_loved": user[10],
            "ingredients_hated": user[11],
            "primary_goal": user[12],
            "onboarding_complete": user[13],
        }
        return jsonify(profile)
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@bp.route("/generate-recipe", methods=["POST"])
def generate_recipe():
    data = request.get_json()
    if not data or "user_id" not in data or "ingredients" not in data:
        return jsonify({"error": "'user_id' and 'ingredients' are required"}), 400

    user_id = data["user_id"]
    ingredients = data["ingredients"]

    # Fetch full user profile from MySQL
    user_profile = get_user_by_id(user_id)
    if not user_profile:
        return jsonify({"error": "User profile not found"}), 404

    try:
        # Pass the user profile and ingredients to the GourmetNet engine
        final_recipe = engine.generate_recipe_pipeline(user_profile, ingredients)
        return jsonify({"recipe": final_recipe})
    except Exception as e:
        print(f"ERROR: {e}")
        return jsonify({"error": "Internal server error"}), 500