import {BASE_URL} from './constants'

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
            console.log(resp.ok)
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


// export const fetchClubs = async () => {
//     return fetch(BASE_URL + "clubs")
//         .then(resp => resp.json())
// }
// export const fetchClub = async (id) => {
//     return fetch(BASE_URL + "clubs/" + id)
//         .then(resp => resp.json())
// }
// export const deleteClub = (id) => {
//     return fetch(BASE_URL + "clubs/" + id,
//         {method: 'DELETE'})
//         .catch(error => console.log(error))
// }
// export const createClub = name => {
//     return fetch(BASE_URL + "clubs", {
//             method: 'POST',
//             body: name
//         }
//     )
//         .then(resp => {
//             resp.json()
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

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

//////////////////////////////////////////////////////////////////////////////

// export const fetchEvents = async () => {
//     return fetch(BASE_URL + "events")
//         .then(resp => resp.json())
// }
// export const fetchEvent = async (id) => {
//     return fetch(BASE_URL + "events/" + id)
//         .then(resp => resp.json())
// }
// export const deleteEvent = (id) => {
//     return fetch(BASE_URL + "events/" + id,
//         {method: 'DELETE'})
//         .catch(error => console.log(error))
// }
// export const createEvent = (event) => {
//     console.log(event)
//     const body = JSON
//         .stringify(event)
//     return fetch(BASE_URL + "events", {
//             method: 'POST',
//             body: body,
//             headers: {"Content-Type": "application/json"},
//         }
//     )
//         .then(resp => {
//             console.log(resp.ok)
//             return resp.json()
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

export const fetchEvents = () => {
    return fetchTemplate("events")
}

export const fetchEvent = (id) => {
    return fetchTemplate("events/", id)
}

export const deleteEvent = (id) => {
    return deleteTemplate("events/", id)
}

export const createEvent = (event) => {
    return createTemplate("events", event)
}
//////////////////////////////////////////////////////////////////////////////

// export const fetchTrailers = async () => {
//     return fetch(BASE_URL + "trailers")
//         .then(resp => resp.json())
// }
// export const fetchTrailer = async (id) => {
//     return fetch(BASE_URL + "trailers/" + id)
//         .then(resp => resp.json())
// }
// export const deleteTrailer = (id) => {
//     return fetch(BASE_URL + "trailers/" + id,
//         {method: 'DELETE'})
//         .catch(error => console.log(error))
// }
// export const createTrailer = (trailer) => {
//     console.log(trailer)
//     const body = JSON
//         .stringify(trailer)
//     return fetch(BASE_URL + "clubs/trailers", {
//             method: 'POST',
//             body: body,
//             headers: {"Content-Type": "application/json"},
//         }
//     )
//         .then(resp => {
//             console.log(resp.ok)
//             return resp.json()
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }

export const fetchTrailers = () => {
    return fetchTemplate("trailers")
}

export const fetchTrailer = (id) => {
    return fetchTemplate("trailers/", id)
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
export const createUser = (club) => {
    return createTemplate("users", club)
}
//endregion
