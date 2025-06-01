import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteBlog, updateBlog } from "../store/blogsReducer";
import CommentForm from "./CommentForm";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { logged: user } = useSelector((state) => state.user);

  const { id } = useParams();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);

  if (!id) {
    navigate("/", { replace: true });
    return;
  }

  const blog = blogs.find((u) => u.id === id);

  if (!blog) {
    navigate("/", { replace: true });
    return;
  }

  const handleLike = () => {
    const toSave = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    dispatch(updateBlog(blog.id, toSave));
  };

  const handleDelete = () => {
    const conf = confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (conf) {
      navigate("/", { replace: true });
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>
          {blog.title}

          <span className="ms-4 fs-6">added by {blog.user.name}</span>
        </h2>

        {blog.user.username === user.username && (
          <Button variant="danger" onClick={handleDelete} size="sm">
            Remove
          </Button>
        )}
      </div>

      <div className="d-flex align-items-center gap-4">
        <small>
          See more 👉🏻{" "}
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </small>

        <div className="d-flex align-items-center gap-2">
          <span>❤️ {blog.likes}</span>
          <Button
            size="sm"
            variant="warning"
            onClick={handleLike}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            Like
          </Button>
        </div>
      </div>

      <h3 className="mt-5">Commnets</h3>
      <CommentForm id={blog.id} />

      <ul className="d-flex flex-column gap-2 list-unstyled ps-4 mt-3">
        {(blog.comments || []).map((c, i) => (
          <li key={`${c}_${i}`}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleBlog;
