import { createSlice } from "@reduxjs/toolkit"
import { triggerNotificationHelper } from "./notificationReducer";
import anecdoteService from "../services/anecdote";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const slice = createSlice({
  name: "anecdote",
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    updateAction(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    createNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const res = await anecdoteService.getAll()
    dispatch(setAnecdotes(res))
  }
}

export const createAnecdoteHelper = (content) => {
  return async (dispatch) => {
    const res = await anecdoteService.createNew(content);

    dispatch(createNewAnecdote(res));
    dispatch(triggerNotificationHelper(`Anecdote "${content}" added`));
  }
}

export const voteHelper = (id) => {
  return async (dispatch, getState) => {
    const selected = getState().anecdotes?.find(a => a.id === id)

    if (selected) {
      const res = await anecdoteService.updateOne(id, {
        ...selected, votes: selected.votes + 1
      });

      dispatch(updateAction(res));
      dispatch(triggerNotificationHelper(`you voted "${selected.content}"`, 10));
    }

  }
}

export const { createNewAnecdote, updateAction, setAnecdotes } = slice.actions
export default slice.reducer