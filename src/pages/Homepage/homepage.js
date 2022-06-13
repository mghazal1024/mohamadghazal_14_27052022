import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './homepage.scss'

import Header from '../../components/Header/header'
import Dropdown from '../../components/Dropdown/dropdown'
import { states, departments } from '../../data/dropdownData'
import Modal from '../../components/Modal/modal'
import db from '../../firebaseConfig'
import DatePicker from '../../components/Datepicker/datepicker'

import { useSelector, useDispatch } from 'react-redux'
import { addFirstName } from '../../slices/employeeSlice'

const Homepage = () => {

    const firstName = useSelector((state) => state.firstName);

    const dispatch = useDispatch();

    // const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(new Date());

    const [error, setError] = useState(false);
    const [reset, setReset] = useState(false);
    // const [employeeCreated, setEmployeeCreated] = useState(false);
    const [modal, setModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            db.collection('Employees').add({
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                state: state,
                zip: zip,
                birthDate: birthDate,
                startDate: startDate,
                department: department
            })
            setModal(true);
        } catch (error) {
            setError(true);
        }
    }

    const handleStateSelection = (data) => {
        setState(data);
    }

    const handleDepartmentSelection = (data) => {
        setDepartment(data);
    }

    const handleStartDateSelection = (data) => {
        setStartDate(data);
    } 

    const handleBirthDateSelection = (data) => {
        setBirthDate(data);
    } 

    const handleClose = () => {
        setModal(false);
    }

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
                                <input id="firstName" type="text" value={firstName} onChange={(e) => { dispatch(addFirstName(e.target.value))}}/>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='date-of-first'>Date of Birth</label>
                                {/* <input id="date-of-birth" type="text" /> */}
                                <DatePicker
                                    handleSelection = {handleBirthDateSelection}
                                ></DatePicker>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="start-date">Start Date</label>
                                {/* <input id="start-date" type="text" /> */}
                                <DatePicker
                                    handleSelection = {handleStartDateSelection}
                                ></DatePicker>
                            </div>
                        </div>
                        <div className='create-employee__form-block create-employee__form-block--background'>
                            <div className='create-employee__input'>
                                <label htmlFor="street">Street</label>
                                <input id="street" type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    list = {states}
                                    name = "state"
                                    handleSelection = {handleStateSelection}
                                    reset = {reset}
                                ></Dropdown>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="zip-code">Zip Code</label>
                                <input id="zip-code" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
                            </div>
                        </div>
                        <div className='create-employee__form-block'>
                            <div className='create-employee__input'>
                                <label htmlFor="department">Department</label>
                                <Dropdown
                                    list = {departments}
                                    name = "department"
                                    handleSelection = {handleDepartmentSelection}
                                    reset = {reset}
                                ></Dropdown>
                            </div>
                            <button onClick={handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </section>
            {/* <div id="confirmation" className="modal">Employee Created!</div> */}
            { modal ? <Modal handleClose = {handleClose}></Modal> : ""}
        </>
    )
}

export default Homepage