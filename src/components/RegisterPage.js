import React from 'react';
import CreateForm from "./CreateForm";
import {useHistory} from "react-router";
import UserCreateForm from "./UserCreateForm";

function RegisterPage(props) {
    const history = useHistory()
    return (
        <UserCreateForm/>
    );
}

export default RegisterPage;