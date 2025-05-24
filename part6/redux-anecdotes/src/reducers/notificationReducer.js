import { createSlice } from "@reduxjs/toolkit"
import { getId } from "./anecdoteReducer"

const initialState = { text: null, id: 0 }

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    triggerNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      if (state.id === action.payload.id)
        return initialState
      return state
    }
  }
})

export const triggerNotificationHelper = (dispatch, text) => {
  const notId = getId();
  dispatch(triggerNotification({ text, id: notId, }));

  setTimeout(() => {
    dispatch(removeNotification({ id: notId }));
  }, 5000);
}

export const { triggerNotification, removeNotification } = slice.actions
export default slice.reducer