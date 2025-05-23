import { useState, useEffect, useCallback } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { LOGGED_USER_LS_KEY } from "./lib/constants";
import LoginForm from "./components/LoginForm";
import "./index.css";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const throwMessage = (text, messageType) => {
    setMessage(text);
    setMessageType(messageType);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    const obj = localStorage.getItem(LOGGED_USER_LS_KEY);
    if (obj) {
      setUser(JSON.parse(obj));
    }
  }, []);

  const loadBlogs = useCallback(async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const logout = () => {
    localStorage.removeItem(LOGGED_USER_LS_KEY);
    setUser(null);
  };

  const handleCreate = async (newBlog) => {
    try {
      const response = await blogService.createBlog(newBlog, user.token);
      throwMessage(
        `A new blog ${response.title} by ${response.author} added`,
        "success"
      );

      loadBlogs();
    } catch (exception) {
      throwMessage(exception.message, "error");
    }
  };

  const handleLike = async (id, newBlog) => {
    try {
      await blogService.updateBlog(id, newBlog, user.token);
      loadBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, confirmMessage) => {
    const conf = confirm(confirmMessage);
    if (conf) {
      try {
        await blogService.deleteBlog(id, user.token);
        throwMessage(
          `Blog entry removed`,
          "success"
        );
        loadBlogs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Notification message={message} type={messageType} />

      {!user ? (
        <>
          <h2>log in to the application</h2>
          <LoginForm throwMessage={throwMessage} setUser={setUser} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </p>

          <CreateBlogForm
            throwMessage={throwMessage}
            createBlog={handleCreate}
          />

          <div style={{ marginTop: "10px" }} id="blogs-list">
            {blogs
              .sort((b1, b2) => b2.likes - b1.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  handleDeleteProps={handleDelete}
                  handleLikeProps={handleLike}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
