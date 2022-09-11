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
    default:
      return state;
  }
};

export const FullContextProvider = ({ children }) => {
  const { document } = useDocument("users/Zed");
  const { document: document2 } = useDocument("users/Elton360");
  const { document: document3 } = useDocument("users/HailyW");
  const { document: document4 } = useDocument("users/SuperMarvel");

  const [state, dispatch] = useReducer(authReducer, {
    user: "user",
    authIsReady: false,
  });

  //User document from firebase
  useEffect(() => {
    dispatch({
      type: "DOC_READY",
      payload: [document, document2, document3, document4],
    });
  }, [document, document2, document3, document4]);

  //Spotify data
  useEffect(() => {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=334&apikey=9cmxwQGcRnPOgJOl4E8LGMM5afGsguPA"
    )
      .then((response) => response.json())
      .then((events) =>
        dispatch({ type: "SOUTH_FL_TM", payload: events._embedded.events })
      );
  }, []);

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
