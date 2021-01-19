import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {createClub, createEvent, createUser, fetchClubs, fetchTrailers} from "../api";
import {UserContext} from "../App";

const CreateForm = props => {
        const [formData, setFormData] = useState(
            {
                name: "",
                date: undefined,
                club: undefined,
                trailer: undefined,
                password: ""
            });
        const [formState, setFormState] = useState("");
        const [clubs, setClubs] = useState([]);
        const [trailers, setTrailers] = useState([]);
        const userContext = useContext(UserContext);

        const {history} = props

        const getClubs = () => {
            fetchClubs().then
            (clubs => setClubs(clubs))
        }

        const getTrailers = () => {
            fetchTrailers().then
            (trailers => setTrailers(trailers))
        }
        useEffect(() => {
            if (props.type === "Event") {
                getClubs()
                getTrailers()
            }
        }, [props.type]);

        const handleChange = event => {
            const {name, value} = event.target
            setFormData({...formData, [name]: value})
        }

        const handleSubmit = (event) => {
            event.preventDefault()
            switch (props.type) {
                case "Club":
                    setFormState("Creating new club...")
                    createClub(formData).then(() =>
                        history.push("/clubs")
                    )
                    break
                case "Event":
                    setFormState("Creating new event...")
                    createEvent(formData)
                        .then(() =>
                            history.push("/events"))
                    break
                case "User":
                    setFormState("Creating new user...")
                    createUser(formData).then(() => {
                            userContext.getUsers()
                            history.push("/login")
                        }
                    )
            }
        }

        return (
            <>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input type={"text"} name={"name"} value={formData.name} onChange={handleChange}/>
                    </label>
                    {props.type === "Event" ?
                        <>
                            <br/>
                            <label>
                                Club
                                <select name={"club"} onChange={handleChange}>
                                    <option label={"Select a Club"} value={""}/>
                                    {clubs.map((club) => {
                                        return <option key={club.id} label={club.name} value={club.id}/>
                                    })}
                                </ select>
                            </label>
                            <br/>
                            <label>
                                Trailer
                                <select name={"trailer"} onChange={handleChange}>
                                    <option label={"Select a Trailer"} value={""}/>
                                    {trailers.map((trailer) => {
                                        return <option key={trailer.id}
                                                       label={trailer.name != null && trailer.name !== "" ? trailer.name : trailer.slots}
                                                       value={trailer.id}/>
                                    })}
                                </ select>
                            </label>
                            <br/>
                            <label>
                                Date
                                <input type={"date"} value={formData.date} name={"date"} onChange={handleChange}/>
                            </label>
                            <br/>
                        </>
                        :
                        null
                    }
                    {props.type === "User" ?
                        <>
                            <label>
                                Password
                                <input type={"password"} name={"password"} value={formData.password}
                                       onChange={handleChange}/>
                            </label>
                        </>
                        :
                        null
                    }
                    <button>Submit
                    </button>
                </form>
                <h4>{formState}</h4>
            </>
        );
    }
;

CreateForm.propTypes = {
    type: PropTypes.oneOf(["Club", "Event", "Trailer", "User"])
};

export default CreateForm;
