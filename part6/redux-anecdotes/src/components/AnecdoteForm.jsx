import { useDispatch } from "react-redux";
import { createAnecdoteHelper } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(createAnecdoteHelper(content));
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
