import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { useParams, Link } from "react-router-dom";
import ErrorMessage from "../../../../components/ErrorMessage";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import ArticleDetailSkeleton from "../../../articleDetail/ArticleDetailSkeleton";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
import { categoryToOption, filterCategories } from "../../../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setcategories] = useState(null);

  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });


  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated.");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
      setcategories(data.categories.map((item) => item._value))
      // setBody(parseJsonToHtml(data?.body));
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);

        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };

      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    updatedData.append("document", JSON.stringify({ body, categories }));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your image?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post data." />
      ) : (
        <section className="container flex flex-col max-w-5xl p-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="w-full rounded-xl"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-blue-50/50 min-h-[200px]">
                  <HiOutlineCamera className="h-auto w-7 text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="px-2 py-1 mt-5 text-sm font-semibold text-white bg-red-500 rounded-lg w-fit"
              onClick={handleDeleteImage}
            >
              Delete Image
            </button>
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

            <div className="my-5">
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)
                  }
                  onChange={(newValue) => setcategories(newValue.map((item) => item.value))}
                />
              )}
            </div>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg outline-none mt-5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
