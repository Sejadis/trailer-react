import React, {useEffect, useState} from 'react';
import {trailersNavigationData} from "../../data";
import NavBar from "../common/NavBar";
import {deleteTrailer, fetchTrailers, fetchTrailersForClub} from "../../api";
import List from "../common/List";
import {Route, useLocation} from "react-router-dom";
import {useHistory} from "react-router";
import Trailer from "./Trailer";
import TrailerCreateForm from "./TrailerCreateForm";

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const TrailersPage = ({location}) => {
    const [trailers, setTrailers] = useState([])
    const [searchFilter, setSearchFilter] = useState("");
    const history = useHistory()
    const query = useQuery()
    const clubId = query.get("club")
    const pathName = location.pathname

    const getTrailers = () => {
        if (clubId !== undefined && clubId !== null) {
            fetchTrailersForClub(clubId).then(
                trailers => setTrailers(trailers))
        } else {
            fetchTrailers().then(newTrailers => {
                console.log(newTrailers)
                setTrailers(newTrailers)
            })
        }
    }

    const handleChange = (event) => {
        setSearchFilter(event.target.value)
    }

    const handleClick = () => {
        setSearchFilter("")
        history.push("/trailers")
    }

    const getFilteredTrailers = () => {
        const lowerCaseFilter = searchFilter.toLowerCase()
        //no filter
        if (lowerCaseFilter === undefined || lowerCaseFilter === "") {
            console.log(trailers, trailers.length)
            return trailers
        } else {
            const filteredTrailers = trailers.filter((e => {
                const nameMatch = e.name != null ? e.name.toLowerCase().includes(lowerCaseFilter) : false
                const slotMatch = e.slots == lowerCaseFilter

                return nameMatch || slotMatch
                //||
                ////TODO club currently is only id so cant filter by name
                //e.club.toLowerCase().includes(lowerCaseFilter)
            }))
            console.log(filteredTrailers)
            return filteredTrailers
        }
    }

    const refresh = (resp) => {
        if (resp == null || resp === "") {
            getTrailers()
        } else {
            resp.json().then(data => {
                setTrailers(prev => {
                        return prev.map(e => e.id === data.id ? data : e)
                    }
                )
            })
        }
    }

    useEffect(getTrailers, [clubId,pathName])
    // useEffect(() => {
    //     console.log("Render with ", trailer)
    // })

    return <>
        <NavBar data={trailersNavigationData}/>
        <label>
            Search:
            <input type={"text"} onChange={handleChange} value={searchFilter}/>
        </label>
        <Route path={"/trailers/create"} render={renderProps => {
            return <TrailerCreateForm/>
        }

        }/>
        {trailers.length > 0 ?
            <List data={getFilteredTrailers()} component={Trailer} deleteFunction={deleteTrailer} refresh={refresh}/>
            :
            null}
        {clubId !== null || searchFilter != "" ?
            <button onClick={handleClick}>Show all</button>
            :
            null}
    </>
}

export default TrailersPage;