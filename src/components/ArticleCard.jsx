import React from "react";
import { images, stables } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArticleCard = ({ post, className }) => {

  return (
    <div
      className={`${className} rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] lg:w-[calc(33.33%-20px)]`}
    >
      <Link to = {`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.samplePostImage
          }
          alt="title"
          className="object-cover object-center w-full h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
      <Link to = {`/blog/${post.slug}`}>
        <h2 className="text-xl text-dark-soft font-bold md:text-2xl lg:text-[28px]">
          {post.title}
        </h2>
        <p className="mt-3 text-sm text-dark-light md:text-lg">
          {post.caption}
        </p>
        </Link>

        <div className="flex items-center justify-between mt-6 flex-nowrap">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                : images.userImage
              }  
              alt = "post profile"
              className="rounded-full w-9 h-9 md:w-10 md:h-10"
            />
            <div className="flex flex-col items-center">
              <h4 className="text-sm italic font-bold text-dark-soft">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  }  w-fit bg-opacity-20 p-1 flex rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className=" text-[#36B37E] w-1.5 h-1.5" />
                  ) : (
                    <AiOutlineClose className=" text-red-500 w-1.5 h-1.5" />
                  )}
                </span>
                <span className="text-xs italic text-dark-light md:text-sm">
                  {post.user.verified ? "Verified" : "Unverified"} writer
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm italic font-bold text-dark-light md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
