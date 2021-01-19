import {BASE_URL} from './constants'
//region template
const createTemplate = (url, data) => {
    const body = JSON
        .stringify(data)
    return fetch(BASE_URL + url, {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"},
        }
    )
        .then(resp => {
            return resp.json()
        })
        .catch(error => {
            console.log(error)
        })
}

const fetchTemplate = (url, id) => {
    const finalUrl = BASE_URL + url + (id !== undefined ? id : "")
    return fetch(finalUrl)
        .then(resp => resp.json())
}

const deleteTemplate = (url, id) => {
    if (id !== undefined) {
        //TODO return something empty
    }
    const finalUrl = BASE_URL + url + (id !== undefined ? id : "")
    return fetch(finalUrl,
        {method: 'DELETE'})
        .catch(error => console.log(error))
}

//endregion

//region clubs

export const fetchClubs = () => {
    return fetchTemplate("clubs")
}
export const fetchClub = (id) => {
    return fetchTemplate("clubs/", id)
}
export const deleteClub = (id) => {
    return deleteTemplate("clubs/", id)
}
export const createClub = (club) => {
    return createTemplate("clubs", club)
}
//endregion

//region events

export const fetchEvents = () => {
    return fetchTemplate("events")
}

export const fetchEvent = (id) => {
    return fetchTemplate("events/", id)
}

export const fetchEventsForClub = (clubId) => {
    return fetchTemplate("events?club=" + clubId)
}

export const deleteEvent = (id) => {
    return deleteTemplate("events/", id)
}

export const createEvent = (event) => {
    return createTemplate("events", event)
}

export const addUserToEvent = (eventId, userId, type) => {
const query = (type != null && type !== "") ? ("?type=" + type) : ""
    return fetch(BASE_URL + "events/" + eventId + "/users/" + userId + query, {
        method: "PUT"
    }).catch(error => console.log(error))
}

export const removeUserFromEvent = (eventId, userId, type) => {
    const query = (type != null && type !== "") ? ("?type=" + type) : ""
    return fetch(BASE_URL + "events/" + eventId + "/users/" + userId + query, {
        method: "DELETE"
    }).catch(error => console.log(error))
}
//endregion

//region trailers
export const fetchTrailers = () => {
    return fetchTemplate("trailers")
}

export const fetchTrailer = (id) => {
    return fetchTemplate("trailers/", id)
}

export const fetchTrailersForClub = (clubId) => {
    return fetchTemplate("trailers?club=" + clubId)
}

export const deleteTrailer = (id) => {
    return deleteTemplate("trailers/", id)
}

export const createTrailer = (trailer) => {
    return createTemplate("clubs/trailers", trailer)
}
//endregion

//region users

export const fetchUsers = () => {
    return fetchTemplate("users")
}
export const fetchUser = (id) => {
    return fetchTemplate("users/", id)
}
export const deleteUser = (id) => {
    return deleteTemplate("users/", id)
}
export const createUser = (user) => {
    return createTemplate("users", user)
}
//endregion
