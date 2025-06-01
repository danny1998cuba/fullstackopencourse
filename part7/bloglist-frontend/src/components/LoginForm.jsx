import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { triggerNotificationHelper } from "../store/notificationReducer";
import { login } from "../store/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      dispatch(login({ username, password }));
      setUsername("");
      setPassword("");
    } else {
      dispatch(
        triggerNotificationHelper(
          "You should provide username & password",
          "danger",
        ),
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80dvh" }}
    >
      <Form
        onSubmit={handleSubmit}
        id="login-form"
        className="col-12 col-md-6 border rounded p-4 d-flex flex-column gap-3"
      >
        <h2 className="w-100 text-center">Log into the app</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
