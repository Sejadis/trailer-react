import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchClub} from "../api";

/** @namespace trailer.slots **/
const Trailer = () => {
    const [club, setClub] = useState(undefined)
    const params = useParams()

    const getClub = () => {
        if (params.id !== undefined) {
            fetchClub(params.id).then(club => {
                setClub(club)
            })
        }
        else {
            setClub(undefined)
        }
    }

    useEffect(getClub, [params.id])

    return (
        <>
            {club && <p>Belongs to {club.name}</p>}
            {club && club.trailers && <ul>
                {club.trailers.map(trailer => {
                    return <li key={trailer.id}>
                        <p>{trailer.slots + " Slots"}</p>
                    </li>
                })}
            </ul>}
        </>
    )
}

export default Trailer
