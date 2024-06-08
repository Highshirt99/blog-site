import React from "react";
import { getAllPosts, deletePost } from "../../../../services/index/posts";
import { images, stables } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";

const ManagePosts = () => {
  const {
    userState,
    currentPage,
    setCurrentPage,
    isLoading,
    isFetching,
    data: postsData,
    searchKeyword,
    isLoadingDeleteData,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted.",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({ slug, token });
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Manage Posts</h1>
      <div className="w-full px-4 mx-auto ">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
            <div className="text-end">
              <form
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                onSubmit={submitSearchKeywordHandler}
              >
                <div className="relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="post title"
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan="5" className="w-full py-10 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : postsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="w-full py-10 text-center">
                        No post found
                      </td>
                    </tr>
                  ) : (
                    postsData?.data.map((post) => (
                      <tr key={post._id}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  alt="post.title"
                                  src={
                                    post?.photo
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post.photo
                                      : images.samplePostImage
                                  }
                                  className="object-cover w-10 mx-auto rounded-lg aspect-square"
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {post.categories.length > 0
                              ? post.categories
                                  .slice(0, 3)
                                  .map(
                                    (category, index) =>
                                      `${category.title}${
                                        post.categories.slice(0, 3).length ===
                                        index + 1
                                          ? ""
                                          : ", "
                                      }`
                                  )
                              : "Uncategorized"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                year: "numeric",
                                month: "short",
                              }
                            )}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-2">
                            {post.tags.length > 0 ? (
                              post.tags.map((tag, index) => (
                                <p key={tag}>
                                  {tag}
                                  {post.tags.length - 1 !== index && ","}
                                </p>
                              ))
                            ) : (
                              <p>No tags</p>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-5 space-x-5 text-sm bg-white border-b border-gray-200">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isLoadingDeleteData}
                            onClick={() => {
                              deleteDataHandler({
                                slug: post?.slug,
                                token: userState.userInfo.token,
                              });
                            }}
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/posts/manage/edit/${post?.slug}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    postsData?.headers?.["x-totalpagecount"]
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
