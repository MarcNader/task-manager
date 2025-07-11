import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import Rabbit from "../../assets/icons/rabbit2.png";
import Google from "../../assets/icons/google.png";
import Facebook from "../../assets/icons/facebook.png";
import Email from "../../assets/icons/email.png";
import Password from "../../assets/icons/password.png";
import { useFormik } from "formik";

import { setUserId } from "../../store/Authentication";
import {
  createAuthUserWithEmailAndPassword,
  signInWithFacebookPopup,
  signInWithGooglePopup,
} from "../../utils/firebaseConfig";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { signUpSchema } from "../../helpers/formValidations/authenticationValidation";
import { StoreUserData } from "../../api/userData";
import Overlay from "../../components/Overlay/Overlay";

const SignUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isloading, setISLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setISLoading(true);
      const userId = await createAuthUserWithEmailAndPassword(
        values.email,
        values.password
      );

      if (userId) {
        await StoreUserData(values, userId as string);
        dispatch(setUserId(userId as string));

        userId && setIsLoggedIn(true);
      }
      setISLoading(false);
    },
  });

  const logGoogleUser = async () => {
    setISLoading(true);
    const userId = await signInWithGooglePopup();
    setISLoading(false);

    dispatch(setUserId(userId as string));

    userId && setIsLoggedIn(true);
  };
  const logFacebookUser = async () => {
    setISLoading(true);
    const userId = await signInWithFacebookPopup();
    setISLoading(false);
    dispatch(setUserId(userId as string));

    userId && setIsLoggedIn(true);
  };

  const InputFields = [
    {
      label: "User Name",
      id: "userName",
      placeholder: "John Kennedy",
      icon: Email,
      value: formik.values.userName,
      touched: formik.touched.userName,
      error: formik.errors.userName,
    },
    {
      label: "Email",
      id: "email",
      placeholder: "example@gmail.com",
      icon: Email,
      value: formik.values.email,
      touched: formik.touched.email,
      error: formik.errors.email,
    },
    {
      label: "Password",
      id: "password",
      placeholder: "test1234",
      icon: Password,
      value: formik.values.password,
      touched: formik.touched.password,
      error: formik.errors.password,
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      icon: Password,
      value: formik.values.confirmPassword,
      touched: formik.touched.confirmPassword,
      error: formik.errors.confirmPassword,
    },
  ];

  const isPhone = useMediaQuery("(min-width:600px)");
  return (
    <div className="flex lg:flex-row flex-col min-h-screen sm:h-screen grow justify-center items-center">
      <Overlay isVisible={isloading} />
      <div className="flex flex-col w-full lg:w-1/2 h-full  box-border p-8 overflow-auto ">
        <div className="hidden lg:flex">
          <img
            src={Rabbit}
            className="w-[30px] md:w-[55px]"
            alt="none found to display"
          />
          <div className="text-[24px] md:text-[40px] font-['Tahoma']">
            TaskRabbit
          </div>
        </div>
        <div className="flex flex-col items-center h-screen justify-center gap-10 ">
          <h2 className="text-center capitalize font-serif md:text-2xl text-xl pt-4 ">
            Welcome to TaskRabbit!
          </h2>
          <p className="text-gray-500 text-sm text-center w-full sm:w-3/4 md:text-base landscape:text-center">
            Managing your tasks have never been easier, SignUp now to kick start
            your journey!
          </p>
          <p className="text-gray-500 text-sm text-center w-full sm:w-3/4 md:text-base">
            Already have an account ? then
            <NavLink
              to={"/SignIn"}
              className="Link ms-1 underline text-blue-600"
            >
              Sign In
            </NavLink>
          </p>

          <div className="signin-form-container w-full landscape:w-2/3">
            {isLoggedIn && <Navigate to="/" replace={true} />}
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-6 items-center">
                {InputFields.map((field, index) => {
                  const isPassword =
                    field.id === "password" || field.id === "confirmPassword"
                      ? "password"
                      : "text";
                  return (
                    <div className="w-3/4 lg:w-[60%] md:w-1/2">
                      <TextField
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        key={index}
                        className="w-full"
                        size={isPhone ? "medium" : "small"}
                        required
                        type={isPassword}
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
                        value={field.value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // On blur event to validate after leaving field
                        error={field.touched && Boolean(field.error)}
                        helperText={field.touched && field.error}
                      />
                    </div>
                  );
                })}
                <button
                  className="primary-button w-[110px] md:w-[150px] lg:w-[180px] md:h-12"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <span className="text-gray-500">Or sign up with</span>
          <div className="flex justify-center w-full">
            <button
              className="flex flex-row justify-center  w-2/4 md:w-[180px] h-10 md:h-12 items-center  border-[1.5px] rounded-3xl border-solid mr-5 hover:bg-gray-100"
              onClick={logGoogleUser}
            >
              <img
                src={Google}
                className="w-[30px] md:w-[30px] pr-2"
                alt="none found to display"
              />
              Google
            </button>
            <button
              className="flex flex-row justify-center w-2/4 md:w-[180px] h-10 md:h-12 items-center  border-[1.5px] rounded-3xl border-solid hover:bg-gray-100"
              onClick={logFacebookUser}
            >
              <img
                src={Facebook}
                className="w-[30px] pr-2"
                alt="none found to display"
              />
              Facebook
            </button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 lg:block hidden w-full h-full bg-cover bg-no-repeat bg-[url('assets/pictures/mainBackground.jpg')]" />
    </div>
  );
};

export default SignUp;
