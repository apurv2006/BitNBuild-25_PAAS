import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";

function Navbar({ onLoginClick, onSignupClick, currentUser, onLogout }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const getShortEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}...@${domain}`;
  };

  return (
    <div className="navbar bg-base-100 shadow-md dark:bg-gray-900 dark:text-white transition-colors duration-500">
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
          <li className="ml-4">
            <button onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
          {currentUser ? (
            <li className="flex items-center gap-2 font-medium text-gray-700">
              {getShortEmail(currentUser.email)}
              <button
                className="btn btn-sm btn-outline"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-900 rounded-box w-52"
          >
            <li><a href="#home">Home</a></li>
            <li><a href="#recipe-generator">Recipe Generator</a></li>
            <li><a href="#cooking-flow">Cooking Flow</a></li>
            <li><a href="#nutrition">Nutrition</a></li>
            <li>
              <button onClick={toggleDarkMode} className="flex gap-2">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </li>
            {currentUser ? (
              <li className="flex items-center gap-2 font-medium text-gray-700">
                {getShortEmail(currentUser.email)}
                <button
                  className="btn btn-sm btn-outline"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;