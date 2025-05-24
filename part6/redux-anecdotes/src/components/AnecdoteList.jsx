import { useDispatch, useSelector } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import { triggerNotificationHelper } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteAction({ id }));
    triggerNotificationHelper(
      dispatch,
      `you voted "${anecdotes.find((a) => a.id === id)?.content}"`
    );
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
