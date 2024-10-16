import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async () => {
    if (!searchQuery) return;

    const params = new URLSearchParams(searchParams);
    params.set("searchQuery", searchQuery);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="hidden md:flex items-center">
      <input
        type="text"
        name="search"
        placeholder="Tìm kiếm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        id="search"
        className="border rounded-md p-2 outline-none rounded-br-none rounded-tr-none text-sm focus:border-slate-400 transition-all"
      />
      <div
        onClick={handleSearch}
        className="w-[39px] h-[39px] cursor-pointer transition-all hover:opacity-[.8] border rounded-md rounded-tl-none rounded-bl-none  bg-slate-300 flex items-center justify-center round"
      >
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: "black", fontSize: 16 }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
