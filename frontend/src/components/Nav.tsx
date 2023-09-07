import logo from "../assets/pen.png";
import { BiUserCircle } from "react-icons/bi";
import { TbCirclePlus } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { reset } from "../features/post/postSlice";

import { useSelector, useDispatch } from "react-redux";
import UserIcon from "./UserIcon";

function Nav(props) {
  // get the login state
  const { user, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // render the page based on the login state.
  return (
    <div className="fixed top-0 left-0 z-50 h-[3.5rem] w-screen bg-white shadow">
      <div className="float-left">
        <a href="/" className="flex items-center">
          <img src={logo} alt="TheRide" className="my-2 ml-4 mr-2 h-10" />
          <div className="m-2 text-2xl">
            <span>The</span>
            <span className="text-prime">Ride</span>
          </div>
        </a>
      </div>

      {isLogin === false ? (
        <>
          <button
            type="button"
            className="float-right m-2 rounded-md bg-border p-1.5 text-white"
            onClick={() => props.onFormSwitch("login")}
          >
            <span className="m-0.5 font-bold text-prime-2">Login</span>
          </button>

          <button
            type="button"
            className="float-right m-2 rounded-md bg-prime p-1.5 text-white"
            onClick={() => props.onFormSwitch("register")}
          >
            <BiUserCircle className="m-0.5 inline w-4" />
            <span className="m-0.5 font-bold">Register</span>
          </button>
        </>
      ) : (
        <div>
          <UserIcon id={user && user.username} />
          <button className="float-right m-2 p-1.5 text-2xl">
            <BsBell />
          </button>
          <button
            type="button"
            className="float-right m-2 rounded-md bg-prime p-1.5 text-white"
            onClick={() => {
              location = "/questions/postQuestion";
              dispatch(reset());
            }}
          >
            <TbCirclePlus className="m-0.5 inline w-4" />
            <span className="m-0.5 font-bold">Ask a question</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
