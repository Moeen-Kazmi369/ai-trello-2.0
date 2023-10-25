'use client'
import SearchForm from "@/components/SearchForm";
import { useBoardStore } from "@/store/boardStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const {selectedBoard, setSelectedBoard} = useBoardStore()
  return (
    <header className="text-gray-600">
      <div className="mx-auto flex flex-wrap py-3 px-2 justify-between flex-col sm:flex-row items-center">
        {/* logo */}
       <Link href={'/'} onClick={() => setSelectedBoard(null)}>
       <Image
          src={"/images/black-logo.png"}
          width={300}
          height={150}
          alt="AI Trello"
          className="object-contain w-44 md:w-56"
        />
       </Link>
        {/* search */}
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
