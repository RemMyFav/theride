import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { checkCookie } from "./features/auth/authSlice";
import RingLoader from "react-spinners/RingLoader";

import logo from "./assets/logo_white.svg";
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

function App() {
  // initalize the state that to determine which page to render
  const [currState, setCurrState] = useState("login");

  // get the state whether the user is Logined or not
  const { isLogin, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // choose login or register page after submit the button
  const setState = (state) => {
    setCurrState(state);
  };

  // based on the state, render the appropriate page
  let mainPage;

  useEffect(() => {
    if (isLogin === false) {
      dispatch(checkCookie());
    }
  }, [isLogin]);

  if (isLogin === true && isLoading === false) {
    mainPage = <Dashboard state={currState} />;
  } else if (isLoading === true) {
    mainPage = (
      <div className="flex items-center justify-center w-screen h-screen">
        <RingLoader
          color="#F48023"
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
	<div className="text-[50px] m-8 text-prime">Loading ...</div>
      </div>
    );
  } else {
    currState === "login" ? (mainPage = <Login />) : (mainPage = <Register />);
  }

  return (
    <>
      <div>
        <Nav onFormSwitch={setState} />
        {mainPage}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
