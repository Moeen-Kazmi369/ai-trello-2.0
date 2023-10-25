"use client";
import { deleteBoardInDB } from "@/lib/deleteBoardInDB";
import { getBoardsListsFromDB } from "@/lib/getBoardlistsFromDB";
import { useBoardFormStore } from "@/store/BoardFormStore";
import { useBoardStore } from "@/store/boardStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import { useRouter } from "next/navigation";
const SideBar = () => {
  const route=useRouter()
  const { boardLists, updateBoardLists } = useBoardFormStore();
  const [data, setData] = useState();
  const [isOpen, setOpen] = useState(true);
  const [isClose, setClose] = useState(false);
  const {selectedBoard, setSelectedBoard} = useBoardStore()
  // Initialize the state variable and set it to false by default
  const [isSmallScreen, setIsSmallScreen] = useState();

  // Define a function to update the state based on screen width
  const updateScreenSize = () => {
    if (window.innerWidth <= 632) {
      setIsSmallScreen(true);
      setClose(true);
      setOpen(false);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Add an event listener to update the state when the window is resized
  useEffect(() => {
    updateScreenSize(); // Call the function to set the initial state
    window.addEventListener("resize", updateScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoardsListsFromDB();
        updateBoardLists(res);
        if(!res){
          route.push('/')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const deleteBoard = async (id) => {
    const newboardList = boardLists.filter((item) => item.id !== id);
    updateBoardLists(newboardList);
    await deleteBoardInDB(id);
  };
  return (
    <div>
      {isSmallScreen === true && (
        <h2 className="text-5xl text-center sm:text-left font-bold">
          Boards Lists
        </h2>
      )}
      <div
        className={`px-4 py-4 sm:min-h-[80vh] z-10 sm:z-0 absolute sm:static h-auto flex flex-col sm:flex-row justify-between ${
          isOpen
            ? "transition-all w-full sm:w-80 backdrop-blur-md rounded-xl duration-300 ease-in-out"
            : "transition-all sm:w-10 h-10 w-full duration-300 ease-in-out"
        }`}
      >
        <div className={`w-[90%] ${isOpen ? "block" : "hidden"}`}>
          {isSmallScreen === false && (
            <h2 className="text-2xl text-center sm:text-left font-bold">
              Boards Lists
            </h2>
          )}
          <div className="my-4">
            {boardLists &&
              boardLists.map((item, index) => {
                return(
                <div
                  key={index}
                  className={`flex justify-between items-center my-3 px-3 py-2 rounded-lg ${
                    selectedBoard === item.id
                      ? 'bg-gradient-to-br from-purple-500 via-white to-purple-500'
                      : 'bg-gray-200'
                  }`}
                >
                  <Link href={`/board/${item.id}`}>
                    <h3
                      className="text-xl font-semibold hover:underline capitalize cursor-pointer w-full px-5"
                      onClick={() => setSelectedBoard(item.id)}
                    >
                      {item.title}
                    </h3>
                  </Link>
                  <button onClick={() => deleteBoard(item.id)}>
                    <RxCrossCircled className="text-3xl " />
                  </button>
                </div>
                )})}
          </div>
        </div>
        {isSmallScreen === false && (
          <div className="flex justify-center items-center">
            {isOpen && (
              <button
                onClick={() => {
                  setOpen(false);
                  setClose(true);
                }}
              >
                <HiOutlineChevronDoubleLeft className="text-xl text-white" />
              </button>
            )}
            {isClose && (
              <button
                onClick={() => {
                  setOpen(true);
                  setClose(false);
                }}
              >
                <HiOutlineChevronDoubleRight className="text-xl text-white" />
              </button>
            )}
          </div>
        )}
        {isSmallScreen === true && (
          <div className="flex justify-center items-center">
            {isOpen && (
              <button
                onClick={() => {
                  setOpen(false);
                  setClose(true);
                }}
              >
                <HiOutlineChevronDoubleUp className="text-xl" />
              </button>
            )}
            {isClose && (
              <button
                onClick={() => {
                  setOpen(true);
                  setClose(false);
                }}
              >
                <HiOutlineChevronDoubleDown className="text-xl" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
