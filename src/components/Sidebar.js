import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaTrophy, FaGamepad, FaFilm, FaClock } from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  if(!isMenuOpen) return null;
  return (
    <div className="p-5 shadow-lg w-48 ">
      <ul>
        <li><Link to="/"><FaHome className="inline-block mr-2" />Home</Link></li>
        <li><FaFilm className="inline-block mr-2" />Shorts</li>
        <li><FaFilm className="inline-block mr-2" />Videos</li>
        <li><FaClock className="inline-block mr-2" />Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscription</h1>
      <ul>
        <li><FaMusic className="inline-block mr-2" />Music</li>
        <li><FaTrophy className="inline-block mr-2" />Sports</li>
        <li><FaGamepad className="inline-block mr-2" />Gaming</li>
        <li><FaFilm className="inline-block mr-2" />Movie</li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li><FaMusic className="inline-block mr-2" />Music</li>
        <li><FaTrophy className="inline-block mr-2" />Sports</li>
        <li><FaGamepad className="inline-block mr-2" />Gaming</li>
        <li><FaFilm className="inline-block mr-2" />Movie</li>
      </ul>
    </div>
  );
};

export default Sidebar;
