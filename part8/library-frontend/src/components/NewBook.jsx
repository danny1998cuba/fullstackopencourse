import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../lib/graphql/mutations";
import { GET_AUTHORS, GET_BOOKS } from "../lib/graphql/queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const [createBook, result] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
    onError: (e) => {
      console.log(e.graphQLErrors);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    await createBook({
      variables: { author, genres, title, published: Number(published) },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");

    navigate("/books");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit" disabled={result.loading}>
          {result.loading ? "Creating..." : "create book"}
        </button>
      </form>
    </div>
  );
};

export default NewBook;
