import React, {useEffect, useState} from 'react';
import {fetchClub} from "../../api";
import styles from "../../Club.module.css";
import {Route} from "react-router-dom";
import CreateForm from "../CreateForm";

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

    const getDisplayName = (trailer) => {
        const slotsString = " (" + slots + " Slots)"
        if (name != null && name !== "") {
            return name + slotsString
        } else {
            return slotsString
        }
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p>{id}</p>
                <p>{name}</p>
                <p>{slots}</p>
                {club != null ? <p>{club.name}</p> : null}
                <p>{events.length + " Events"}</p>
                <button className={styles.actionButton} onClick={() => {
                    if(events.length > 0){
                        console.log("cascading trailer delete for events" + events)
                    }
                    deleteElement(id).then(() => refresh(null))
                }}>
                    Delete
                </button>
            </div>
            {/*{club && <p>Belongs to {club.name}</p>}*/}
            {/*{club && club.trailers && <ul>*/}
            {/*    {club.trailers.map(trailer => {*/}
            {/*        return <li key={trailer.id}>*/}
            {/*            <p>{getDisplayName(trailer)}</p>*/}
            {/*        </li>*/}
            {/*    })}*/}
            {/*</ul>}*/}
        </>
    )
}

export default Trailer
