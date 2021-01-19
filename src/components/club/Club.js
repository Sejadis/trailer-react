import React from 'react'
import styles from '../../Club.module.css'
import {useHistory} from "react-router-dom";

export default function Club(props) {
    const {id, name, events, trailers} = props.data
    const {deleteElement} = props
    const history = useHistory()

    return (
        <div className={styles.club}>
            <p>{id} </p>
            <p>{name}</p>
            <button className={styles.actionButton} disabled={events.length <= 0}
                    onClick={() => history.push("/events?club=" + id)}>
                Events
            </button>
            <button className={styles.actionButton} disabled={trailers.length <= 0}
                    onClick={() => history.push("/trailers?club=" + id)}>
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