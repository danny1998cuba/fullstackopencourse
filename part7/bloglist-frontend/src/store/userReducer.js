import { createSlice } from "@reduxjs/toolkit"
import { triggerNotificationHelper } from "./notificationReducer";
import loginService from "../services/login";
import usersService from "../services/users";
import { LOGGED_USER_LS_KEY } from "../lib/constants";

const slice = createSlice({
  name: "user",
  initialState: { logged: null, users: [] },
  reducers: {
    setUser(state, action) {
      return { ...state, logged: action.payload }
    },
    setUsers(state, action) {
      return { ...state, users: action.payload }
    }
  }
})

export const initializeUser = () => {
  return async (dispatch) => {
    const obj = localStorage.getItem(LOGGED_USER_LS_KEY);
    dispatch(setUser(obj ? JSON.parse(obj) : null));
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const res = await usersService.getAll()
    dispatch(setUsers(res))
  }
}

export const login = (credentials) => {
  return async (dispatch, getState) => {
    try {
      const user = await loginService.login(credentials);
      localStorage.setItem(LOGGED_USER_LS_KEY, JSON.stringify(user));
      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        triggerNotificationHelper("Wrong username or password", "danger"),
      );
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem(LOGGED_USER_LS_KEY);
    dispatch(setUser(null));
  }
}

export const { setUser, setUsers } = slice.actions
export default slice.reducer