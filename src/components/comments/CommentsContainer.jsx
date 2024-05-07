import React, { useState } from "react";
// import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";
import { Comment } from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComment, updateComment, deleteComment } from "../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CommentsContainer = ({
  className,
  loggedInUserId,
  comments,
  postSlug,
}) => {
  // const [comments, setComments] = useState([]);
  // const mainComments = comments.filter((comment) => comment.parent === null);
  const queryClient = useQueryClient();
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);

  // useEffect(() => {
  //   (async () => {
  //     const commentData = await getCommentsData();
  //     setComments(commentData);
  //   })();
  // }, []);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is sent successfully, it will be visible after the confirmation by the admin."
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment } =
    useMutation({
      mutationFn: ({ token, desc, commentId }) => {
        return updateComment({ token, desc, commentId });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is updated successfully."
        );
        queryClient.invalidateQueries(["blog", postSlug]);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
    
  const { mutate: mutateDeletteComment } =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({ token, commentId });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is deleted successfully."
        );
        queryClient.invalidateQueries(["blog", postSlug]);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

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

    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
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
    mutateUpdateComment({
      desc: value,
      commentId,
      token: userState.userInfo.token,
    });

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

    mutateDeletteComment({
      token: userState.userInfo.token,
      commentId,
    });
    
  };
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />

      <div className="mt-8 space-y-4">
        {comments?.map((comment, index) => (
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
