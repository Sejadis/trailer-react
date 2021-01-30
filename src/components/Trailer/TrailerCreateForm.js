import React, {useEffect, useState} from 'react';
import {createTrailer, fetchClubs} from "../../api";
import {useHistory} from "react-router";
import styles from "../../styles/CreateForm.Module.css";

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
        <div className={styles.overlay}>
            <div className={styles.overlayBackground} onClick={history.goBack}/>
            <div className={styles.overlayContent}>
                <form onSubmit={handleSubmit}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <label className={styles.formItem}>
                            Name
                            <input className={styles.formInput} type={"text"} name={"name"} value={formData.name} onChange={handleChange}/>
                        </label>
                        <label className={styles.formItem}>
                            Slots
                            <input className={styles.formInput} type={"number"} name={"slots"} value={formData.slots} onChange={handleChange}/>
                        </label>
                        <label className={styles.formItem}>
                            Club
                            <select className={styles.formInput} name={"club"} onChange={handleChange}>
                                <option label={"Select a Club"} value={""}/>
                                {clubs.map((club) => {
                                    return <option key={club.id} label={club.name} value={club.id}/>
                                })}
                            </ select>
                        </label>
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
