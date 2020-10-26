import React, {useEffect, useState} from 'react';
import {eventsNavigationData} from "../../data";
import NavBar from "../NavBar";
import {deleteEvent, fetchEvents} from "../../api";
import List from "../common/List";
import Event from "../event/Event"

const EventsPage = () => {
    const [events, setEvents] = useState([])
    const [showDetailsFor, setShowDetailsFor] = useState(undefined);
    const getEvents = () => {
        fetchEvents().then(events => setEvents(events))
    }
    useEffect(() => {
        getEvents()
    }, [])

    return (<>
            <NavBar data={eventsNavigationData}/>
            {events.length > 0 ?
                <List data={events} component={Event} deleteFunction={deleteEvent}/>
                :
                null}
        </>
    )
}

export default EventsPage;