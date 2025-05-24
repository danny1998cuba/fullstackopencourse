import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdote";
import { useNotification } from "./NotificationsProvider";

const AnecdoteForm = () => {
  const client = useQueryClient();
  const { triggerNotificationHelper } = useNotification();

  const mutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = client.getQueryState(["anecdotes"]);
      client.setQueriesData(["anecdotes"], anecdotes.data.concat(newAnecdote));
      triggerNotificationHelper(`anecdote '${newAnecdote.content}' added`);
    },
    onError: (error) => {
      triggerNotificationHelper(error.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    mutation.mutate(content);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
