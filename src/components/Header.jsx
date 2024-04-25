import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { images } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";

const navItemInfo = [
  {
    name: "Home",
    type: "link",
  },
  {
    name: "Articles",
    type: "link",
  },
  {
    name: "Pages",
    type: "dropdown",
    items: ["About us", "Contact us"],
  },
  {
    name: "Pricing",
    type: "link",
  },
  {
    name: "Faq",
    type: "link",
  },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((currState) => {
      return !currState;
    });
  };

  return (
    <li className="relative group ">
      {item.type === "link" ? (
        <>
          <Link
            to="/"
            className="no-underline  px-4 py-2 text-white lg:text-dark-soft"
          >
            {item.name}
          </Link>
          <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center text-white cursor-pointer lg:text-dark-soft ">
          <div
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </div>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } transition-all duration-500 pt-4 absolute lg:top-4 left-20 lg:left-0  lg:transform lg:translate-y-full group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center gap-y-3 flex flex-col shadow-lg rounded-lg overflow-hidden p-4">
              {item.items.map((page, index) => (
                <li className="list-none" key={index}>
                  <Link
                    to="/"
                    className="hover:bg-dark-hard no-underline hover:text-white w-full px-4 py-2 text-white lg:text-dark-soft rounded-md"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const userState = useSelector((state) => state.user);


  const navVisibilityHandler = () => {
    setNavIsVisible((currState) => {
      return !currState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white ">
      <header className=" flex justify-between items-center py-4 px-5 container mx-auto">
        <div>
          <img src={images.logo} alt="Logo" className="w-[70px]" />
        </div>

        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6 cursor-pointer"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 h-6 cursor-pointer"
              onClick={navVisibilityHandler}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row  fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="flex items-center gap-x-2 z-[49] gap-y-5 flex-col lg:flex-row list-none text-[14px] font-semibold">
            {navItemInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
          <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
          <div className="relative group">
            <div className="flex flex-col items-center">
              <button
                className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                    <span>Profile</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } transition-all duration-500 pt-4 absolute left-40 lg:left-0  lg:transform lg:translate-y-10 group-hover:block w-max`}
                  >
                   <ul className="bg-dark-soft lg:bg-transparent text-center gap-y-3 flex flex-col shadow-lg rounded-lg overflow-hidden p-4">
                      <button
                        type="button"
                        className="hover:bg-dark-hard no-underline hover:text-white w-full px-4 py-2 text-white lg:text-dark-soft rounded-md"
                      >
                        Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="hover:bg-dark-hard no-underline hover:text-white w-full px-4 py-2 text-white lg:text-dark-soft rounded-md"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button className="border-2 bg-transparent mt-5 lg:mt-0 border-blue-500 px-8 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 cursor-pointer hover:text-white transition-all duration-300">
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
