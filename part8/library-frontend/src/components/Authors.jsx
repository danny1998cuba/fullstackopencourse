import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../lib/graphql/queries";
import AuthorEditYear from "./AuthorEditYear";

const Authors = () => {
  const { data, loading } = useQuery(GET_AUTHORS);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthday</h2>
      <AuthorEditYear authors={data.authors} />
    </div>
  );
};

export default Authors;
