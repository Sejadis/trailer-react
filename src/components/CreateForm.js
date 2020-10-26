import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {createClub, createEvent, fetchClubs} from "../api";

const CreateForm = props => {
        const [formData, setFormData] = useState({name: "", date: undefined, club: undefined});
        const [formState, setFormState] = useState("");
        const [clubs, setClubs] = useState([]);
        const {history} = props

        const getClubs = () => {
            fetchClubs().then
            (clubs => setClubs(clubs))
        }
        useEffect(() => {
            if (props.type === "Event") {
                getClubs()
            }
        }, [props.type]);

        const handleSubmit = (event) => {
            event.preventDefault()
            switch (props.type) {
                case "Club":
                    setFormState("Creating new club...")
                    createClub(formData.name).then(() =>
                        history.push("/clubs")
                    )
                    break
                case "Event":
                    setFormState("Creating new event...")
                    createEvent(formData)
                        .then(() =>
                            history.push("/events"))
                    break
            }
        }

        const handleChange = event => {
            const {name, value} = event.target
            console.log(name, value)
            setFormData({...formData, [name]: value})
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
                                    <option label={"Select a Club"}/>
                                    {clubs.map((club) => {
                                        return <option key={club.id} label={club.name} value={club.id}/>
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
                    <button>Submit
                    </button>
                </form>
                <h4>{formState}</h4>
            </>
        );
    }
;

CreateForm.propTypes = {
    type: PropTypes.oneOf(["Club", "Event"])
};

export default CreateForm;
