"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/boardStore";

const SearchForm = () => {
  const { searchString, setsearchString } = useBoardStore();
  return (
    <div className="flex px-2 py-2 space-x-2 items-center">
      <form className="w-full max-w-sm mx-auto">
        <div className="relative">
          <input
            type="text"
            id="searchQuery"
            name="searchQuery"
            value={searchString}
            onChange={(e) => setsearchString(e.target.value)}
            placeholder="Search"
            className="appearance-none border bg-white shadow-xl rounded w-full py-2 px-3 pl-10 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
          <FiSearch className="absolute left-3 top-3 text-black" />
          {/* You can add validation error messages here if needed */}
        </div>

        <button type="submit" hidden>
          Search
        </button>
      </form>

      <Avatar
        name="Moeen Kazmi"
        size="40"
        color="black"
        round
        className="shadow-xl"
      />
    </div>
  );
};

export default SearchForm;
