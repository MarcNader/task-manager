import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/Theme";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { MainState } from "../../store/Store";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const [isToggled, setIsToggeled] = useState(false);
  const theme = useSelector((state: MainState) => state.theme.mode);
  const isDark = theme === "dark";
  return (
    <div className="flex items-center justify-start py-2 hover:bg-[#EFF4FA] dark:hover:bg-dark-600 w-full">
      <span className="text-md pr-4 dark:text-dark-50">Dark Mode</span>
      <Switch.Root
        checked={isDark}
        onCheckedChange={() => {
          dispatch(toggleTheme());
          setIsToggeled(!isToggled);
        }}
        className="w-10 h-5 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
      >
        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow absolute left-0.5 top-0.5 transition-transform data-[state=checked]:translate-x-5" />
      </Switch.Root>
    </div>
  );
};

export default ThemeSwitch;
