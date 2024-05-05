import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { images } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";

const navItemInfo = [
  {
    name: "Home",
    type: "link",
    href: "/",
  },
  {
    name: "Articles",
    type: "link",
    href: "/articles",
  },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  {
    name: "Pricing",
    type: "link",
    href: "/pricing",
  },
  {
    name: "Faq",
    type: "link",
    href: "/faq",
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
            to={item.href}
            className="px-4 py-2 text-white no-underline lg:text-dark-soft"
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
            className="flex items-center px-4 py-2 gap-x-1"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </div>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } transition-all duration-500 pt-4 absolute lg:top-2 left-20 lg:left-0  lg:transform lg:translate-y-10 group-hover:block w-max`}
          >
            <ul className="flex flex-col p-4 overflow-hidden text-center rounded-lg shadow-lg bg-dark-soft lg:bg-transparent gap-y-3">
              {item.items.map((page, index) => (
                <li className="list-none" key={index}>
                  <Link
                    to={page.href}
                    className="w-full px-4 py-2 text-white no-underline rounded-md hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                  >
                    {page.title}
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
  const navigate = useNavigate();
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
    navigate("/login");
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white ">
      <header className="container flex items-center justify-between px-5 py-4 mx-auto ">
        <Link to = "/">
          <img src={images.logo} alt="Logo" className="w-[70px]" />
        </Link>

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
            <div className="flex flex-col items-center font-semibold text-white gap-y-5 lg:text-dark-soft lg:flex-row gap-x-2">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex items-center px-6 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 border-2 border-blue-500 rounded-full gap-x-1 lg:mt-0 hover:bg-blue-500 hover:text-white"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } transition-all duration-500 pt-4 absolute left-40 lg:left-0  lg:transform lg:translate-y-10 group-hover:block w-max`}
                  >
                    <ul className="flex flex-col p-4 overflow-hidden text-center rounded-lg shadow-lg bg-dark-soft lg:bg-transparent gap-y-3">
                      <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="w-full px-4 py-2 text-white no-underline rounded-md hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Profile Page
                      </button>
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="w-full px-4 py-2 text-white no-underline rounded-md hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="px-8 py-2 mt-5 font-semibold text-blue-500 transition-all duration-300 bg-transparent border-2 border-blue-500 rounded-full cursor-pointer lg:mt-0 hover:bg-blue-500 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
