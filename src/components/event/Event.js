import React, {useContext, useEffect, useState} from 'react'
import styles from '../../Club.module.css'
import {addUserToEvent, fetchClub, fetchTrailers, removeUserFromEvent} from "../../api";
import EventDetail from "./EventDetail";
import {UserContext} from "../../App";

export default function Event(props) {
    const {id, name, club: clubId, users} = props.data
    const {deleteElement, refresh} = props
    const [club, setClub] = useState({})
    const [showDetails, setShowDetails] = useState(false);
    const [trailers, setTrailers] = useState([]);
    const user = useContext(UserContext);
    const getClub = () => {
        fetchClub(clubId).then(club => {
            setClub(club)
        })
    }
    const getTrailers = () => {
        fetchTrailers().then(trailers => {
            setTrailers(trailers)
        })
    }

    const addUser = () => {
        addUserToEvent(id, user.id).then(refresh)
    }
    const removeUser = () => {
        removeUserFromEvent(id, user.id).then(refresh)
    }
    const handleClick = () => {
        setShowDetails(prevState => !prevState)
    }
    useEffect(getClub, [clubId]);
    useEffect(getTrailers, [])

    const formatSlots = () => {
        let string = users.length + " / "
        let slots = trailers.reduce((prev, curr) => {
            return curr.slots + prev
        }, 0)
        return string + slots
    }
    return (
        <>
            <div className={styles.club}>
                <p>{id} </p>
                <p>{name}</p>
                <p>{club.name}</p>
                <p>{formatSlots()}</p>
                <button className={styles.actionButton} onClick={handleClick}>
                    Details
                </button>
                <button className={styles.actionButton} onClick={() => {
                    deleteElement(id)
                }}>
                    Delete
                </button>
            </div>

            {showDetails && <><br/> <EventDetail event={props.data} join={addUser} leave={removeUser}/></>}
        </>
    )
}