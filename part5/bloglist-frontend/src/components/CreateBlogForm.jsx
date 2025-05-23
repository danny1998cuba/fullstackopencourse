import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";

const CreateBlogForm = ({ createBlog, throwMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const togglableRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && author !== "" && url !== "") {
      togglableRef?.current?.toggleVisibility();
      createBlog({ title, author, url });

      setTitle("");
      setAuthor("");
      setUrl("");
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
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
    </Togglable>
  );
};

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  throwMessage: PropTypes.func.isRequired,
};

export default CreateBlogForm;
