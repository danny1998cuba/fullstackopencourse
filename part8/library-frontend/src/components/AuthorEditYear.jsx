import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../lib/graphql/mutations";
import { GET_AUTHORS } from "../lib/graphql/queries";

const AuthorEditYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [createBook, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onError: (e) => {
      console.log(e.graphQLErrors);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    await createBook({
      variables: { name, setBornTo: year !== "" ? Number(year) : null },
    });

    setName("");
    setYear("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author name
          <select onChange={({ target }) => setName(target.value)} value={name}>
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit" disabled={result.loading || name === ""}>
          {result.loading ? "saving..." : "update author"}
        </button>
      </form>
    </div>
  );
};

export default AuthorEditYear;
