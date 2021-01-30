import React, {useEffect, useState} from 'react';
import {fetchClub} from "../../api";
import styles from "../../styles/Trailer.Module.css";

const Trailer = (props) => {
    const {id, slots, name, club: clubId, events} = props.data
    const {deleteElement, refresh} = props
    const [club, setClub] = useState(undefined)

    const getClub = () => {
        if (clubId !== undefined) {
            fetchClub(clubId).then(club => {
                setClub(club)
            })
        } else {
            setClub(undefined)
        }
    }

    useEffect(getClub, [clubId])

    return (
        <div className={styles.trailer}>
            <div className={styles.top}>
                <p>{name}</p>
                <p>{slots} Slots</p>
            </div>
            <div className={styles.bottom}>
                {club != null ? <p>{club.name}</p> : null}
                <p>{events.length + " Events"}</p>
                <button className={styles.actionButton} onClick={() => {
                    if (events.length > 0) {
                        console.log("cascading trailer delete for events" + events)
                    }
                    deleteElement(id).then(() => refresh(null))
                }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Trailer
