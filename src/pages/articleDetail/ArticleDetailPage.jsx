import React from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/:id" },
];

const postsData = [
  {
    id: "1",
    image: images.post1Image,
    title: "Help children get better education",
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    id: "2",
    image: images.post1Image,
    title: "Help children get better education",
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    id: "3",
    image: images.post1Image,
    title: "Help children get better education",
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
  {
    id: "4",
    image: images.post1Image,
    title: "Help children get better education",
    createdAt: "2022-12-31T17:22:05.092+0000",
  },
];

const tagsData = [
  "Medical",
  "Lifestyle",
  "Learn",
  "Healthy",
  "Food",
  "Diet",
  "Education",
];

const ArticleDetailPage = () => {
  return (
    <MainLayout>
      <section className="container flex flex-col max-w-5xl p-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="w-full rounded-xl"
            src={images.post1Image}
            alt="laptop"
          />
          <Link
            to="/blog?category=selectedCategory"
            className="inline-block mt-4 text-sm text-primary md:text-base"
          >
            EDUCATION
          </Link>
          <h1 className="text-xl font-medium mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
              excepturi omnis fugiat ullam sunt exercitationem cupiditate rem
              iste tempora quibusdam nisi doloremque numquam itaque aliquam
              aspernatur, dolores expedita inventore minus. Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Cupiditate enim, ducimus
              reprehenderit odio laudantium molestias recusandae, nihil ex
              adipisci earum atque inventore officiis quos, fugiat soluta unde
              sed placeat. Officia. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Atque labore in dolore, rerum laudantium dicta
              nesciunt a? Rem reiciendis culpa facilis, quos, molestiae repellat
              delectus unde ea accusamus incidunt assumenda!
            </p>
          </div>
          <CommentsContainer className="mt-10" loggedInUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postsData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />

          <div className="mt-7">
            <h2 className="font-[opensans] font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            <SocialShareButtons
              url={encodeURI(
                "https://moonfo.com/post/client-side-and-server-side-explanation"
              )}
              title={encodeURIComponent(
                "Client-side and Server-sdide explanation"
              )}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
