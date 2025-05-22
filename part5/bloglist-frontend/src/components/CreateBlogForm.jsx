import { useRef, useState } from "react";
import PropTypes from "prop-types";
import blogsService from "../services/blogs";
import Togglable from "./Togglable";

const CreateBlogForm = ({ loadBlogs, throwMessage, userToken }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const togglableRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      try {
        const response = await blogsService.createBlog(
          { title, url, author },
          userToken
        );
        throwMessage(
          `A new blog ${response.title} by ${response.author} added`,
          "success"
        );

        togglableRef?.current?.toggleVisibility();

        setTitle("");
        setAuthor("");
        setUrl("");

        loadBlogs();
      } catch (exception) {
        throwMessage(exception.message, "error");
      }
    } else {
      throwMessage(
        "You should provide all information about the blog",
        "error"
      );
    }
  };

  return (
    <Togglable buttonLabel="create new blog" ref={togglableRef}>
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>

        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

CreateBlogForm.propTypes = {
  loadBlogs: PropTypes.func.isRequired,
  throwMessage: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default CreateBlogForm;
