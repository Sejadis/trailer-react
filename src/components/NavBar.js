import React from 'react'
import styles from '../Navbar.module.css'
import {Link} from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className={styles.navigation}>
            <ul>
                {props.data.map((link, index) => {
                    return <li key={index}>
                        <Link to={link.ref}>
                            {link.label}
                        </Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default NavBar