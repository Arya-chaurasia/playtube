import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/config";
import { BiSearch } from "react-icons/bi";
import { MdOutlineMenu } from "react-icons/md";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length === 0) {
        setSuggestion([]);
        return;
      }
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
      setSuggestion(json[1]);
      dispatch(cacheResults({ [searchQuery]: json[1] }));
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="flex items-center justify-between px-4 py-2 shadow-md bg-white sticky top-0 z-50">
  
      <div className="flex items-center gap-3">
        <MdOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        />

        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-red-600 font-extrabold text-xl px-2 py-0.5 bg-red-100 rounded-lg">
            ▶
          </span>
          <h1 className="text-xl font-bold">
            <span className="text-red-600">Play</span>
            <span className="text-black">Tube</span>
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-xl mx-4">
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
            placeholder="Search"
            className="flex-1 px-4 py-1 outline-none text-sm"
          />
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-l">
            <BiSearch className="text-xl" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestion && suggestion.length > 0 && (
          <div className="absolute top-11 left-0 w-full bg-white border rounded-lg shadow-lg z-10">
            <ul className="text-sm">
              {isLoading ? (
                <li className="p-2 text-gray-400">Loading...</li>
              ) : (
                suggestion.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <BiSearch className="text-gray-500" />
                    {item}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa&pid=Api"
          alt="User"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
