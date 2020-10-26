import React from 'react'
import styles from '../../Club.module.css'
import {Link, useHistory} from "react-router-dom";

export default function Club(props) {
    const {id, name, events, trailers} = props.data
    // const events = props.data.events
    const {deleteElement} = props
    console.log(props.data)
    const history = useHistory()
    const handleClick = () => {

    }

    return (
        <div className={styles.club}>
            <p>{id} </p>
            <p>{name}</p>
            <button className={styles.actionButton} disabled={events.length > 0 ? false : true}
                    onClick={() => history.push("/events/" + id)}>
                Events
            </button>
            <button className={styles.actionButton} disabled={trailers.length > 0 ? false : true}
                    onClick={() => history.push("/clubs/trailer/" + id)}>
                Trailer
            </button>
            <button className={styles.actionButton} onClick={() => {
                deleteElement(id)
            }}>
                Delete
            </button>
        </div>
    )
}