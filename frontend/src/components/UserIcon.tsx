import { RxTriangleDown, RxPerson } from "react-icons/rx";
import { FiMail } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function UserIcon(props) {
//   const id = props.id === null ? "" : props.id.charAt(0).toUpperCase();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const id = user.username === null ? "" : user.username.charAt(0).toUpperCase();
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative float-right my-auto mx-1 p-1.5 text-2xl">
        <label htmlFor="icon" className="flex cursor-pointer items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-base bg-gray text-white shadow-base">
            {id}
          </div>
          <RxTriangleDown className="m-1 text-base" />
        </label>
        <input type="checkbox" id="icon" className="hidden" />
        <div
          id="profile"
          className="absolute right-[8px] top-[66px] hidden h-28 w-[6.5rem] bg-bg text-sm shadow"
        >
          <a href="/user/profile" className="dropdown-user"><RxPerson className="m-1"/>Profile</a>
          <button className="dropdown-user"><FiMail className="m-1"/>Messages</button>
          <button className="dropdown-user" onClick={(e) => {
              e.preventDefault();
              location = "/currency/";
          }}><BsCreditCard className="m-1"/>Payments</button>
          <hr className="text-gray"/>
          <button className="dropdown-user" onClick={(e) => {
	    e.preventDefault();
	    location = "/";
	    dispatch(logout());
	  }}><RiLogoutCircleRLine className="m-1"/>logout</button>
        </div>
      </div>
    </>
  );
}
