// import { useState, useEffect } from "react";
// import { Menu, Sun, Moon } from "lucide-react";

// function Navbar({ onLoginClick, onSignupClick, currentUser, onLogout }) {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const isDark = localStorage.getItem('theme') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
//     setIsDarkMode(isDark);
//     document.documentElement.classList.toggle("dark", isDark);
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     document.documentElement.classList.toggle("dark", newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const getShortEmail = (email) => {
//     if (!email) return "";
//     const [name, domain] = email.split("@");
   
//     return `${name.slice(0, 3)}...@${domain}`;
//   };

//   return (
    
//     <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-base-100/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-500 py-3 px-4 md:px-8">
//       {/* Logo on the left side */}
//       <div className="flex-1">
//         <a href="#home" className="btn btn-ghost normal-case text-xl text-gray-900 dark:text-gray-100 font-poppins">
//           🍳 GourmetNet
//         </a>
//       </div>
      
//       {/* Navigation links on the right side */}
//       <div className="flex-none">
//         <ul className="flex items-center gap-4 px-1 hidden md:flex font-lato">
//           <li>
//             <a href="#home" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Home</a>
//           </li>
//           <li>
//             <a href="#recipe-generator" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Recipe Generator</a>
//           </li>
//           <li>
//             <a href="#cooking-flow" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Cooking Flow</a>
//           </li>
//           <li>
//             <a href="#nutrition" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Nutrition</a>
//           </li>
//           <li className="ml-4">
//             <button onClick={toggleDarkMode} className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">
//               {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
//             </button>
//           </li>
//           {currentUser ? (
//             <li className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
//               {getShortEmail(currentUser.email)}
//               <button 
//                 className="btn btn-sm btn-outline text-gray-700 dark:text-gray-300 font-bold"
//                 onClick={onLogout}
//               >
//                 Logout
//               </button>
//             </li>
//           ) : (
//             <>
//               <li>
//                 <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold" onClick={onLoginClick}>
//                   Login
//                 </button>
//               </li>
//               <li>
//                 <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold" onClick={onSignupClick}>
//                   Sign Up
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* Mobile Hamburger Menu */}
//         <div className="dropdown dropdown-end md:hidden">
//           <label tabIndex={0} className="btn btn-ghost">
//             <Menu />
//           </label>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-900 rounded-box w-52 font-lato"
//           >
//             <li><a href="#home" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Home</a></li>
//             <li><a href="#recipe-generator" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Recipe Generator</a></li>
//             <li><a href="#cooking-flow" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Cooking Flow</a></li>
//             <li><a href="#nutrition" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">Nutrition</a></li>
//             <li>
//               <button onClick={toggleDarkMode} className="flex gap-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold">
//                 {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
//                 <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//               </button>
//             </li>
//             {currentUser ? (
//               <li className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
//                 {getShortEmail(currentUser.email)}
//                 <button
//                   className="btn btn-sm btn-outline text-gray-700 dark:text-gray-300"
//                   onClick={onLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold" onClick={onLoginClick}>
//                     Login
//                   </button>
//                 </li>
//                 <li>
//                   <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold" onClick={onSignupClick}>
//                     Sign Up
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

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
    
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-base-100/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-500 py-3 px-4 md:px-8">
      {/* Logo on the left side */}
      <div className="flex-1">
        <a href="#home" className="btn btn-ghost normal-case text-xl text-gray-900 dark:text-gray-100 font-poppins">
          🍳 GourmetNet
        </a>
      </div>
      
      {/* Navigation links on the right side */}
      <div className="flex-none">
        <ul className="flex items-center gap-4 px-1 hidden md:flex font-lato">
          <li>
            {/* ADDED: px-3 py-2 for padding and rounded-full for the circle effect */}
            <a href="#home" className="px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Home</a>
          </li>
          <li>
             {/* ADDED: px-3 py-2 and rounded-full */}
            <a href="#recipe-generator" className="px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Recipe Generator</a>
          </li>
          <li>
             {/* ADDED: px-3 py-2 and rounded-full */}
            <a href="#cooking-flow" className="px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Cooking Flow</a>
          </li>
          <li>
             {/* ADDED: px-3 py-2 and rounded-full */}
            <a href="#nutrition" className="px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Nutrition</a>
          </li>
          <li className="ml-4">
             {/* ADDED: p-2 for padding and rounded-full */}
            <button onClick={toggleDarkMode} className="p-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
          {currentUser ? (
            <li className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
              {getShortEmail(currentUser.email)}
              <button 
                className="btn btn-sm btn-outline text-gray-700 dark:text-gray-300 font-bold"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                 {/* ADDED: px-3 py-2 and rounded-full */}
                <button className="btn btn-ghost px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onLoginClick}>
                  Login
                </button>
              </li>
              <li>
                 {/* ADDED: px-3 py-2 and rounded-full */}
                <button className="btn btn-ghost px-3 py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onSignupClick}>
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-900 rounded-box w-52 font-lato"
          >
            {/* Mobile links must also be updated for rounded hover effect */}
            <li><a href="#home" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Home</a></li>
            <li><a href="#recipe-generator" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Recipe Generator</a></li>
            <li><a href="#cooking-flow" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Cooking Flow</a></li>
            <li><a href="#nutrition" className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">Nutrition</a></li>
            <li>
              <button onClick={toggleDarkMode} className="flex gap-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </li>
            {currentUser ? (
              <li className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                {getShortEmail(currentUser.email)}
                <button
                  className="btn btn-sm btn-outline text-gray-700 dark:text-gray-300"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onLoginClick}>
                    Login
                  </button>
                </li>
                <li>
                  <button className="btn btn-ghost text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onSignupClick}>
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