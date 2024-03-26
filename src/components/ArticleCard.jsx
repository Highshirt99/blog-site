import React from "react";
import { images } from "../constants";
import { BsCheckLg } from "react-icons/bs";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`${className} rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] lg:w-[calc(33.33%-20px)]`}
    >
      <img
        src={images.post1Image}
        alt="title"
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />
      <div className="p-5">
        <h2 className="text-xl text-dark-soft font-bold md:text-2xl lg:text-[28px]">Future of Work</h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg">
          Majority of people will work in jobs that don't exist today.
        </p>

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img src={images.PostProfileImage} alt="post profile" className="w-9 h-9 md:w-10 md:h-10"/>
            <div className="flex flex-col items-center">
              <h4 className="font-bold italic text-dark-soft text-sm">
                Viola Manisa
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1 flex rounded-full">
                  <BsCheckLg className=" text-[#36B37E] w-1.5 h-1.5" />
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold italic text-dark-light text-sm md:text-base">02 May</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
