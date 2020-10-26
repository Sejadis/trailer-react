import React, {useEffect, useState} from 'react'
import {deleteClub, fetchClubs} from "../../api";
import {clubsNavigationData} from "../../data";
import NavBar from "../NavBar";
import Club from "../club/Club";
import List from "../common/List";
import {Route, Switch, useParams} from 'react-router-dom'
import CreateForm from "../CreateForm";

const ClubsPage = () => {
    const [clubs, setClubs] = useState([])
    const params = useParams()
    const getClubs = () => {
        fetchClubs().then(clubs => setClubs(clubs))
    }
    useEffect(() => {
        getClubs()
    }, [])

    return (<>
            <NavBar data={clubsNavigationData}/>
            <Route exact path={"/clubs/create"} render={routeProps => <CreateForm {...routeProps} type={"Club"}/>}/>
            <Route path={"/clubs/trailer/:id?"}>
                <h1>test</h1>
            </Route>
            {params.id !== undefined ? <br/> :
                clubs.length > 0 ?
                    <List data={clubs} component={Club} deleteFunction={deleteClub}/>
                    :
                    null
            }
        </>
    )
}

export default ClubsPage