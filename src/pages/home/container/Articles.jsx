import React from "react";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  
  return (
    <section className="container flex flex-col px-5 py-10 mx-auto ">
      <div className="flex flex-wrap pb-10 md:gap-x-5 gap-y-5">
        {isLoading
          ? [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]"
              />
            ))
            : isError ? (
              <ErrorMessage message="Couldn't fetch the posts data." />
            )
          : data?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)]  lg:w-[calc(33.33%-21px)]"
              />
            ))}
      </div>
      <Link to = "/blog" className="flex items-center px-6 py-3 mx-auto font-bold bg-transparent border-2 rounded-lg cursor-pointer gap-x-2 text-primary border-primary ">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </Link>
    </section>
  );
};

export default Articles;
