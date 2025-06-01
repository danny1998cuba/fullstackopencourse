import { Route, Routes, Link, Navigate } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const linkStyle = {
    margin: "0 12px",
    padding: "5px 15px",
    border: "1px solid black",
    borderRadius: 5,
    display: "inline-block",
    textDecoration: "none",
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/authors" style={linkStyle}>
          authors
        </Link>
        <Link to="/books" style={linkStyle}>
          books
        </Link>
        <Link to="/add" style={linkStyle}>
          add book
        </Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/*" element={<Navigate to={"/authors"} replace />} />
      </Routes>
    </div>
  );
};

export default App;
