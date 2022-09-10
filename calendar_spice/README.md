# ShellHacks-2022-
calendar based challenge solution
Bloomberg & State Farm - depression take. lack of social life; zoomer generation. affects not only local communities
Assurant - interconnects physical virual world by providing a tool that links the two

use cases:
* : MAYBES
!: IMPORTANT

1) Import calendar from apple/google/outlook *
2) manual insertion times/dates for events and schedule !
3) pop-up suggestions of events: MAYBE* yes or no to said suggestions
	a) shows up in different color; limited amount of options
4) artist concert event suggestions based on spotify API data & ticketmaster *
5) social panel connection to friends calendars. Link the available times and suggest event.(double overlap for concert/interests?) !
6) user tags(interests) to match correlated events !
7) gather events from yelp data !
8) user tickboxes: bedtime, budget ($$), mile radius (local)



# FullCalendar React Example Project

For complete instructions on how to initialize your build system, see the [FullCalendar React Docs &raquo;](https://fullcalendar.io/docs/react)

**About this example:** the state for events is owned by the FullCalendar instance and then emitted via `eventsSet` to be used elsewhere in the app. This is easier than owning the state in a parent component because FullCalendar can take care of requesting, parsing, and mutating event data instead of your reducer. However, this technique will only work when a FullCalendar component is rendered. If you need access to your event data when a FullCalendar component is NOT rendered, please take a look at the [React+Redux example &raquo;](../react-redux)


## Installation

```bash
git clone https://github.com/fullcalendar/fullcalendar-example-projects.git
cd fullcalendar-example-projects/react
npm install
```


## Build Commands

```bash
npm run start # builds and opens a web browser

# other commands:
npm run build # builds files into dist/ directory
npm run watch # same as build, but watches for changes
npm run clean # start fresh
```
