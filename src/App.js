//import './App.css';
import NavBar from "./components/common/NavBar";
import React, {createContext, useEffect, useState} from "react";
import ClubsPage from "./components/club/ClubsPage";
import HomePage from "./components/HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import EventsPage from "./components/event/EventsPage";
import ProfilePage from "./components/ProfilePage";
import {mainLoggedInData, mainLoggedOutData} from "./data";
import {fetchUsers} from "./api";
import TrailersPage from "./components/Trailer/TrailersPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Redirect from "react-router-dom/es/Redirect";

export const UserContext = createContext({user: undefined, getUsers: undefined})

function App() {
    const [user, setUser] = useState(undefined);
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        fetchUsers().then(users => setUsers(users))
    }
    useEffect(getUsers, [])

    const handleChange = event => {
        const user = users.find((u) => {
            const selectedId = parseInt(event.target.value)
            return u.id === selectedId
        })
        setUser(user)
    }
    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={{user, getUsers}}>
                    <header className="App-header">
                        <select name={"user"} onChange={handleChange}>
                            <option label={"Select a User"}/>
                            {users.map((user) => {
                                return <option key={user.id} label={user.username} value={user.id}/>
                            })}
                        </ select>
                        <NavBar className="navBar"
                                data={user == null ? mainLoggedOutData : mainLoggedInData /*mainNavigationData*/}/>
                    </header>
                    <main>
                        <Switch>
                            <Route exact path={"/"} component={HomePage}/>
                            {
                                user == null ?
                                    <>
                                        <Switch>
                                            <Route path={"/register"} component={RegisterPage}/>
                                            <Route path={"/login"} component={LoginPage}/>

                                            <Route path={"/"} render={() => <Redirect to="/login"/>}/>
                                        </Switch>
                                    </>
                                    :
                                    <>
                                        <Switch>
                                            <Route path={"/clubs"} component={ClubsPage}/>
                                            <Route path={"/trailers"} component={TrailersPage}/>
                                            <Route path={"/events"} component={EventsPage}/>
                                            <Route path={"/profile"} component={ProfilePage}/>
                                            <Route path={"/logout"}>
                                                {() => setUser(undefined)}
                                            </Route>
                                            <Route path={"/"} render={() => <Redirect to="/"/>}/>
                                        </Switch>
                                    </>
                            }
                        </Switch>
                    </main>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
