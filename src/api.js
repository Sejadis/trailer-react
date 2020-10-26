import {BASE_URL} from './constants'

export const fetchClubs = async () => {
    return fetch(BASE_URL + "clubs")
        .then(resp => resp.json())
}
export const fetchClub = async (id) => {
    return fetch(BASE_URL + "clubs/" + id)
        .then(resp => resp.json())
}
export const deleteClub = (id) => {
    return fetch(BASE_URL + "clubs/" + id,
        {method: 'DELETE'})
        .catch(error => console.log(error))
}
export const createClub = name => {
    return fetch(BASE_URL + "clubs", {
            method: 'POST',
            body: name
        }
    )
        .then(resp => {
            resp.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export const fetchEvents = async () => {
    return fetch(BASE_URL + "events")
        .then(resp => resp.json())
}
export const fetchEvent = async (id) => {
    return fetch(BASE_URL + "events/" + id)
        .then(resp => resp.json())
}
export const deleteEvent = (id) => {
    return fetch(BASE_URL + "events/" + id,
        {method: 'DELETE'})
        .catch(error => console.log(error))
}
export const createEvent = (event) => {
    console.log(event)
    const body = JSON
        .stringify(event)
    return fetch(BASE_URL + "events", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"},
        }
    )
        .then(resp => {
            console.log(resp.ok)
            return resp.json()
        })
        .catch(error => {
            console.log(error)
        })
}