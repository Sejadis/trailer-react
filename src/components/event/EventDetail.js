import React, {useContext, useEffect, useState} from 'react';
import {fetchUser} from "../../api";
import {UserContext} from "../../App";


const EventDetail = (props) => {
    const {event, join, leave, confirmTrailerCarrier, openSlots} = props
    const [users, setUsers] = useState([]);
    const userContext = useContext(UserContext);
    const user = userContext.user

    const getUsers = () => {
        setUsers([])
        let fetchingUsers = []
        event.users.forEach(user => {
            fetchingUsers.push(user)
            fetchUser(user).then(u => {
                setUsers(prev => [...prev, u])
            })
        })
        event.trailers.forEach(({bringUser, returnUser}) => {
            if (bringUser != null && !fetchingUsers.includes(bringUser)) {
                fetchingUsers.push(bringUser)
                fetchUser(bringUser).then(u => {
                    setUsers(prev => [...prev, u])
                })
            }
            if (returnUser != null && !fetchingUsers.includes(returnUser)) {
                fetchingUsers.push(returnUser)
                fetchUser(returnUser).then(u => {
                    setUsers(prev => [...prev, u])
                })
            }
        })
    }
    const bringState = () => {
        if (event.trailers.length > 0 && event.trailers[0].bringUser !== undefined) {
            const matchingUser = users.find(u => {
                return u.id === event.trailers[0].bringUser
            })
            if (matchingUser !== undefined) {
                return <>
                    <p>{matchingUser.username}</p>
                    {user && user.id == matchingUser.id ?
                        <button onClick={() => leave("bring")}>Leave</button>
                        :
                        null
                    }
                </>
            }
        }
        return <button onClick={() => join("bring")}>Confirm</button>
    }

    const returnState = () => {
        if (event.trailers.length > 0 && event.trailers[0].returnUser !== undefined) {
            const matchingUser = users.find(u => {
                return u.id === event.trailers[0].returnUser
            })
            if (matchingUser !== undefined) {
                return <>
                    <p>{matchingUser.username}</p>
                    {user && user.id == matchingUser.id ?
                        <button onClick={() => leave("return")}>Leave</button>
                        :
                        null
                    }
                </>
            }
        }
        return <button onClick={() => join("return")}>Confirm</button>
    }

    useEffect(getUsers, [event])

    const buttonStyle = {
        height: "50px",
        width: "50px"
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
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
                            {users.map((user) => {
                                    return event.users.includes(user.id) ?
                                        <li key={user.id}>{user.username}</li>
                                        :
                                        null
                                }
                            )}
                        </ol>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <p style={{backgroundColor: "#EEE"}}>Bring</p>
                {bringState()}
                <p style={{backgroundColor: "#EEE"}}>Return</p>
                {returnState()}
            </div>
            {event.date && <p>{new Intl.DateTimeFormat("de-DE", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(Date.parse(event.date))}</p>}
            {user
            && (event.users.some(e => e === user.id) ?
                <button style={{...buttonStyle, backgroundColor: "#c84646"}} onClick={() => leave()}>Leave</button>
                :
                (openSlots > 0 ?
                        <button style={{...buttonStyle, backgroundColor: "#5b7e5b"}} onClick={() => join()}>Join</button>
                        :
                        null
                ))
            }
        </div>
    );
};

export default EventDetail;
