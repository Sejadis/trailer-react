import React, {useContext, useEffect, useState} from 'react';
import {fetchUser} from "../../api";
import {UserContext} from "../../App";


const EventDetail = (props) => {
    const {event, join,leave} = props
    const [usernames, setUsernames] = useState([]);
    const user = useContext(UserContext);

    const getUsers = () => {
        setUsernames([])
        event.users.forEach(user => {
            fetchUser(user).then(u => {
                setUsernames(prev => [...prev, u.username])
            })
        })
    }

    useEffect(getUsers, [event])
    return (
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <table>
                <thead>
                <tr>
                    <th>Participants</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <ol>
                            {usernames.map((name) => {
                                    return <li key={name}>{name}</li>
                                }
                            )}
                        </ol>
                    </td>
                </tr>
                </tbody>
            </table>
            {event.date && <p>{new Intl.DateTimeFormat("de-DE", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(Date.parse(event.date))}</p>}
            {user
            && (event.users.some(e => e === user.id) ?
                <button onClick={() => leave()}>Leave</button>
                :
                <button onClick={join}>Join</button>)
            }
        </div>
    );
};

export default EventDetail;
