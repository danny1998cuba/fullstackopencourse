import { useDispatch, useSelector } from "react-redux";
import { voteHelper } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteHelper(id));
  };

  return (
    <>
      {[...anecdotes]
        .filter((a) => a.content.includes(filter))
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
