import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";

const CommentBox = ({ topic, id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const commenter = localStorage.getItem("user");

  const handlePostComment = async () => {
    if (newComment.length === 0) {
      return;
    }
    const { data } = await axios.post("/api/comments", {
      commenter,
      topic,
      topic_id: id,
      comment: newComment,
    });
    setComments((prev) => [...prev, data]);
    setNewComment("");
  };

  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get(
        `/api/comments/?topic=${topic}&id=${id}`
      );
      setComments(data);
      console.log(data);
    };
    getComments();
  }, []);

  return (
    <div className="comments-container">
      {comments.map((c, i) => (
        <CommentCard key={c.id} comment={c} />
      ))}
      <textarea
        className="my-4"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={5}
      />
      <button
        className="button"
        type="button"
        onClick={(e) => handlePostComment()}
      >
        Post
      </button>
    </div>
  );
};

export default CommentBox;
