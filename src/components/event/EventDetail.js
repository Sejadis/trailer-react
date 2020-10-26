import React from 'react';

const EventDetail = (props) => {
    const {event} = props
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
                            {event.users.map((user) =>
                                <li key={user.id} value={user.name}/>
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
        </div>
    );
};

export default EventDetail;
