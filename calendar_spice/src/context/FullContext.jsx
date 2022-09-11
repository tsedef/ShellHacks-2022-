import React from "react";
import { createContext, useReducer, useEffect } from "react";
import { useDocument } from "../hooks/useDocument";

export const FullContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "DOC_READY":
      return { ...state, user: action.payload };
    case "SOUTH_FL_TM":
      return { ...state, events: action.payload };
    case "YELP":
      return { ...state, locations: action.payload };
    case "ADD_TO_USER_EVERYDAYBLOCK":
      // return { 
      //   ...state, 
      //   userEverydayBlock:[action.item]  
      // };
      return { ...state, userEverydayBlock: action.payload };

        default:
      return state;
  }
};

export const FullContextProvider = ({ children }) => {
  const { document } = useDocument("users/{userID}");

  const [state, dispatch] = useReducer(authReducer, {
    user: "user",
    authIsReady: false,
    userEverydayBlock: [
      // {
      //   id: "1",
      //   title: "Sleep2",
      // },
    ],
  });

  //User document from firebase
  useEffect(() => {
    dispatch({ type: "DOC_READY", payload: document });
  }, [document]);

  //Ticket master South FL events
  useEffect(() => {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=334&apikey=9cmxwQGcRnPOgJOl4E8LGMM5afGsguPA"
    )
      .then((response) => response.json())
      .then((events) =>
        dispatch({ type: "SOUTH_FL_TM", payload: events._embedded.events })
      );
  }, []);

  useEffect(() => {
    //Yelp fetch API request
  }, []);

  return (
    <FullContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FullContext.Provider>
  );
};
