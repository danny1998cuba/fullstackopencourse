import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, updateOne } from "./services/anecdote";
import { useNotification } from "./components/NotificationsProvider";

const App = () => {
  const { triggerNotificationHelper } = useNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    initialData: [],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: anecdotes, isError, isLoading, isFetching } = result;

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, body }) => updateOne(id, body),
    onSuccess: (newAnecdote) => {
      const anecdotes = client.getQueryState(["anecdotes"]);
      client.setQueriesData(
        ["anecdotes"],
        anecdotes.data.map((a) => (a.id === newAnecdote.id ? newAnecdote : a))
      );
      triggerNotificationHelper(`anecdote '${newAnecdote.content}' voted`);
    },
  });

  const handleVote = (anecdote) => {
    mutation.mutate({
      id: anecdote.id,
      body: { ...anecdote, votes: anecdote.votes + 1 },
    });
  };

  if (isLoading || isFetching) return <div>Loading data...</div>;

  if (isError && !isFetching)
    return (
      <div>anecdote service not available due to problems in the server</div>
    );

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
