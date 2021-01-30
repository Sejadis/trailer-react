import React, {useEffect, useState} from 'react';
import {createEvent, createTrailer, fetchClubs, fetchTrailers} from "../../api";
import {useHistory} from "react-router";
import styles from "../../styles/CreateForm.Module.css";

const TrailerCreateForm = () => {
    const [formData, setFormData] = useState({name: undefined, club: undefined, trailer: undefined, date: undefined});
    const [clubs, setClubs] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const history = useHistory()

    const getClubs = () => {
        fetchClubs().then
        (clubs => setClubs(clubs))
    }
    const getTrailers = () => {
        fetchTrailers().then
        (trailers => setTrailers(trailers))
    }

    useEffect(() => {
        getClubs()
        getTrailers()
    }, []);

    const handleChange = event => {
        const {name, value} = event.target
        console.log(name, value)
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let isValid = true
        if (formData.name == null || formData.name === "") {
            console.log("name required")
            isValid = false
        }
        if (formData.club == null || formData.club === "") {
            console.log("club required")
            isValid = false
        }
        if (formData.trailer == null || formData.trailer === "") {
            console.log("trailer required")
            isValid = false
        }
        if (formData.date == null || formData.date === "") {
            console.log("date required")
            isValid = false
        }
        if (isValid) {
            console.log(formData)
            createEvent(formData)
                .then(() =>
                    history.push("/events"))
        }
    }
    return (
        <div className={styles.overlay}>
            <div className={styles.overlayBackground} onClick={history.goBack}/>
            <div className={styles.overlayContent}>
                <form onSubmit={handleSubmit}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <label className={styles.formItem}>
                            Name
                            <input className={styles.formInput} type={"text"} name={"name"} value={formData.name} onChange={handleChange}/>
                        </label>
                        <>
                            <label className={styles.formItem}>
                                Club
                                <select className={styles.formInput} name={"club"} onChange={handleChange}>
                                    <option label={"Select Club"} value={""}/>
                                    {clubs.map((club) => {
                                        return <option key={club.id} label={club.name} value={club.id}/>
                                    })}
                                </ select>
                            </label>
                            <label className={styles.formItem}>
                                Trailer
                                <select className={styles.formInput} name={"trailer"} onChange={handleChange}>
                                    <option label={"Select Trailer"} value={""}/>
                                    {trailers.map((trailer) => {
                                        return <option key={trailer.id}
                                                       label={trailer.name != null && trailer.name !== "" ? trailer.name : trailer.slots}
                                                       value={trailer.id}/>
                                    })}
                                </ select>
                            </label>
                            <label className={styles.formItem}>
                                Date
                                <input className={styles.formInput} type={"date"} value={formData.date} name={"date"} onChange={handleChange}/>
                            </label>

                        </>

                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={history.goBack}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TrailerCreateForm;
