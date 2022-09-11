import React from 'react'
import TimePicker from "react-time-picker";
import { useFullContext } from "../hooks/useFullContext";



const DailyActivity = () => {
    const { dispatch, userEverydayBlock } = useFullContext();

    const addToState = (e)=>{
        e.preventDefault()
        dispatch({
            type: "ADD_TO_USER_EVERYDAYBLOCK",
            payload: {
              id: "2",
              title: "sleep-test",
            },
          });
          console.log(userEverydayBlock);
    }
  return (
    <form onSubmit={addToState}>
        <input type="text" />
        <TimePicker
                disableClock={true}
                clearIcon = {null}/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default DailyActivity