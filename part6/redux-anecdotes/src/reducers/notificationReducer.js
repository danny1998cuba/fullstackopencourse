import { createSlice } from "@reduxjs/toolkit"
import { getId } from "./anecdoteReducer"

const initialState = { text: null, id: 0 }

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (state.id === action.payload.id)
        return initialState
      return state
    }
  }
})

const { setNotification, removeNotification } = slice.actions

export const triggerNotificationHelper = (text, delay = 5) => {
  return (dispatch) => {
    const notId = getId();
    dispatch(setNotification({ text, id: notId, }));

    setTimeout(() => {
      dispatch(removeNotification({ id: notId }));
    }, delay * 1000);
  }
}

export default slice.reducer