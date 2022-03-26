// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Dashboard.css'
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

const { useState, useEffect, Fragment } = React

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: blue[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

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

        <ThemeProvider theme={theme} >
            <div className="navigation">
                <div className="back" onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(newDate.getMonth() - 1)
                    setDate(newDate)
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        style={{ width: 'auto' }}
                    >
                        {MONTHS[date.getMonth() == 0 ? 11 : date.getMonth() - 1]}
                    </Button>
                </div>

                <div className="monthAndYear">
                    {MONTHS[date.getMonth()]} {date.getFullYear()}
                    <a onClick={() => setShowingEventForm({ visible: true })}>+</a>
                </div>

                <div className="forward" onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(newDate.getMonth() + 1)
                    setDate(newDate)
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        style={{ width: 'auto' }}
                    >
                        {MONTHS[date.getMonth() == 11 ? 0 : date.getMonth() + 1]}
                    </Button>
                </div>
            </div>

        </ThemeProvider>
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

            <button onClick={() => {
                setViewingEvent(null)
                setShowingEventForm({ visible: true, withEvent: event })
            }}>
                Change this event
            </button>

            <button className="red" onClick={() => deleteEvent(event)}>
                Delete this event
            </button>

            <a className="close" onClick={() => setViewingEvent(null)}>Back to calendar</a>
        </Modal>
    )
}

const EventForm = ({ setShowingEventForm, addEvent, editEvent, withEvent, setViewingEvent, preselectedDate }) => {
    const newEvent = withEvent || {}
    if (!withEvent && !!preselectedDate) {
        newEvent.dateFrom = dateToInputFormat(preselectedDate)
    }
    const [event, setEvent] = useState(newEvent);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    return (
        <Modal onClose={() => setShowingEventForm({ visible: false })} title={`${withEvent ? "Edit event" : "Adauga o programare noua"}`}>
            <div className="form">
                <label>Dati un nume evenimentului
                    <input type="text" placeholder="e.g: podcast LSAC" defaultValue={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
                </label>

                <label>De la
                    <input type="datetime-local" defaultValue={event.dateFrom || dateToInputFormat(preselectedDate)} onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })} />
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Date&Time picker"
                        value={startDate}
                        onChange={(val) => {
                            setStartDate(val);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

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
                    <textarea
                        placeholder="Oferă mai multe detalii despre programare"
                        defaultValue={event.meta}
                        onChange={(e) => setEvent({ ...event, meta: e.target.value })}
                    />
                </label>

                {withEvent ? (
                    <Fragment>
                        <button onClick={() => editEvent(event)}>Edit event</button>
                        <a className="close" onClick={() => {
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
                        <a className="close" onClick={() => setShowingEventForm({ visible: false })}>Cancel (go back to calendar)</a>
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
                            {date.date.getDate()}<a className="addEventOnDay" onClick={() => setShowingEventForm({ visible: true, preselectedDate: date.date })}>+</a>
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

export default function Dashboard(props) {
    const today = new Date();
    const drawerWidth = 220;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Rezervari
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemText primary="Profil" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Rezervari" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Administratori" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Delogare" />
                    </ListItem>
                </List>

            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Calendar
                    month={today.getMonth() + 1}
                    year={today.getFullYear()}
                    preloadedEvents={
                        [
                            {
                                id: 1,
                                name: "Holiday",
                                dateFrom: "2022-03-26T12:00",
                                dateTo: "2022-03-26T14:00",
                                meta: SAMPLE_META,
                                type: "Holiday"
                            }
                        ]
                    }
                />
            </Box>
        </Box>
    )
}

