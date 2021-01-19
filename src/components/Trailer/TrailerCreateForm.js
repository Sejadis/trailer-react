import React, {useEffect, useState} from 'react';
import {createTrailer, fetchClubs} from "../../api";
import {useHistory} from "react-router";

const TrailerCreateForm = () => {
    const [formData, setFormData] = useState({name: undefined, slots: undefined, club: undefined});
    const [clubs, setClubs] = useState([]);
    const history = useHistory()

    const getClubs = () => {
        fetchClubs().then
        (clubs => setClubs(clubs))
    }
    useEffect(() => {
        getClubs()
    }, []);

    const handleChange = event => {
        const {name, value} = event.target
        console.log(name, value)
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let isValid = true
        if (formData.slots == null || formData.slots === "") {
            console.log("slots required")
            isValid = false
        }
        if (formData.club == null || formData.club === "") {
            console.log("club required")
            isValid = false
        }
        if (isValid) {
            console.log(formData)
            createTrailer(formData).then(() => {
                history.push("/trailers")
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type={"text"} name={"name"} value={formData.name} onChange={handleChange}/>
                </label>
                <label>
                    Slots
                    <input type={"number"} name={"slots"} value={formData.slots} onChange={handleChange}/>
                </label>
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
                </>
                <button>Submit
                </button>
            </form>
        </>
    );
};

export default TrailerCreateForm;
