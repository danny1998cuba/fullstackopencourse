import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createNewAnecdote(e.target.content.value));
    e.target.content.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input id="content" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
