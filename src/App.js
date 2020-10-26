//import './App.css';
import NavBar from "./components/common/NavBar";
import React from "react";
import ClubsPage from "./components/club/ClubsPage";
import HomePage from "./components/HomePage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import EventsPage from "./components/event/EventsPage";
import ProfilePage from "./components/ProfilePage";
import CreateForm from "./components/CreateForm";
import {mainNavigationData} from "./data";

function App() {
    return (
        <div className="App">
            <Router>
                <header className="App-header">
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
            </Router>
        </div>
    );
}

export default App;
