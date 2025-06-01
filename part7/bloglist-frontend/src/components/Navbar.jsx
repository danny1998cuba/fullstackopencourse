import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userReducer";
import { Navbar as BNavbar, Button, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { logged: user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <BNavbar bg="dark" data-bs-theme="dark" expand="md" sticky="top">
      <Container>
        <BNavbar.Brand href="/">Blog app</BNavbar.Brand>

        <BNavbar.Toggle aria-controls="main-navbar" />
        <BNavbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Blogs
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
              </>
            )}
          </Nav>

          <BNavbar.Text className="d-flex align-items-center gap-4">
            {user ? (
              <>
                <span>
                  Signed in as: <span className="fw-bold">{user.name}</span>
                </span>
                <Button variant="primary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <BNavbar.Text>Welcome</BNavbar.Text>
            )}
          </BNavbar.Text>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

export default Navbar;
