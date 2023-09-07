import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

function Register(props) {
  // set register required data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // set user's data to Database
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // notify error message
      toast.error(message);
    }

    // reset state after user's operation
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative top-[8.5rem] mx-auto my-0 h-[40rem] w-[36rem] max-w-full rounded-base bg-white p-6 shadow-base"
    >
      <img src={logo} className="mx-auto my-0 w-32" />

      <div className="my-5 text-xl font-extrabold">Join TheRide Community</div>

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
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          autoComplete="off"
          className="input_panel"
        />
        <label htmlFor="email" className="input_label">
          Email
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
        <label htmlFor="password" className="input_label">
          Password
        </label>
      </div>

      <div className="input_container">
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder=" "
          autoComplete="off"
          className="input_panel"
        />
        <label htmlFor="confirmPassword" className="input_label">
          Confirm Password
        </label>
      </div>

      <div className="grid grid-cols-2 place-items-center justify-evenly">
        <button className="ml-24 flex h-12 w-32 items-center justify-evenly rounded-base shadow-base">
          <BsGithub />
          <span>Github</span>
        </button>
        <button className="mr-24 flex h-12 w-32 items-center justify-evenly rounded-base shadow-base">
          <FcGoogle />
          Google
        </button>
      </div>

      <div className="relative mx-auto my-5 grid h-12 w-[18rem] place-items-center items-center rounded-base shadow-base">
        <button
          type="submit"
          className="h-full w-full rounded-base bg-prime font-bold text-white"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
