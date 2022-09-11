import React from "react";
import { useFullContext } from "./hooks/useFullContext";
import {
  doc1top10,
  doc2top10,
  doc3top10,
  doc4top10,
} from "./context/DocumentSpotifyData";
function Test() {
  // const { events, authIsReady } = useFullContext();
  const { user } = useFullContext();

  console.log(user.interests);

  const { events } = useFullContext();

  console.log(events);

  console.log(`doc1top10:`, doc1top10);
  // console.log(`doc2top10:`, doc2top10);
  // console.log(`doc3top10:`, doc3top10);
  // console.log(`doc4top10:`, doc4top10);
  return <></>;

  //user.interests + yelp             { 2 diff types of
  //spotify data + ticketmaster       { event automation
}

export default Test;
