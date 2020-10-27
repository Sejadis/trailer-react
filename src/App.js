//import './App.css';
import NavBar from "./components/common/NavBar";
import React, {createContext, useEffect, useState} from "react";
import ClubsPage from "./components/club/ClubsPage";
import HomePage from "./components/HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import EventsPage from "./components/event/EventsPage";
import ProfilePage from "./components/ProfilePage";
import CreateForm from "./components/CreateForm";
import {mainNavigationData} from "./data";
import {fetchUsers} from "./api";

export const UserContext = createContext({user: undefined})

function App() {
    const [user, setUser] = useState(undefined);
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        fetchUsers().then(users => setUsers(users))
    }
    useEffect(getUsers,[])

    const handleChange = event => {
        const user = users.find((u) => {
            const selectedId = parseInt(event.target.value)
            return u.id === selectedId
        })
        console.log("changing user to " + user)
        setUser(user)
    }
    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={user}>
                    <header className="App-header">
                        <select name={"user"} onChange={handleChange}>
                            <option label={"Select a User"}/>
                            {users.map((user) => {
                                return <option key={user.id} label={user.username} value={user.id}/>
                            })}
                        </ select>
                        <NavBar className="navBar" data={mainNavigationData}/>
                        <Switch>
                            <Route exact path={"/"}>
                                <HomePage/>
                            </Route>
                            <Route path={"/clubs"}>
                                <ClubsPage/>
                            </Route>
                            <Route exact path={"/events/create"}
                                   render={routeProps => <CreateForm {...routeProps} type={"Event"}/>}/>
                            <Route path={"/events"}>
                                <EventsPage/>
                            </Route>
                            <Route path={"/profile"}>
                                <ProfilePage/>
                            </Route>
                        </Switch>
                    </header>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
