import { Drawer } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import DropDown from "../../assets/icons/dropdown.png";
import ProfilePicture from "../../assets/icons/profile.png";
import SideBar from "../SideBar/SideBar";
import { FetchUserData } from "../../api/userData";
import LogoutIcon from "../../assets/icons/logout.png";
import { signoutUser } from "../../utils/firebaseConfig";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const NavBar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isVisivle, setIsVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [user, setUser] = useState();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileIconRef = useRef<HTMLImageElement>(null);

  const getUserCredentials = async () => {
    const response = await FetchUserData();
    setUser(response);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    void getUserCredentials();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openDrawer = () => {
    setIsVisible(true);
  };

  const CloseDrawer = () => {
    setIsVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      profileIconRef.current &&
      !profileIconRef.current.contains(event.target as Node)
    ) {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    if (optionsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [optionsVisible]);

  const EditTaskDropDown = () => {
    return (
      <div
        className={` bg-white ${
          optionsVisible ? "block" : "hidden"
        } p-3 rounded-tl-md rounded-bl-md dark:bg-dark-500`}
        ref={dropdownRef}
      >
        Account
        <div
          onClick={() => {}}
          className="flex flex-row flex-1 items-center h-[50%]"
        >
          <img
            src={ProfilePicture}
            alt="no dp"
            className="profile-picture py-1"
            onClick={() => {
              console.log("CLICKED");
            }}
            width={"50px"}
          />
          <div>
            <div>{user?.userName}</div>
            <div className="text-gray-400">{user?.email}</div>
          </div>
        </div>
        <div className="hover:bg-[#EFF4FA] py-2 cursor-pointer dark:hover:bg-dark-600">
          {" "}
          Profile{" "}
        </div>
        <ThemeSwitch />
        <a
          href="/"
          className="flex flex-row hover:bg-[#EFF4FA] dark:hover:bg-dark-600 py-2"
          onClick={signoutUser}
        >
          <img src={LogoutIcon} className="w-[25px] mr-3" />
          Logout
        </a>
      </div>
    );
  };

  return (
    <div className="flex items-center h-[4em] relative justify-between md:justify-end dark:bg-dark-800 dark:text-dark-100">
      <Drawer open={isVisivle} onClose={CloseDrawer} anchor="left">
        <SideBar fromNavBar="fromNavBar" />
      </Drawer>
      {screenWidth < 701 && (
        <div onClick={openDrawer} className="cursor-pointer">
          <img src={DropDown} width={"20px"} className="ml-[1em]" />
        </div>
      )}
      <div className="flex h-full">
        <span className="flex flex-row items-end pb-3 pr-3 gap-x-1 capitalize">
          Welcome, <span className="text-white"> {user?.userName}</span>
        </span>
        <img
          src={ProfilePicture}
          alt="no dp"
          ref={profileIconRef}
          className="rounded-full mr-[1em] py-1 cursor-pointer"
          onClick={() => setOptionsVisible(!optionsVisible)}
          width={"50px"}
        />
      </div>
      <div className="absolute top top-[100%] z-10">
        <EditTaskDropDown />
      </div>
    </div>
  );
};

export default NavBar;
