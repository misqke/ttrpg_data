import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment">
      <div className="flex row items-center justify-between">
        <h6>{comment.commenter}</h6>
        <i>{new Date(comment.posted_at).toLocaleString()}</i>
      </div>
      <p>{comment.comment}</p>
      <hr />
    </div>
  );
};

export default CommentCard;
