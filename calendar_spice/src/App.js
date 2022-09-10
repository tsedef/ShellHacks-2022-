import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import DateTimePicker from "react-datetime-picker";
import TimePicker from "react-time-picker";

const App = () => {
  const [weekendsVisible, toggleWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [dateTime, onDateTimeChange] = useState(new Date());
  const [time, onTimeChange] = useState("10:00");

  const handleWeekendsToggle = () => {
    toggleWeekendsVisible(!weekendsVisible);
  };
  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>

        <div className="Time-block-container">
          <h2>Time Blocks</h2>
          <div>
            <h3>Everyday</h3>
            <label>
              <input
                type="checkbox"
                // checked={}
                // onChange={}
              ></input>
              Sleep
              {/* <DateTimePicker
                onChange={onDateTimeChange}
                value={dateTime}
                calendarIcon={null}
                disableCalendar={true}
                disableClock={true}
              /> */}
              <TimePicker onChange={onTimeChange} value={time} />
            </label>
          </div>
          <div>
            <h3>Specific days</h3>
            <label>
              <input
                type="checkbox"
                // checked={}
                // onChange={}
              ></input>
              Sleep
              <DateTimePicker
                onChange={onTimeChange}
                value={dateTime}
                calendarIcon={null}
                disableCalendar={true}
                disableClock={true}
              />
            </label>
          </div>
        </div>

        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    var timeStartEvent;
    var timeEndEvent;

    calendarApi.unselect(); // clear date selection

    if(calendarApi.view.type === "dayGridMonth"){
      // console.log(`view currently:` , calendarApi.view.type)   
      if(title){
        timeStartEvent = prompt('If this event is time-specific, please enter its start time in the format hh:mm || If the event is all-day long, leave blank!')
        if(timeStartEvent) {
          timeEndEvent = prompt('Please enter its end time in the format hh:mm')
        } 
      }
      
      //time date format: 2015-03-25T12:00:00Z
      
      var actualEndStr = selectInfo.end //date object itself
      actualEndStr.setDate(actualEndStr.getDate() - 1) //initial selection of day. DEFAULT; Returns Date object
      actualEndStr = actualEndStr.toISOString().substring(0,10) //converts Date object to formatted string
      console.log(actualEndStr)
      if(timeStartEvent > timeEndEvent){ //end day changes because event passes midnight, therefore leading to the next day e.g.: 16:00 sept2 - 02:00 sept3
        actualEndStr = selectInfo.endStr //selectInfo.endStr; Library default value is next day
      }

      let startDateObject = new Date(selectInfo.startStr + "T" + timeStartEvent + ":00-04:00")
      let endDateObject = new Date(actualEndStr + "T" + timeEndEvent + ":00-04:00")

      if (title && timeStartEvent && timeEndEvent) {
        calendarApi.addEvent({
          id: createEventId(),
          title: title,
          start: startDateObject,
          end: endDateObject,
          allDay: false
        })
      }
      else if (title) { //all-day event. No initial or end time
        calendarApi.addEvent({
          id: createEventId(),
          title: title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }

    else if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title:title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    console.log((eventInfo.event))
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          // alternatively, use the `events` setting to fetch from a feed
          displayEventEnd={true}
          businessHours={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
};

export default App;
