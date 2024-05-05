import React, { useEffect, useState } from "react";
import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";
import { Comment } from "./Comment";

const CommentsContainer = ({ className, loggedInUserId, comments }) => {
  // const [comments, setComments] = useState([]);
  // const mainComments = comments.filter((comment) => comment.parent === null);

  const [affectedComment, setAffectedComment] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const commentData = await getCommentsData();
  //     setComments(commentData);
  //   })();
  // }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    // const newComment = {
    //   _id: Math.random().toString(),
    //   user: {
    //     _id: "a",
    //     name: "Mohammad Rezaii",
    //   },
    //   desc: value,
    //   post: "1",
    //   parent,
    //   replyOnUser,
    //   createdAt: new Date().toISOString(),
    // };

    // setComments((curState) => {
    //   return [newComment, ...curState];
    // });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    // const updatedComments = comments.map((comment) => {
    //   if (comment._id === commentId) {
    //     return {
    //       ...comment,
    //       desc: value,
    //     };
    //   }
    //   return comment;
    // });
    // setComments(updatedComments);
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
  //   const updatedComments = comments.filter(
  //     (comment) => comment._id !== commentId
  //   );
  //   setComments(updatedComments);
  //   setAffectedComment(null);
  // };

  // const getRepliesHandler = (commentId) => {
  //   return comments
  //     .filter((comment) => comment.parent === commentId)
  //     .sort((a, b) => {
  //       return (
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //       );
  //     });
  };
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />

      <div className="mt-8 space-y-4">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
