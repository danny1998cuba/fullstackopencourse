import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, loadBlogs }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const toSave = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    try {
      await blogService.updateBlog(blog.id, toSave, user.token);
      loadBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const conf = confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (conf) {
      try {
        await blogService.deleteBlog(blog.id, user.token);
        loadBlogs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        &nbsp;
        <button onClick={() => setOpenDetails(!openDetails)}>
          {openDetails ? "hide" : "view"}
        </button>
      </div>

      {openDetails && (
        <div>
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>

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
  loadBlogs: PropTypes.func.isRequired,
};

export default Blog;
