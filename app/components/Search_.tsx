"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartState, SearchState, SideBarState, UserState } from "./atoms/atoms";
import {
  faArrowRotateLeft,
  faBars,
  faBasketShopping,
  faCartShopping,
  faSearch,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { signIn_, signOut_ } from "./utils/utils";

const Search_ = () => {
  const [user_, setUser_] = useRecoilState(UserState);
  const [searchPhrase_, setSearchPhrase_] = useRecoilState(SearchState);
  const [cart_, setCart_] = useRecoilState(CartState);
  const [sideBar_, setSideBar_] = useRecoilState(SideBarState);
  const [searchTemp_, setSearchTemp_] = useState("");
  return (
    <div
      className={`md:w-[550px] w-[200px] h-[35px] border-solid border-[1px] border-black/25 rounded-[4px] flex flex-row justify-center items-center relative mb-4`}
    >
      <FontAwesomeIcon
        icon={faSearch}
        className={`mx-3 ml-2 text-[15px] text-black/60 cursor-pointer`}
        onClick={async () => {}}
      />
      <FontAwesomeIcon
        icon={faArrowRotateLeft}
        className={`mx-3 ml-2 text-[15px] text-black/60 cursor-pointer absolute right-0 ${
          searchPhrase_ == ""
            ? "opacity-0 animate-none pointer-events-none"
            : "opacity-100 animate-pulse pointer-events-auto"
        } transition-all duration-200`}
        onClick={() => {
          setSearchPhrase_("");
          setSearchTemp_("");
        }}
      />
      <input
        className={`w-full h-full text-[15px]`}
        type="text"
        placeholder="Search"
        value={searchTemp_}
        onChange={(e) => setSearchTemp_(e.target.value)}
        // Add an event listener for the keydown event
        onKeyDown={(e) => {
          // Check if the key pressed is Enter
          if (e.key === "Enter") {
            // Log "Hi" to the console
            setSearchPhrase_(searchTemp_);
          }
        }}
      />
      <div
        className={`relative min-w-[40px] min-h-[40px] left-[100px] flex flex-row justify-center items-center`}
      >
        <div
          className={`w-[40px] h-[40px] rounded-[50%] cursor-pointer flex flex-col justify-center items-center scale-[.9] hover:opacity-60 transition-all duration-200 ${
            sideBar_ && "animate-pulse"
          }`}
          onClick={() => {
            setSideBar_(!sideBar_);
            setCart_(false);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div
          className={`w-[40px] h-[40px] rounded-[50%] cursor-pointer flex flex-col justify-center items-center scale-[.9] hover:opacity-60 transition-all duration-200 ${
            cart_ && "animate-pulse"
          }`}
          onClick={() => {
            setCart_(!cart_);
            setSideBar_(false);
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div
          className={`w-[40px] h-[40px] rounded-[50%] cursor-pointer flex flex-col justify-center items-center scale-[.9] hover:opacity-60 transition-all duration-200 ${
            cart_ && "animate-pulse"
          }`}
          onClick={() => {
            if (user_) {
              // signOut_()
              setUser_(null);
            } else {
              signIn_().then((user_) => {
                setUser_(user_);
              });
            }
            setCart_(false);
            setSideBar_(true);
          }}
        >
          <FontAwesomeIcon icon={user_ ? faSignOut : faUser} />
        </div>
      </div>
    </div>
  );
};

export default Search_;
