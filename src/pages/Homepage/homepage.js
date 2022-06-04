import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './homepage.scss'

import Header from '../../components/Header/header'
import Dropdown from '../../components/Dropdown/dropdown'
import { states, departments } from '../../data/dropdownData'

const Homepage = () => {

    return (
        <>
            <Header></Header>
            <section className='create-employee'>
                <h1 className='create-employee__title'>Create Employee</h1>
                <div className='create-employee__form-container'>
                    <form className='create-employee__form'>
                        <div className='create-employee__form-block'>
                            <div className='create-employee__input'>
                                <label htmlFor='firstName'>First Name</label>
                                <input id="firstName" type="text"/>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text"/>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='date-of-first'>Date of Birth</label>
                                <input id="date-of-birth" type="text" />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="start-date">Start Date</label>
                                <input id="start-date" type="text" />
                            </div>
                        </div>
                        <div className='create-employee__form-block create-employee__form-block--background'>
                            <div className='create-employee__input'>
                                <label htmlFor="street">Street</label>
                                <input id="street" type="text" />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    list = {states}
                                    title = "state"
                                ></Dropdown>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="zip-code">Zip Code</label>
                                <input id="zip-code" type="number" />
                            </div>
                        </div>
                        <div className='create-employee__form-block'>
                            <div className='create-employee__input'>
                                <label htmlFor="department">Department</label>
                                <Dropdown
                                    list = {departments}
                                    title = "department"
                                ></Dropdown>
                            </div>
                            <button onclick="saveEmployee()">Save</button>
                        </div>
                    </form>
                </div>
            </section>
            <div id="confirmation" className="modal">Employee Created!</div>
        </>
    )
}

export default Homepage