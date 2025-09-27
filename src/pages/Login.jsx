
import { useState } from "react";
import toast from "react-hot-toast";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const userData = await response.json(); // this will be the full profile JSON

      toast.success("Login Successful!");
      onLoginSuccess(userData); // pass the whole object up
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed! Please check your email/password.");
    }
  };

  return (
    // Updated container with sleek design and dark mode
    <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="card-body p-0">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Updated inputs with sleek design and dark mode */}
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
          {/* Updated button with color for dark mode */}
          <button type="submit" className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;