import React from "react";
import {
  deleteComment,
  getAllComments,
} from "../../../../services/index/comments";
import DataTable from "../../../../components/DataTable";
import { images, stables } from "../../../../constants";
import { useDataTable } from "../../../../hooks/useDataTable";

const Comments = () => {

  const {
    userState,
    currentPage,
    setCurrentPage,
    isLoading,
    isFetching,
    data: commentsData,
    searchKeyword,
    searchKeywordHandler,
    submitSearchKeywordHandler
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted.",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({ commentId: slug, token });
    },
  });
  return (
    <DataTable
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceholder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Response to",
        "Created At",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
      userState={userState}
    >
      {commentsData?.data?.map((comment) => (
        <tr key={comment._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    alt="comment?.user?.name"
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.userImage
                    }
                    className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
        {comment?.desc}
      </p>
    </td> */}
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
    </td> */}
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
