import { createSlice } from "@reduxjs/toolkit"
import { getId } from "../lib/helpers"

const initialState = { text: null, type: "success", id: 0 }

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

export const triggerNotificationHelper = (text, type, delay = 5) => {
  return (dispatch) => {
    const notId = getId();
    dispatch(setNotification({ text, id: notId, type }));

    setTimeout(() => {
      dispatch(removeNotification({ id: notId }));
    }, delay * 1000);
  }
}

export default slice.reducer