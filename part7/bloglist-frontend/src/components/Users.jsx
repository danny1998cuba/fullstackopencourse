import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const { users } = useSelector((state) => state.user);

  return (
    <div>
      <h2>Users</h2>

      <Table striped borderless hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
