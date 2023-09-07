import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Login(props) {
  // initalize the email and password variable
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // get the data of users from Database
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // notify the error message
      toast.error(message);
    }

    // reset all state after user's opeartion
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    // change the user's data after the user login
    dispatch(login(userData));
  };

  return (
    <form
      className="relative top-[8.5rem] mx-auto my-0 h-[40rem] w-[36rem] max-w-full rounded-base bg-white p-10 shadow-base"
      onSubmit={handleSubmit}
    >
      <img src={logo} className="mx-auto my-0 w-32" />

      <div className="my-10 text-xl font-extrabold">Welcome Back TheRide</div>

      <div className="input_container">
        <input
          type="name"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" "
          autoComplete="off"
          className="input_panel"
        />
        <label htmlFor="username" className="input_label">
          Username
        </label>
      </div>

      <div className="input_container">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          autoComplete="off"
          className="input_panel"
        />
        <label htmlFor="passowrd" className="input_label">
          Password
        </label>
      </div>

      <div className="grid grid-cols-2 place-items-center justify-evenly">
        <button className="ml-20 flex h-12 w-32 items-center justify-evenly rounded-base shadow-base">
          <BsGithub />
          <span>Github</span>
        </button>
        <a href="http://localhost:8000/auth/google/" className="mr-20 flex h-12 w-32 items-center justify-evenly rounded-base shadow-base">
          <FcGoogle />
          Google
        </a>
      </div>

      <div className="relative mx-auto my-5 grid h-12 w-[18rem] place-items-center items-center rounded-base shadow-base">
        <button
          type="submit"
          className="h-full w-full rounded-base bg-prime font-bold text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
