import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { triggerNotificationHelper } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(createNewAnecdote(content));
    triggerNotificationHelper(dispatch, `Anecdote "${content}" added`);
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
