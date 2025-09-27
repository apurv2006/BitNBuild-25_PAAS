import { Menu } from "lucide-react";

function Navbar({ onLoginClick, onSignupClick }) {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a href="#home" className="btn btn-ghost normal-case text-xl">
          🍳 GourmetNet
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li><a href="#home">Home</a></li>
          <li><a href="#recipe-generator">Recipe Generator</a></li>
          <li><a href="#cooking-flow">Cooking Flow</a></li>
          <li><a href="#nutrition">Nutrition</a></li>
          <li>
            <button className="btn btn-ghost" onClick={onLoginClick}>
              Login
            </button>
          </li>
          <li>
            <button className="btn btn-ghost" onClick={onSignupClick}>
              Sign Up
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="#home">Home</a></li>
            <li><a href="#recipe-generator">Recipe Generator</a></li>
            <li><a href="#cooking-flow">Cooking Flow</a></li>
            <li><a href="#nutrition">Nutrition</a></li>
            <li>
              <button className="btn btn-ghost" onClick={onLoginClick}>
                Login
              </button>
            </li>
            <li>
              <button className="btn btn-ghost" onClick={onSignupClick}>
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
