import React, { createContext, useContext, useReducer } from "react";
import { getId } from "../../../redux-anecdotes/src/reducers/anecdoteReducer";

const initialState = { text: null, id: 0 };

const NotificationContext = createContext({
  notification: initialState,
  triggerNotificationHelper: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "REMOVE":
      if (action.payload.id === state.id) {
        return initialState;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

// eslint-disable-next-line react/prop-types
export const NotificationsProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState);

  const triggerNotificationHelper = (text, delay = 5) => {
    const notId = getId();
    dispatch({ type: "ADD", payload: { text, id: notId } });

    setTimeout(() => {
      dispatch({ type: "REMOVE", payload: { id: notId } });
    }, delay * 1000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, triggerNotificationHelper }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
