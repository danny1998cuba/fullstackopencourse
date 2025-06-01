import React from "react";
import { useSelector } from "react-redux";
import { Col, Row, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);

  if (!id) {
    navigate("/users", { replace: true });
    return;
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    navigate("/users", { replace: true });
    return;
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h4>Added blogs</h4>

      <Row style={{ marginTop: "10px" }} id="blogs-list">
        {user.blogs.map((b) => (
          <Col key={b.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>{b.title}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SingleUser;
