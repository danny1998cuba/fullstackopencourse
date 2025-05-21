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
            loadBlogs={loadBlogs}
            throwMessage={throwMessage}
            userToken={user.token}
          />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
