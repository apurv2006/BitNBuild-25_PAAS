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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔥 Simulate login success/failure
    if (formData.email === "demo@example.com" && formData.password === "1234") {
      toast.success("Login Successful!");
      onLoginSuccess({ username: "DemoUser" }); // ← fake user
    } else {
      toast.error("Login Failed! Check email/password.");
    }
  };

  return (
    <div className="card w-full shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
