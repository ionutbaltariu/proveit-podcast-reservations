// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import './Dashboard.css'
const { useState, useEffect, Fragment } = React

// Some config for convenience
const MOCK_LOADING_TIME = 1000
const SAMPLE_META = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

// Utilities/helpers
const MONTHS = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie"
]

const DAYS_SHORT = ["Lu", "Ma", "Mie", "Jo", "Vi", "Sa", "Du"]

const toStartOfDay = (date) => {
  const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)
  return newDate
}

const pad = (input) => {
  return input < 10 ? "0" + input : input
}

const dateToInputFormat = (date) => {
  if (!date) {
    return null
  }

  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`
}

const parseEvents = (events) => {
  return events.map(event => {
    const from = new Date(event.dateFrom)
    const to = new Date(event.dateTo)

    return {
      ...event,
      from,
      to
    }
  })
}

const findEventsForDate = (events, date) => {
  const dateTime = date.getTime()

  return events.filter(event => {
    const eventFromTime = toStartOfDay(event.from).getTime()
    const eventToTime = toStartOfDay(event.to).getTime()

    return (dateTime >= eventFromTime && dateTime <= eventToTime)
  })
}

// Top bar, contains the month/year combo as well as back/forward links
const Navigation = ({ date, setDate, setShowingEventForm }) => {
  return (
    <div className="navigation">
      <div className="back" onClick={() => {
        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() - 1)
        setDate(newDate)
      }}>
        {"<-"} {MONTHS[date.getMonth() == 0 ? 11 : date.getMonth() - 1]}
      </div>

      <div className="monthAndYear">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
        <a href="javascript:;" onClick={() => setShowingEventForm({ visible: true })}>+</a>
      </div>

      <div className="forward" onClick={() => {
        const newDate = new Date(date)
        newDate.setMonth(newDate.getMonth() + 1)
        setDate(newDate)
      }}>
        {MONTHS[date.getMonth() == 11 ? 0 : date.getMonth() + 1]} {"->"}
      </div>
    </div>
  )
}


const DayLabels = () => {
  return DAYS_SHORT.map((dayLabel, index) => {
    return <div className="dayLabel cell" key={index}>{dayLabel}</div>
  })
}

const MiniEvent = ({ event, setViewingEvent }) => {
  return (
    <div
      className={`miniEvent ${event.type ? event.type.toLowerCase() : "standard"}`}
      onClick={() => setViewingEvent(event)}>


      {event.name}
    </div>
  )
}

const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent }) => {
  return (
    <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.type})`} className="eventModal">
      <p>From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b></p>
      <p>{event.meta}</p>

      <button href="javascript:;" onClick={() => {
        setViewingEvent(null)
        setShowingEventForm({ visible: true, withEvent: event })
      }}>
        Change this event
      </button>

      <button className="red" href="javascript:;" onClick={() => deleteEvent(event)}>
        Delete this event
      </button>

      <a className="close" href="javascript:;" onClick={() => setViewingEvent(null)}>Back to calendar</a>
    </Modal>
  )
}

const EventForm = ({ setShowingEventForm, addEvent, editEvent, withEvent, setViewingEvent, preselectedDate }) => {
  const newEvent = withEvent || {}
  if (!withEvent && !!preselectedDate) {
    newEvent.dateFrom = dateToInputFormat(preselectedDate)
  }
  const [event, setEvent] = useState(newEvent)

  return (
    <Modal onClose={() => setShowingEventForm({ visible: false })} title={`${withEvent ? "Edit event" : "Adauga o programare noua"}`}>
      <div className="form">
        <label>Dati un nume evenimentului
          <input type="text" placeholder="e.g: podcast LSAC" defaultValue={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
        </label>

        <label>De la
          <input type="datetime-local" defaultValue={event.dateFrom || dateToInputFormat(preselectedDate)} onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })} />
        </label>

        <label>Pana la
          <input type="datetime-local" defaultValue={event.dateTo} onChange={(e) => setEvent({ ...event, dateTo: e.target.value })} />
        </label>

        <label>Tipul programarii
          <select value={event.type ? event.type.toLowerCase() : "standard"} onChange={(e) => setEvent({ ...event, type: e.target.value })}>
            <option value="standard">Rezervare</option>
            <option value="standard">Mentenanta</option>
          </select>
        </label>

        <label>Descriere
          <input
            type="text"
            placeholder="Ofera mai multe detalii despre programare"
            defaultValue={event.meta}
            onChange={(e) => setEvent({ ...event, meta: e.target.value })}
          />
        </label>

        {withEvent ? (
          <Fragment>
            <button onClick={() => editEvent(event)}>Edit event</button>
            <a className="close" href="javascript:;" onClick={() => {
              setShowingEventForm({ visible: false })
              setViewingEvent(event)
            }
            }>
              Cancel (go back to event view)
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <button onClick={() => addEvent(event)}>Adauga</button>
            <a className="close" href="javascript:;" onClick={() => setShowingEventForm({ visible: false })}>Cancel (go back to calendar)</a>
          </Fragment>
        )}
      </div>
    </Modal>
  )
}

