// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 min-h-[80vh]">
      {/* Hero Title */}
      <h1 className="text-5xl font-bold mb-4">🍳 GourmetNet</h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Your smart recipe generator & cooking assistant.  
        Enter ingredients, generate recipes, and cook step by step!
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Link to="/login" className="btn btn-primary">
          Sign In
        </Link>
        <a href="#recipe-generator" className="btn btn-accent">
          Start Cooking
        </a>
      </div>

      {/* Scroll target (Recipe Generator Placeholder) */}
      <div
        id="recipe-generator"
        className="mt-20 p-8 bg-white shadow-lg rounded-xl w-full max-w-2xl"
      >
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Recipe Generator</h2>
        <p className="text-gray-900">
          🔥Enter ingredients and constraints to
          generate recipes.  
          
        </p>
      </div>
    </div>
  );
}

export default Home;
