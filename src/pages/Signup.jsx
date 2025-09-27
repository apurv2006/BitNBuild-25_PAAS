import { useState } from "react";
import toast from "react-hot-toast";

function Signup({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    allergies: [],
    diet: "",
    favorite_cuisine: "",
    adventurousness: 3,
    spice_level: "",
    ingredients_love: "",
    ingredients_hate: "",
    primary_goal: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔄 Transform to match API schema
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      allergies: formData.allergies,
      diet: formData.diet,
      favorite_cuisines: formData.favorite_cuisine
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c), // clean array
      adventurousness: parseInt(formData.adventurousness) || 3,
      spice_level: formData.spice_level,
      flavor_profile: {
        savory: 5, // 🔧 these could be collected via sliders later
        sweet: 2,
        sour: 4,
      },
      ingredients_loved: formData.ingredients_love,
      ingredients_hated: formData.ingredients_hate,
      primary_goal: formData.primary_goal,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Signup failed");

      const userData = await res.json();
      toast.success("Signup Successful!");
      onSignupSuccess(userData); // pass full user object to parent
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup Failed!");
    }
  };

  return (
    // Updated container with sleek design and dark mode
    <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="card-body p-0">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Updated inputs with sleek design and dark mode */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
            required
          />

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

          {/* Other Inputs */}
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
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
          />
          <input
            type="number"
            name="adventurousness"
            min="1"
            max="5"
            placeholder="Adventurousness (1-5)"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.adventurousness}
            onChange={handleChange}
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
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="ingredients_hate"
            placeholder="Ingredients you dislike"
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            onChange={handleChange}
          />
          <select
            name="primary_goal"
            className="select select-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:outline-none"
            onChange={handleChange}
          >
            <option value="">Primary Goal</option>
            <option value="Quick & Easy">Quick & Easy</option>
            <option value="Healthy">Healthy Eating</option>
            <option value="Gourmet">Gourmet Cooking</option>
          </select>

          {/* Updated button with color for dark mode */}
          <button type="submit" className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;