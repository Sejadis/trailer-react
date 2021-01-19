import React, {useEffect, useState} from 'react';
import {eventsNavigationData} from "../../data";
import NavBar from "../common/NavBar";
import {deleteEvent, fetchEvents, fetchEventsForClub} from "../../api";
import List from "../common/List";
import Event from "../event/Event"
import {Route, useLocation} from "react-router-dom";
import {useHistory} from "react-router";
import CreateForm from "../CreateForm";

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const EventsPage = ({location}) => {
    const [events, setEvents] = useState([])
    const [searchFilter, setSearchFilter] = useState("");
    const query = useQuery()
    const clubId = query.get("club")
    const history = useHistory()
    const pathName = location.pathname

    const getEvents = () => {
        if (clubId !== undefined && clubId !== null) {
            fetchEventsForClub(clubId).then(
                events => setEvents(events))
        } else {
            fetchEvents().then(newEvents => setEvents(newEvents))
        }
    }
    const handleChange = (event) => {
        setSearchFilter(event.target.value)
    }

    const handleClick = () => {
        history.push("/events")
    }

    const getFilteredEvents = () => {
        const lowerCaseFilter = searchFilter.toLowerCase()
        //no filter
        if (lowerCaseFilter === undefined || lowerCaseFilter === "") {
            console.log(events)
            return events
        } else {
            const filteredEvents = events.filter((e => {
                return e.name.toLowerCase().includes(lowerCaseFilter)
                //||
                ////TODO club currently is only id so cant filter by name
                //e.club.toLowerCase().includes(lowerCaseFilter)
            }))
            console.log(filteredEvents)
            return filteredEvents
        }
    }

    const refresh = (resp) => {
        if (resp == null || resp === "") {
            getEvents()
        } else {
            resp.json().then(data => {
                setEvents(prev => {
                        return prev.map(e => e.id === data.id ? data : e)
                    }
                )
            })
        }
    }

    useEffect(getEvents, [clubId, pathName])
    // useEffect(() => {
    //     console.log("Render with ", events)
    // })

    return <>
        <NavBar data={eventsNavigationData}/>
        <Route exact path={"/events/create"} render={routeProps => <CreateForm {...routeProps} type={"Event"}/>}/>
        <label>
            Search:
            <input type={"text"} onChange={handleChange} value={searchFilter}/>
        </label>
        {events.length > 0 ?
            <List data={getFilteredEvents()} component={Event} deleteFunction={deleteEvent} refresh={refresh}/>
            :
            null}
        {clubId !== null ?
            <button onClick={handleClick}>Show all</button>
            :
            null}
    </>
}

export default EventsPage;