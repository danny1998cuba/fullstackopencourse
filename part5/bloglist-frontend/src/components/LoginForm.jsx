import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import { LOGGED_USER_LS_KEY } from "../lib/constants";

const LoginForm = ({ setUser, throwMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      try {
        const user = await loginService.login({
          username,
          password,
        });
        setUsername("");
        setPassword("");

        setUser(user);
        localStorage.setItem(LOGGED_USER_LS_KEY, JSON.stringify(user));
      } catch (exception) {
        console.log(exception);
        throwMessage("Wrong username or password", "error");
      }
    } else {
      throwMessage("You should provide username & password", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="login-form">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  throwMessage: PropTypes.func.isRequired,
};

export default LoginForm;
