import React from "react";
import { getAllPosts, deletePost } from "../../../../services/index/posts";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../../../components/DataTable";

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
    },
  });

  return (
    <DataTable
      pageTitle="Manage Posts"
      dataListName="Posts"
      searchInputPlaceholder="Post title"
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Title", "Category", "Created At", "Tags", ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={postsData?.headers}
      userState={userState}
    >
      {postsData?.data.map((post) => (
        <tr key={post._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    alt="post.title"
                    src={
                      post?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                        : images.samplePostImage
                    }
                    className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
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
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                year: "numeric",
                month: "short",
              })}
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
      ))}
    </DataTable>
  );
};

export default ManagePosts;
