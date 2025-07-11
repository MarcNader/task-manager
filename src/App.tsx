import { Route, Routes } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./screens/Home/Home";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import Tasks from "./screens/Tasks/Tasks";
import Progress from "./screens/Progress/Progress";
import { useDispatch } from "react-redux";
import { setUserId } from "./store/Authentication";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
import Overlay from "./components/Overlay/Overlay";

const App = () => {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(setUserId(user.uid));
      } else {
        dispatch(setUserId(""));
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!authReady) {
    return <Overlay isVisible={!authReady} />;
  }

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />}>
          <Route path="Tasks" element={<Tasks />} />
          <Route path="Progress" element={<Progress />} />
          <Route path="Schedule" element={<Progress />} />
        </Route>
      </Route>
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
};

export default App;
