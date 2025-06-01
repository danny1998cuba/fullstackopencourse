import { createSlice } from "@reduxjs/toolkit"
import { triggerNotificationHelper } from "./notificationReducer";
import blogService from "../services/blogs";

const slice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateAction(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    createNew(state, action) {
      state.push(action.payload)
    },
    removeAction(state, action) {
      return state.filter(a => a.id !== action.payload.id)
    },
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const res = await blogService.getAll()
    dispatch(setBlogs(res))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch, getState) => {
    const user = getState().user?.logged

    if (user) {
      try {
        const res = await blogService.createBlog(newBlog, user.token);

        dispatch(createNew(res));
        dispatch(triggerNotificationHelper(`A new blog ${res.title} by ${res.author} added`, "success"));
      } catch (error) {
        dispatch(triggerNotificationHelper(error.message, "danger"));
      }
    }
  }
}

export const updateBlog = (id, newBlog) => {
  return async (dispatch) => {
    const res = await blogService.updateBlog(id, newBlog);
    dispatch(updateAction(res));
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const res = await blogService.comment(id, comment);
    dispatch(updateAction(res));
    dispatch(triggerNotificationHelper(`You have commented in ${res.title}`, "success"));
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const user = getState().user?.logged

    if (user) {
      await blogService.deleteBlog(id, user.token);
      dispatch(removeAction({ id }))
      dispatch(triggerNotificationHelper(`Blog entry removed`, "success"));
    }
  }
}

export const { setBlogs, updateAction, createNew, removeAction } = slice.actions
export default slice.reducer