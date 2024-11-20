import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaMusic,
  FaTrophy,
  FaGamepad,
  FaFilm,
  FaClock,
} from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-60 bg-gray-800 text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-gray-300 uppercase tracking-wider">
          Navigation
        </h1>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaFilm size={20} />
              <span>Shorts</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaFilm size={20} />
              <span>Videos</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaClock size={20} />
              <span>Live</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-bold text-gray-300 uppercase tracking-wider">
          Subscriptions
        </h1>
        <ul className="mt-4 space-y-3">
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaMusic size={20} />
              <span>Music</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaTrophy size={20} />
              <span>Sports</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaGamepad size={20} />
              <span>Gaming</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaFilm size={20} />
              <span>Movie</span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-lg font-bold text-gray-300 uppercase tracking-wider">
          Watch Later
        </h1>
        <ul className="mt-4 space-y-3">
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaMusic size={20} />
              <span>Music</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaTrophy size={20} />
              <span>Sports</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaGamepad size={20} />
              <span>Gaming</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
              <FaFilm size={20} />
              <span>Movie</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