// Generic component - modal to present children within
const Modal = ({ children, onClose, title, className }) => {
  return (
    <Fragment>
      <div className="overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <h3>{title}</h3>
        <div className="inner">
          {children}
        </div>
      </div>
    </Fragment>
  )
}

// Generic component - a nicely animated loading spinner
const Loader = () => {
  return (
    <Fragment>
      <div className="overlay" />
      <div className="loader">
        <div className="lds-roller">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
    </Fragment>
  )
}

const Grid = ({ date, events, setViewingEvent, setShowingEventForm, actualDate }) => {
  const ROWS_COUNT = 6
  const currentDate = toStartOfDay(new Date())

  const startingDate = new Date(date.getFullYear(), date.getMonth(), 1)
  startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1))

  const dates = []
  for (let i = 0; i < (ROWS_COUNT * 7); i++) {
    const date = new Date(startingDate)
    dates.push({ date, events: findEventsForDate(events, date) })
    startingDate.setDate(startingDate.getDate() + 1)
  }

  return (
    <Fragment>
      {dates.map((date, index) => {
        return (
          <div
            key={index}
            className={`cell ${date.date.getTime() == currentDate.getTime() ? "current" : ""} ${date.date.getMonth() != actualDate.getMonth() ? "otherMonth" : ""}`
            }>
            <div className="date">
              {date.date.getDate()}<a href="javascript:;" className="addEventOnDay" onClick={() => setShowingEventForm({ visible: true, preselectedDate: date.date })}>+</a>
            </div>
            {date.events.map((event, index) =>
              <MiniEvent key={index} event={event} setViewingEvent={setViewingEvent} />
            )}
          </div>
        )
      })}
    </Fragment>
  )
}

// The "main" component, our actual calendar
const Calendar = ({ month, year, preloadedEvents = [] }) => {

  const selectedDate = new Date(year, month - 1)

  const [date, setDate] = useState(selectedDate)
  const [viewingEvent, setViewingEvent] = useState(false)
  const [showingEventForm, setShowingEventForm] = useState({ visible: false })
  const [isLoading, setIsLoading] = useState(false)

  const parsedEvents = parseEvents(preloadedEvents)
  const [events, setEvents] = useState(parsedEvents)

  useEffect(() => {
    console.log("Date has changed... Let's load some fresh data")
  }, [date])

  const addEvent = (event) => {
    setIsLoading(true)
    setShowingEventForm({ visible: false })

    setTimeout(() => {
      const parsedEvents = parseEvents([event])

      const updatedEvents = [...events]
      updatedEvents.push(parsedEvents[0])

      setEvents(updatedEvents)
      setIsLoading(false)
      // showFeedback({ message: "Event created successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  const editEvent = (event) => {
    setIsLoading(true)
    setShowingEventForm({ visible: false })

    setTimeout(() => {
      const parsedEvent = parseEvents([event])

      const updatedEvents = [...events].map(updatedEvent => {
        return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent
      })

      setEvents(updatedEvents)
      setIsLoading(false)
      // showFeedback({ message: "Event edited successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  const deleteEvent = (event) => {
    setIsLoading(true)
    setViewingEvent(null)

    setTimeout(() => {
      const updatedEvents = [...events].filter(finalEvent => finalEvent.id != event.id)

      setEvents(updatedEvents)
      setIsLoading(false)
      // showFeedback({ message: "Event deleted successfully", type: "success" })
    }, MOCK_LOADING_TIME)
  }

  return (
    <div className="calendar">
      {isLoading && <Loader />}

      <Navigation
        date={date}
        setDate={setDate}
        setShowingEventForm={setShowingEventForm}
      />

      <DayLabels />

      <Grid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm}
        setViewingEvent={setViewingEvent}
        actualDate={date}
      />

      {viewingEvent &&
        <Event
          event={viewingEvent}
          setShowingEventForm={setShowingEventForm}
          setViewingEvent={setViewingEvent}
          deleteEvent={deleteEvent}
        />
      }

      {showingEventForm && showingEventForm.visible &&
        <EventForm
          withEvent={showingEventForm.withEvent}
          preselectedDate={showingEventForm.preselectedDate}
          setShowingEventForm={setShowingEventForm}
          addEvent={addEvent}
          editEvent={editEvent}
          setViewingEvent={setViewingEvent}
        />
      }
    </div>
  )
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Rezervare'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Calendar
            month={10}
            year={2021}
            preloadedEvents={
              [{
                id: 1,
                name: "Holiday",
                dateFrom: "2021-09-29T12:00",
                dateTo: "2021-10-03T08:45",
                meta: SAMPLE_META,
                type: "Holiday"
              }
              ]
            }
          />
        </main>
      </div>
    </Box>
  )
}