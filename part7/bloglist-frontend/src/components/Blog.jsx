import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
      <Card className="blog">
        <Card.Body>
          {blog.title}
          &nbsp;
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <span>❤️ {blog.likes}</span>
          <span>By {blog.author}</span>
        </Card.Footer>
      </Card>
    </Link>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
