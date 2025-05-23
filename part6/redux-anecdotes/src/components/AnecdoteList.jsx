import { useDispatch, useSelector } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const vote = (id) => {
    dispatch(voteAction(id));
  };

  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
