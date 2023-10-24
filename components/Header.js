import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="text-gray-600">
      <div className="mx-auto flex flex-wrap py-3 px-2 justify-between flex-col sm:flex-row items-center">
        {/* logo */}
        <Image
          src={"/images/black-logo.png"}
          width={300}
          height={150}
          alt="AI Trello"
          className="object-contain w-44 md:w-56"
        />
        {/* search */}
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
