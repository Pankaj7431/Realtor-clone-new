import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  });
  function pathMatchRoute(route) {
    if (route === location.pathname) return true;
  }
  return (
    <div className="bg-white border-b shadow-lg sticky top-0 z-40">
      <header
        className="flex justify-between items-center
      px-5 max-w-6xl mx-auto"
      >
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt=""
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="navbar flex space-x-5">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold  text-gray-400 ${
                pathMatchRoute("/") &&
                "border-b-[3px] text-gray-800 border-b-red-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${
                pathMatchRoute("/offers") && "border-b-[3px] text-gray-800 border-b-red-600"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400   ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "border-b-[3px] text-gray-800 border-b-red-600"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
