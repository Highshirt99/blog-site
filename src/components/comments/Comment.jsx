import React from "react";
import {stables, images } from "../../constants";
import { FiEdit2, FiMessageSquare, FiTrash } from "react-icons/fi";
import CommentForm from "./CommentForm";

export const Comment = ({
  comment,
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBelongsToUser = loggedInUserId === comment?.user?._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment?._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment?._id === comment?._id;

  const repliedCommentId = parentId ? parentId : comment?._id;
  const replyOnUserId = comment?.user?._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg" id = {
      `comment-${comment?._id}`
    }>
      <img
        src={comment?.user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar : images.userImage}
        alt="user profile"
        className="object-cover rounded-full w-9 h-9"
      />
      <div className="flex flex-col flex-1">
        <h5 className="text-xs font-bold text-dark-hard lg:text-sm">
          {comment?.user?.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment?.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-[opensans] mt-[10px] text-dark-light">
            {comment?.desc}
          </p>
        )}

        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment?._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment?.desc}
          />
        )}
        <div className="flex items-center mt-3 mb-3 space-x-2 text-sm text-dark-light">
          {isUserLoggedIn && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment?._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment?._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment?._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>

        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply?._id}
                comment={reply}
                loggedInUserId={loggedInUserId}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                addComment={addComment}
                parentId={comment?._id}
                updateComment={updateComment}
                deleteComment={deleteComment}
                replies={[]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
