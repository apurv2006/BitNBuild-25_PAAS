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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    toast.success("Signup Successful!");
    onSignupSuccess({ username: formData.username }); // ← send username to App.jsx
  };

  return (
    <div className="card w-full max-w-2xl shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username, Email, Password */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

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
          />

          {/* Adventurousness (Text input instead of range) */}
          <input
            type="text"
            name="adventurousness"
            placeholder="Adventurousness (1-5)"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={formData.adventurousness}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
