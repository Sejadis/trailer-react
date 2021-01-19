import React from 'react';
import CreateForm from "./CreateForm";
import {useHistory} from "react-router";

function RegisterPage(props) {
    const history = useHistory()
    return (
        <CreateForm history={history} type={"User"}/>
    );
}

export default RegisterPage;