import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { triggerNotificationHelper } from "../store/notificationReducer";
import { commentBlog } from "../store/blogsReducer";
import { Form, Button } from "react-bootstrap";

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const commentToSet = comment.trim();

    e.preventDefault();
    if (commentToSet !== "") {
      dispatch(commentBlog(id, commentToSet));
      setComment("");
    } else {
      dispatch(
        triggerNotificationHelper(
          "you should provide a text for your comment",
          "danger",
        ),
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex gap-4">
      <Form.Group className="w-100">
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment here"
        />
      </Form.Group>
      <Button type="submit" variant="warning" style={{ whiteSpace: "nowrap" }}>
        Add comment
      </Button>
    </Form>
  );
};

export default CommentForm;
