import React, { useState } from "react";
import { FaLandmark, FaUser, FaComments } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiDramaMasks } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isDramaOpen, setIsDramaOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const SIDEBAR_LINKS = [
    {
      id: 1,
      path: "/",
      name: "Drama",
      icon: MdLocalMovies,
      subItems: [
        { id: 1.1, path: "/drama/show", name: "Show Drama" },
        { id: 1.2, path: "/drama/new", name: "Input New Drama" },
      ],
    },
    { id: 2, path: "/countries", name: "Countries", icon: FaLandmark },
    { id: 3, path: "/genres", name: "Genres", icon: GiDramaMasks },
    { id: 4, path: "/actors", name: "Actors", icon: HiUserGroup },
    { id: 5, path: "/comments", name: "Comments", icon: FaComments },
    { id: 6, path: "/users", name: "Users", icon: FaUser },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen bg-white border-r md:pl-2 pt-8 px-4 md:px-4">
      <div className=" flex justify-center md:justify-start items-center">
        <img
          src="/public/logo.png"
          alt="Logo"
          className="w-10 md:w-20"
        />
        <h1 className="font-bold text-xl hidden md:flex">THE FILMS</h1>
      </div>

      <ul className="mt-4 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li key={index}>
            <div
              className={`font-medium rounded-md py-1 px-5 hover:bg-gray-100 hover:text-red-500 flex justify-between items-center ${
                activeLink === index ? "bg-red-100 text-red-500" : ""
              }`}
            >
              <Link
                to={link.path}
                className="flex justify-center md:justify-start items-center md:space-x-5"
                onClick={() => {
                  handleLinkClick(index);
                  if (link.subItems) {
                    setIsDramaOpen(!isDramaOpen);
                  }
                }}
              >
                <span>{<link.icon size={25} />}</span>
                <span className="text-m text-gray-500 hidden md:flex font-semibold">
                  {link.name}
                </span>
              </Link>
              {link.subItems && (
                <span
                  onClick={() => setIsDramaOpen(!isDramaOpen)}
                  className="cursor-pointer"
                >
                  {isDramaOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </div>

            {link.subItems && isDramaOpen && (
              <ul className="ml-6 pl-4 border-l border-gray-300 mt-2 space-y-2">
                {link.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <Link
                      to={subItem.path}
                      className="text-sm text-gray-400 hover:bg-gray-100 hover:text-red-500 block rounded-md py-2 px-4"
                      onClick={() => handleLinkClick(index)}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
