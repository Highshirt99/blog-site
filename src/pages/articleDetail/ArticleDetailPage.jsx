import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/index/posts";
import ArticleDetailSkeleton from "./ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../services/index/posts";
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import Editor from "../../components/editor/Editor";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });
  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    if (data) {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${slug}` },
      ]);

      // setBody(parseJsonToHtml(data?.body));
    }
  }, [data, slug]);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post data." />
      ) : (
        <section className="container flex flex-col max-w-5xl p-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="w-full rounded-xl"
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.samplePostImage
              }
              alt="data?.title"
            />

            <div className="flex gap-2 mt-4">
              {data?.categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/blog?category=${category.name}`}
                  className="inline-block mt-4 text-sm text-primary md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <h1 className="text-xl font-medium mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>
            <CommentsContainer
              className="mt-10"
              loggedInUserId={userState?.userInfo?._id}
              comments={data?.comments}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData?.data}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />

            <div className="mt-7">
              <h2 className="font-[opensans] font-medium text-dark-hard mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
