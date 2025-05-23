import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeProps, handleDeleteProps, user }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const toSave = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    handleLikeProps(blog.id, toSave);
  };

  const handleDelete = () => {
    handleDeleteProps(blog.id, `Remove blog ${blog.title} by ${blog.author}?`);
  };

  return (
    <div style={blogStyle} className="blog">
      <div data-testid="test-text-section">
        {blog.title} {blog.author}
        &nbsp;
        <button onClick={() => setOpenDetails(!openDetails)}>
          {openDetails ? "hide" : "view"}
        </button>
      </div>

      {openDetails && (
        <div>
          <div data-testid="test-url-section">
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div data-testid="test-likes-section">
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>

          {blog.user.username === user.username && (
            <button
              onClick={handleDelete}
              style={{
                background: "#2092e6",
                border: "none",
                borderRadius: "5px",
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeProps: PropTypes.func.isRequired,
  handleDeleteProps: PropTypes.func.isRequired,
};

export default Blog;
