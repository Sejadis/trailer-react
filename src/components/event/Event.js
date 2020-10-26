import React, {useEffect, useState} from 'react'
import styles from '../../Club.module.css'
import {fetchClub} from "../../api";
import EventDetail from "./EventDetail";

export default function Event(props) {
    const {id, name, club: clubId} = props.data
    const {deleteElement} = props
    const [club, setClub] = useState({})
    const [showDetails, setShowDetails] = useState(false);
    const getClub = () => {
        fetchClub(clubId).then(club => {
            setClub(club)
        })
    }
    const handleClick = () => {
        setShowDetails(!showDetails)
    }
    useEffect(() => {
        getClub()
    }, []);
    // console.log(props.data)
    return (
        <>
            <div className={styles.club}>
                <p>{id} </p>
                <p>{name}</p>
                <p>{club.name}</p>
                <button className={styles.actionButton} onClick={handleClick}>
                    Details
                </button>
                <button className={styles.actionButton} onClick={() => {
                    deleteElement(id)
                }}>
                    Delete
                </button>
            </div>

            {showDetails && <><br/> <EventDetail event={props.data}/></>}
        </>
    )
}