import { NavLink } from "react-router-dom";
import Rabbit from "../../assets/icons/rabbit2.png";
import TasksIcon from "../../assets/icons/tasks.png";
import { SideBarProps } from "../../types/Components.types";

const SideBar = ({ fromNavBar }: SideBarProps) => {
  return (
    <div
      className={`flex flex-col justify-between h-screen p-4 bg-cover bg-no-repeat bg-[url('../../assets/pictures/mainBackground.jpg')] ${
        fromNavBar ? "block" : "hidden md:block"
      } dark:bg-dark-800`}
    >
      <div className="flex pb-8">
        <img src={Rabbit} className="mr-1 w-8 pb-0.5" alt="Logo" />
        <span className="text-2xl font-tahoma dark:text-dark-50 ">
          TaskRabbit
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <NavLink
          to="/Tasks"
          className={({ isActive }) =>
            `flex items-center py-2 px-5 rounded-lg text-white no-underline cursor-pointer transition hover:bg-gray-200 hover:bg-opacity-25 ${
              isActive ? "bg-gray-200 bg-opacity-20" : ""
            }`
          }
        >
          <img src={TasksIcon} className="w-5 mr-2" alt="Tasks" />
          Tasks
        </NavLink>
        <NavLink
          to="/Progress"
          className={({ isActive }) =>
            `flex items-center py-2 px-5 rounded-lg text-white no-underline cursor-pointer transition hover:bg-gray-200 hover:bg-opacity-25 ${
              isActive ? "bg-gray-200 bg-opacity-20" : ""
            }`
          }
        >
          <img src={TasksIcon} className="w-5 mr-2" alt="Progress" />
          Progress
        </NavLink>
        <NavLink
          to="/Schedule"
          className={({ isActive }) =>
            `flex items-center py-2 px-5 rounded-lg text-white no-underline cursor-pointer transition hover:bg-gray-200 hover:bg-opacity-25 ${
              isActive ? "bg-gray-200 bg-opacity-20" : ""
            }`
          }
        >
          <img src={TasksIcon} className="w-5 mr-2" alt="Schedule" />
          Schedule
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
