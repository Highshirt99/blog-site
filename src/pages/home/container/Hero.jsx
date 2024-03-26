import React from "react";
import { images } from "../../../constants";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col p-5  lg:flex-row">
      <div className="mt-10 lg:w-1/2 ">
        <h1 className="font-bodyFont text-3xl lg:text-4xl xl:text-5xl text-center font-bold text-dark-soft md:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most interesting articles.
        </h1>
        <p className="text-dark-light xl:text-xl lg:text-base mt-4 text-center md:text-xl lg:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, magni
          saepe fugiat deleniti quis nam porro! Pariatur consequuntur aperiam
          autem est doloremque eius eveniet commodi corrupti consequatur? Ipsum,
          harum consectetur.
        </p>

        <div className="flex flex-col lg:mt-6 xl:mt-10 gap-y-2.5 mt-10 relative">
          <div className="relative rounded-lg  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-2 lg:py-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#959EAD]" />
            <input
              type="text"
              placeholder="Search article"
              className=" bg-transparent border-none placeholder:text-[#959EAD] rounded-lg pl-12  w-full py-3 placeholder:font-bold font-semibold text-dark-soft  focus:outline-none "
            />
          </div>
          <button className="border-none bg-primary w-full cursor-pointer text-white font-semibold rounded-lg px-5 py-3 lg:absolute lg:right-2 lg:top-3  lg:w-fit lg:py-2 md:absolute md:right-2 md:top-3  md:w-fit md:py-2">Search</button>
        </div>
        <div className="flex flex-col items-start mt-4 lg:flex-row lg:no-wrap  lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light lg:text-sm xl:text-base lg:mt-4 mt-2 font-semibold italic">Popular Tags:</span>
          <ul className="list-none lg:text-sm xl:text-base flex flex-wrap gap-2.5 mt-3  lg:static">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold ">Design</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">User Experience</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">User Interfaces</li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img src={images.HeroImg} className="w-full" alt="Users reading articles" />
      </div>
    </section>
  );
};

export default Hero;
