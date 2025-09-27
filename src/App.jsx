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
  const [currentUser, setCurrentUser] = useState(null); // ← NEW: Store logged-in user

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar 
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        currentUser={currentUser} // optional for Navbar greetings
      />

      {/* Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200"
        >
          <h1 className="text-5xl font-bold mb-4">
            {currentUser ? `Hello, ${currentUser.username}! 🍳` : "🍳 GourmetNet"}
          </h1>
          <p className="text-lg text-gray-800 max-w-xl mb-6">
            {currentUser
              ? "Welcome back! Ready to cook something amazing today?"
              : "Your smart recipe generator & cooking assistant."}
          </p>
          <a href="#recipe-generator" className="btn btn-primary">
            Start Cooking
          </a>
        </section>

        {/* Recipe Generator Section */}
        <section
          id="recipe-generator"
          className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-10"
        >
          <RecipeGenerator />
        </section>

        {/* Cooking Workflow Section */}
        <section
          id="cooking-flow"
          className="min-h-screen flex flex-col items-center justify-center bg-white p-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Cooking Workflow
          </h2>
          <CookingWorkflow />
        </section>

        {/* Nutrition Information Section */}
        <section
          id="nutrition"
          className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nutrition Information
          </h2>
          <NutritionInfo />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-md">
            <Login 
              onLoginSuccess={(user) => {
                setCurrentUser(user); // ← update current user
                setShowLogin(false);  // close modal
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

      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative w-full max-w-2xl">
            <Signup 
              onSignupSuccess={(user) => {
                setCurrentUser(user); // ← update current user
                setShowSignup(false);  // close modal
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
