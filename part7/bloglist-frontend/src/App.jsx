import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./store/blogsReducer";
import { initializeUser, initializeUsers } from "./store/userReducer";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import Navbar from "./components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const { logged: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <Navbar />

      <Container>
        <Notification />

        {!user ? (
          <LoginForm />
        ) : (
          <div className="my-3">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="d-flex justify-content-end">
                      <Link className="btn btn-success" to="/blogs/create">
                        Create
                      </Link>
                    </div>
                    <Row style={{ marginTop: "10px" }} id="blogs-list">
                      {[...blogs]
                        .sort((b1, b2) => b2.likes - b1.likes)
                        .map((blog) => (
                          <Col
                            key={blog.id}
                            sm={12}
                            md={6}
                            lg={4}
                            className="mb-4"
                          >
                            <Blog blog={blog} />
                          </Col>
                        ))}
                    </Row>
                  </>
                }
              />
              <Route path="/blogs/create" element={<CreateBlogForm />} />
              <Route path="/blogs/:id" element={<SingleBlog />} />
              <Route path="/users/:id" element={<SingleUser />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
