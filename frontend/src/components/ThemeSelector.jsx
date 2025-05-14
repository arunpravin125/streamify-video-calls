// import React from "react";
// import { useThemeStore } from "../store/useThemeStore";
// import { PaletteIcon } from "lucide-react";
// import { THEMES } from "../constants";

// const ThemeSelector = () => {
//   const { theme, setTheme } = useThemeStore();
//   return (
//     <div className="dropdown dropdown-end">
//       <button tabIndex={0} className="btn btn-ghost btn-circle">
//         <PaletteIcon className="size-5" />
//       </button>

//       <div
//         tabIndex={0}
//         className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto"
//       >
//         <div className="space-y-1">
//           {THEMES.map((themeOption) => (
//             <button
//               key={themeOption.name}
//               className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
//                 theme === themeOption.name
//                   ? "bg-primary/10 text-primary"
//                   : "hover:bg-base-content/5"
//               }`}
//               onClick={() => setTheme(themeOption.name)}
//             >
//               <PaletteIcon className="size-4" />
//               <span className="text-sm font-medium">{themeOption.label}</span>
//               {/* theme preview */}
//               <div>
//                 {themeOption.colors.map((color, i) => (
//                   <span
//                     key={i}
//                     className="size-2 rounded-full"
//                     style={{ backgroundColor: color }}
//                   ></span>
//                 ))}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ThemeSelector;

import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(themeOption.name)}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>

              {/* Theme preview colors */}
              <div className="flex items-center gap-1 ml-auto">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-base-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
