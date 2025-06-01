import { useState } from "react";
import { Form, Container, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { triggerNotificationHelper } from "../store/notificationReducer";
import { createBlog } from "../store/blogsReducer";
import { Link, useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      dispatch(createBlog({ title, author, url }));

      setTitle("");
      setAuthor("");
      setUrl("");

      navigate("/");
    } else {
      dispatch(
        triggerNotificationHelper(
          "You should provide all information about the blog",
          "danger",
        ),
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80dvh" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="col-12 col-md-6 border rounded p-4 d-flex flex-column gap-3"
      >
        <h2 className="w-100 text-center">New blog</h2>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <div className="d-flex w-100 gap-4">
          <Button
            variant="danger"
            type="button"
            id="create-button"
            className="w-100"
            as={Link}
            to="/"
          >
            Cancel
          </Button>
          <Button type="submit" id="create-button" className="w-100">
            Create
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateBlogForm;
