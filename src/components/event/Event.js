import React, {useCallback, useContext, useEffect, useState} from 'react'
import styles from '../../Club.module.css'
import {addUserToEvent, fetchClub, fetchTrailers, removeUserFromEvent} from "../../api";
import EventDetail from "./EventDetail";
import {UserContext} from "../../App";
import {Link} from "react-router-dom";

export default React.memo(function Event(props) {
    const {id, name, club: clubId, users, trailers: eventTrailers} = props.data
    const {deleteElement, refresh} = props
    const [club, setClub] = useState({})
    const [slots, setSlots] = useState({open: 0, total: 0});
    const [showDetails, setShowDetails] = useState(false);
    const [trailers, setTrailers] = useState([]);
    const userContext = useContext(UserContext);
    const user = userContext.user
    const getClub = useCallback(() => {
            fetchClub(clubId).then(club => {
                setClub(club)
            })
        }
        , [clubId])
    const getTrailers = () => {
        fetchTrailers().then(trailers => {
            setTrailers(trailers)
        })
    }

    const addUser = (type) => {
        addUserToEvent(id, user.id, type).then(event => refresh(event))
    }
    const removeUser = (type) => {
        removeUserFromEvent(id, user.id, type).then(event => refresh(event))
    }
    const handleClick = () => {
        setShowDetails(prevState => !prevState)
    }
    useEffect(() => {
        getClub()
        getTrailers()
    }, [getClub]);

    useEffect(() => {
        const total = trailers.reduce((prev, curr) => {
            //check if the trailer is used for this event, if so add its slots otherwise ignore it (add 0)
            return (eventTrailers.some(et => et.trailer === curr.id) ? curr.slots : 0) + prev
        }, 0)
        const open = total - users.length
        setSlots({open, total})
    }, [trailers, eventTrailers, users])
    // useEffect(getTrailers, [])

    // useEffect(()=>{
    //     console.count("rerender event")
    // })
    const formatSlots = () => {
        let string = users.length + " / "
        let slots = trailers.reduce((prev, curr) => {
            //check if the trailer is used for this event, if so add its slots otherwise ignore it (add 0)
            return (eventTrailers.some(et => et.trailer === curr.id) ? curr.slots : 0) + prev
        }, 0)
        return string + slots
    }
    return (
        <>
            <div className={styles.club}>
                <p>{id} </p>
                <p>{name}</p>
                <Link to={"/events?club=" + club.id}>{club.name}</Link>
                <p>{users.length + " / " + slots.total}</p>
                <button className={styles.actionButton} onClick={handleClick}>
                    Details
                </button>
                <button className={styles.actionButton} onClick={() => {
                    deleteElement(id).then(() => refresh(""))
                }}>
                    Delete
                </button>
            </div>

            {showDetails && <><br/> <EventDetail event={props.data} join={addUser} leave={removeUser} openSlots={slots.open}/></>}
        </>
    )
})