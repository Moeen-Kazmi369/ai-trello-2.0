'use client'
import { useBoardFormStore } from "@/store/BoardFormStore";
import React from "react";

const SideContent = () => {
    const{openForm}=useBoardFormStore()
  return (
    <div className="flex-1 min-h-[80vh]">
      <div className="flex  min-h-[80vh] sm:h-full items-center justify-center">
        <button onClick={openForm} className="px-6 py-2 text-white text-xl font-semibold rounded-full border">
          Create New Board
        </button>
      </div>
    </div>
  );
};

export default SideContent;
