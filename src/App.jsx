import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeGenerator from "./pages/RecipeGenerator";
import CookingWorkflow from "./pages/CookingWorkflow";
import NutritionInfo from "./pages/NutritionInfo";

import { Toaster } from "react-hot-toast";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    // RECTIFIED LINE: Using pure Tailwind classes for robust dark mode implementation
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        {/* Updated: Added dark mode gradient colors */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
        >
          <h1 className="text-5xl font-bold mb-4">
            {currentUser ? `Hello, ${currentUser.username}! 🍳` : "🍳 GourmetNet"}
          </h1>
          <p className="text-lg text-gray-800 max-w-xl mb-6 dark:text-gray-200">
            {currentUser
              ? "Welcome back! Ready to cook something amazing today?"
              : "Your smart recipe generator & cooking assistant."}
          </p>
          <a href="#recipe-generator" className="btn btn-primary">
            Start Cooking
          </a>
        </section>

        {/* Recipe Generator Section */}
        {/* Updated: Added dark mode background */}
        <section
          id="recipe-generator"
          className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-10 dark:bg-gray-900"
        >
          <RecipeGenerator currentUser={currentUser} />
        </section>

        {/* Cooking Workflow Section */}
        {/* Updated: Added dark mode background to section and text color to heading */}
        <section
          id="cooking-flow"
          className="min-h-screen flex flex-col items-center justify-center bg-white p-10 dark:bg-gray-900"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
            Cooking Workflow
          </h2>
          <CookingWorkflow />
        </section>

        {/* Nutrition Information Section */}
        {/* Updated: Added dark mode background */}
        <section
          id="nutrition"
          className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-10 dark:bg-gray-900"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">
            Nutrition Information
          </h2>
          <NutritionInfo />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-md">
            <Login
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setShowLogin(false);
              }}
            />
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setShowLogin(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-2xl">
            <Signup
              onSignupSuccess={(user) => {
                setCurrentUser(user);
                setShowSignup(false);
              }}
            />
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setShowSignup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;