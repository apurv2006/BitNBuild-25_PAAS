from flask_mysqldb import MySQL
import hashlib
import json

# Initialize MySQL (app will pass it later)
mysql = MySQL()

# --- Utility Functions ---

def hash_password(password: str) -> str:
    """Hash password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

def check_password(password, stored_hash) -> bool:
    """Compare plaintext password with stored hash."""
    return hash_password(password) == stored_hash

# --- User Functions ---

def create_user(data):
    """Create a new user in the database."""
    cur = mysql.connection.cursor()
    query = """
    INSERT INTO users (username, email, password_hash, allergies, diet, favorite_cuisines,
    adventurousness, spice_level, flavor_profile, ingredients_loved, ingredients_hated, primary_goal)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    password_hash = hash_password(data['password'])
    cur.execute(query, (
        data['username'],
        data['email'],
        password_hash,
        json.dumps(data.get('allergies', [])),
        data.get('diet'),
        json.dumps(data.get('favorite_cuisines', [])),
        data.get('adventurousness'),
        data.get('spice_level'),
        json.dumps(data.get('flavor_profile', {})),
        data.get('ingredients_loved'),
        data.get('ingredients_hated'),
        data.get('primary_goal')
    ))
    mysql.connection.commit()
    cur.close()
    return True

def get_user_by_email(email):
    """Fetch a user by email."""
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    return user

def get_user_by_id(user_id):
    """
    Fetch a user by ID and parse JSON fields.
    """
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    cur.close()

    if not user:
        return None

    # Map cursor result to a dictionary
    keys = ["id", "username", "email", "password_hash", "allergies", "diet", "favorite_cuisines",
            "adventurousness", "spice_level", "flavor_profile", "ingredients_loved", "ingredients_hated",
            "primary_goal", "onboarding_complete", "created_at", "updated_at"]
    user_dict = dict(zip(keys, user))

    # Parse JSON fields
    for field in ["allergies", "favorite_cuisines", "flavor_profile"]:
        if user_dict.get(field):
            user_dict[field] = json.loads(user_dict[field])
        else:
            user_dict[field] = [] if field != "flavor_profile" else {}

    return user_dict
