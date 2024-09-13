import { type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import Rabbit from "../../assets/icons/rabbit2.png";
import Google from "../../assets/icons/google.png";
import Email from "../../assets/icons/email.png";
import Password from "../../assets/icons/password.png";

import { setUserId } from "../../store/Authentication";
import {
  signInWithGooglePopup,
  signinAuthUserWithEmailAndPassword,
} from "../../utils/firebaseConfig";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";

const SignIn = () => {
  const defaultFormField = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormField);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const HanldeChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const Handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = await signinAuthUserWithEmailAndPassword(
      formFields.email,
      formFields.password
    );
    dispatch(setUserId(userId as string));

    userId && setIsLoggedIn(true);
  };

  const logGoogleUser = async () => {
    const userId = await signInWithGooglePopup();
    dispatch(setUserId(userId as string));

    userId && setIsLoggedIn(true);
  };

  const InputFields = [
    {
      label: "email",
      placeholder: "example@gmail.com",
      icon: Email,
    },
    {
      label: "password",
      placeholder: "test1234",
      icon: Password,
    },
  ];

  const isPhone = useMediaQuery("(min-width:600px)");

  return (
    <div className="flex lg:flex-row flex-col h-screen grow justify-center items-center">
      <div className="lg:w-1/2 w-full h-full  p-8">
        {/* Header */}
        <div className="flex">
          <img
            src={Rabbit}
            className="w-[30px] md:w-[55px]"
            alt="none found to display"
          />
          <div className="text-[24px] md:text-[40px] font-['Tahoma']">
            TaskRabbit
          </div>
        </div>
        {/* Body */}
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-center capitalize font-serif md:text-2xl text-xl pt-4">
            Welcome to TaskRabbit!
          </h2>
          <p className="text-gray-500 text-sm text-center w-full sm:w-3/4 md:text-base">
            Managing your tasks have never been easier, log back in to resume
            your work or start your journey now!
            <NavLink
              to={"/SignUp"}
              className="Link ms-1 underline text-blue-600"
            >
              Sign Up
            </NavLink>
          </p>
          <div className="signin-form-container w-full">
            {isLoggedIn && <Navigate to="/" replace={true} />}
            <form onSubmit={Handlesubmit} className="flex flex-col">
              <div className="flex flex-col gap-6 items-center">
                {InputFields.map((field, index) => {
                  return (
                    <div className="w-3/4 lg:w-[60%] md:w-1/2">
                      <TextField
                        label={field.label}
                        name={field.label}
                        placeholder={field.placeholder}
                        key={index}
                        id="outlined-start-adornment"
                        className="w-full"
                        size={isPhone ? "medium" : "small"}
                        required
                        type={field.label === "password" ? "password" : "text"}
                        onChange={HanldeChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <img
                                src={field.icon}
                                className="logo-icon"
                                alt="none found to display"
                                width={30}
                                height={30}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  );
                })}
                <button
                  className="primary-button w-[110px] md:w-[150px] lg:w-[180px] md:h-12"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <span>Or</span>
          <button
            className="flex flex-row justify-center w-[180px] h-10 md:h-12 items-center  border-[1.5px] rounded-3xl border-solid"
            onClick={logGoogleUser}
          >
            <img
              src={Google}
              className="w-[30px] pr-2"
              alt="none found to display"
            />
            Sign In with Google
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 lg:block hidden w-full h-full bg-cover bg-no-repeat bg-[url('assets/pictures/mainBackground.jpg')]" />
    </div>
  );
};

export default SignIn;
