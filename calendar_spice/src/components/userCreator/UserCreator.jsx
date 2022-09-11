import React, { useRef, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const interests = [
  "3D printing",
  "Amateur radio",
  "Scrapbook",
  "Amateur radio",
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Computer programming",
  "Coffee roasting",
  "Lockpicking",
  "Machining",
  "Macrame",
  "Metalworking",
  "Magic",
  "Model building",
  "Listening to music",
  "Origami",
  "Painting",
  "Playing musical instruments",
  "Pet",
  "Stand-up comedy",
  "Sudoku",
  "Table tennis",
  "Taxidermy",
  "Video gaming",
  "Watching movies",
  "Web surfing",
  "Bodybuilding",
  "Brazilian jiu-jitsu",
  "Community",
  "Cycling",
  "Dowsing",
  "Driving",
  "Fishing",
  "Flag football",
  "Flying",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Larping",
  "Letterboxing",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Polo",
  "Rafting",
  "Rappelling",
  "Rock climbing",
  "Roller skating",
  "Rugby",
  "Running",
  "Sailing",
  "Taekwondo",
  "Tai chi",
  "Urban exploration",
  "Vacation",
  "Vehicle restoration",
  "Water sports",
];

function userCreator() {
  const { addDocument } = useFirestore("users");

  const fNameRef = useRef();
  const lNameRef = useRef();
  const userNameRef = useRef();
  const DOBref = useRef();
  const spotifyIDRef = useRef();
  const activitiesRef = useRef([]);
  activitiesRef.current = [];

  const submitHandler = (e) => {
    e.preventDefault();
    const ID = userNameRef?.current?.value || "test";
    const data = {
      fName: fNameRef.current.value,
      lName: lNameRef.current.value,
      userName: ID,
      DOB: new Date(DOBref.current.value),
      spotifyID: spotifyIDRef.current.value,
      activities: [],
    };
    activitiesRef.current.forEach((act) => {
      if (act.checked) data.activities.push(act.value);
    });
    addDocument("users", ID, data);
  };

  const addToRefs = (el) => {
    if (el && !activitiesRef.current.includes(el)) {
      activitiesRef.current.push(el);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input placeholder="FName" type="text" ref={fNameRef} />
      <br />
      <br />
      <input placeholder="LName" type="text" ref={lNameRef} />
      <br />
      <br />
      <input placeholder="UID" type="text" ref={userNameRef} />
      <br />
      <br />
      <input placeholder="DOB MM/DD/YEAR" type="text" ref={DOBref} />
      <br />
      <br />
      <input placeholder="spotifyUser" type="text" ref={spotifyIDRef} />
      <br />
      <br />
      <fieldset>
        {interests.map((int, i) => (
          <>
            <input
              type="checkbox"
              name={int}
              value={int}
              key={i}
              ref={addToRefs}
            />
            <label>{int}</label>
          </>
        ))}
      </fieldset>
      <button>SUBMIT</button>
    </form>
  );
}

export default userCreator;
