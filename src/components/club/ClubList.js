import React from "react";
import Club from "./Club";

export default function ClubList(props) {

    return <ul>
        {props.clubs.map(club => {
            return <Club key={club.id} club={club} deleteClub={props.deleteClub} />
        })}
    </ul>;
}