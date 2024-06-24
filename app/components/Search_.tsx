"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchState } from "./atoms/atoms";
import { faArrowRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { signIn_ } from "./utils/utils";

const Search_ = () => {
  const [searchPhrase_, setSearchPhrase_] = useRecoilState(SearchState);
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
      <div className={`relative min-w-[40px] min-h-[40px] left-[50px]`}>
        <div
          className={`w-[40px] h-[40px] rounded-[50%] bg-red-500 cursor-pointer`}
          onClick={signIn_}
        />
      </div>
    </div>
  );
};

export default Search_;
