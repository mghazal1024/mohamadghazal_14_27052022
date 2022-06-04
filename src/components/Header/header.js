import React from 'react'
import {Link} from 'react-router-dom'

import './header.scss'

const Header = () => {
    return (
        <header>
            <div className="logo-container">
                <h1>HRnet</h1>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/employee-list">View Current Employees</Link>
            </nav>
        </header>
    )
}

export default Header