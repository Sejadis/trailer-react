import React, {useEffect, useState} from 'react'
import {deleteClub, fetchClubs} from "../../api";
import {clubsNavigationData} from "../../data";
import NavBar from "../common/NavBar";
import Club from "../club/Club";
import List from "../common/List";
import {Route, useParams} from 'react-router-dom'
import ClubCreateForm from "./ClubCreateForm";

const ClubsPage = () => {
    const [clubs, setClubs] = useState([])
    const [searchFilter, setSearchFilter] = useState("");
    const params = useParams()

    const getClubs = () => {
        fetchClubs().then(clubs => setClubs(clubs))
    }

    const handleChange = (event) => {
        setSearchFilter(event.target.value)
    }

    const getFilteredClubs = () => {
        const lowerCaseFilter = searchFilter.toLowerCase()
        //no filter
        if (lowerCaseFilter === undefined || lowerCaseFilter === "") {
            console.log(clubs)
            return clubs
        } else {
            const filteredClubs = clubs.filter((e => {
                return e.name.toLowerCase().includes(lowerCaseFilter)
            }))
            console.log(filteredClubs)
            return filteredClubs
        }
    }
    useEffect(getClubs, [])

    return (<>
            <NavBar data={clubsNavigationData}/>
            <Route exact path={"/clubs/create"} render={routeProps => <ClubCreateForm/>}/>
            <label style={{display:"flex", justifyContent: "space-around", padding: "5px"}}>
                Search:
                <input style={{width: "90%"}} type={"text"} onChange={handleChange} value={searchFilter}/>
            </label>
            {params.id !== undefined ? <br/> :
                clubs.length > 0 ?
                    <List data={getFilteredClubs()} component={Club} deleteFunction={deleteClub}/>
                    :
                    null
            }
        </>
    )
}

export default ClubsPage