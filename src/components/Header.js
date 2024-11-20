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
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

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
    <div className="flex items-center justify-between p-4 shadow-md bg-white sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <MdOutlineMenu
          className="text-3xl cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        />
        <img
          src="https://tse4.mm.bing.net/th?id=OIP._IfEaUssjZQwZ1u92b1_GgHaEK&pid=Api&P=0&h=220"
          alt="YouTube"
          className="h-10"
        />
      </div>

      {/* Search Section */}
      <div className="relative flex-1 mx-4">
        <div className="flex items-center border rounded-full shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
            placeholder="Search"
            className="flex-1 px-4 py-2 rounded-l-full outline-none text-sm"
          />
          <button className="p-2 bg-gray-200 rounded-r-full hover:bg-gray-300">
            <BiSearch className="text-xl" />
          </button>
        </div>

        {/* Suggestions */}
        {showSuggestion && suggestion.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-10">
            <ul>
              {isLoading ? (
                <li className="p-2 text-gray-400">Loading...</li>
              ) : (
                suggestion.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* User Profile */}
      <img
        src="https://tse2.mm.bing.net/th?id=OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa&pid=Api&P=0&h=220"
        alt="User"
        className="h-10 rounded-full"
      />
    </div>
  );
};

export default Header;
