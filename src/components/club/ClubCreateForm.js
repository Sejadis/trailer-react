import React, {useEffect, useState} from 'react';
import {createClub, fetchClubs, fetchTrailers} from "../../api";
import {useHistory} from "react-router";
import styles from "../../styles/CreateForm.Module.css";

const TrailerCreateForm = () => {
    const [formData, setFormData] = useState({name: undefined});
    const history = useHistory()


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
        if (isValid) {
            console.log(formData)
            createClub(formData).then(() =>
                history.push("/clubs"))
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
                            <input className={styles.formInput} type={"text"} name={"name"} value={formData.name}
                                   onChange={handleChange}/>
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
