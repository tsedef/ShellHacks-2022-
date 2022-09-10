import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import Test from "./Test";

let timeStartEvent;
let timeEndEvent;

export default class DemoApp extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    return (
      <div className="demo-app">
        {this.renderSidebar()}
        <div className="demo-app-main">
          <Test />
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              momentPlugin,
            ]}
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
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
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
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    var timeStartEvent = selectInfo.startStr;
    var timeEndEvent = null;

    calendarApi.unselect(); // clear date selection
    if (title) {
      timeStartEvent = prompt(
        "If this event is time-specific, please enter its start time in the format hh:mm"
      );
      if (timeStartEvent) {
        timeEndEvent = prompt(
          "Please enter its end time in the format hh:mm. If the event is all-day long, leave blank"
        );
      }
    }

    //time date format: 2015-03-25T12:00:00Z
    let start_date_str = selectInfo.startStr + "T:" + timeStartEvent + ":00";
    let end_date_str = selectInfo.endStr + "T:" + timeEndEvent + ":00";

    let startDateObject = new Date(
      selectInfo.startStr + "T" + timeStartEvent + ":00-04:00"
    );
    let endDateObject = new Date(
      selectInfo.endStr + "T" + timeEndEvent + ":00-04:00"
    );

    console.log(startDateObject);
    console.log(endDateObject);

    if (title && timeStartEvent && timeEndEvent) {
      calendarApi.addEvent({
        id: createEventId(),
        title: title,
        start: startDateObject,
        end: endDateObject,
        allDay: false,
      });
    } else if (title && timeStartEvent) {
      calendarApi.addEvent({
        id: createEventId(),
        title: title,
        start: startDateObject,
        end: selectInfo.endStr,
        allDay: true,
      });
    } else if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      console.log(selectInfo.startStr);
      console.log(selectInfo.endStr);
    }
  };

  handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  console.log(eventInfo.event);
  console.log(eventInfo.timeText);
  return (
    <>
      <b>{eventInfo.timeText + "-" + eventInfo.timeText.endStr}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
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
}
