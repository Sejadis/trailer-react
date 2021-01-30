import React from 'react'
import styles from '../../styles/Club.module.css'
import {useHistory} from "react-router-dom";

export default function Club(props) {
    const {id, name, events, trailers} = props.data
    const {deleteElement} = props
    const history = useHistory()

    return (
        <div className={styles.club}>
            <div className={styles.top}>

                <p>{name}</p>
            </div>
            <div className={styles.bottom}>
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
        </div>
    )
}