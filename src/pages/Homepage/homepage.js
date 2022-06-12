import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFirstName, addLastName, addStartDate, addBirthDate, addStreet, addCity, addState, addZip, addDepartment } from '../../slices/employeeSlice'

import {Link} from 'react-router-dom'
import './homepage.scss'

import Header from '../../components/Header/header'
import Dropdown from '../../components/Dropdown/dropdown'
import { states, departments } from '../../data/dropdownData'
import Modal from '../../components/Modal/modal'
import db from '../../firebaseConfig'
import DatePicker from '../../components/Datepicker/datepicker'

const Homepage = () => {


    const firstName = useSelector((state) => state.firstName);
    const lastName = useSelector((state) => state.lastName);
    const street = useSelector((state) => state.state);
    const city = useSelector((state) => state.city);
    const state = useSelector((state) => state.state);
    const zip = useSelector((state) => state.zip)
    const department = useSelector((state) => state.department);
    const startDate = useSelector((state) => state.startDate);
    const birthDate = useSelector((state) => state.birthDate)
    const dispatch = useDispatch();

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [street, setStreet] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [zip, setZip] = useState('');
    // const [department, setDepartment] = useState('');
    // const [startDate, setStartDate] = useState(new Date());
    // const [birthDate, setBirthDate] = useState(new Date());

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
        // setState(data);
        dispatch(addState(data));
    }

    const handleDepartmentSelection = (data) => {
        // setDepartment(data);
        dispatch(addDepartment(data));
    }

    const handleStartDateSelection = (data) => {
        // setStartDate(data);
        dispatch(addStartDate());        
    } 

    const handleBirthDateSelection = (data) => {
        // setBirthDate(data);
        dispatch(addBirthDate(data));
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
                                <input id="firstName" type="text" value={firstName} onChange={(e) => {dispatch(addFirstName(e.target.value))}} />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text" value={lastName} onChange={(e) => {dispatch(addLastName(e.target.value))}}/>
                            </div>

                            {/* <div className='create-employee__input'>
                                <label htmlFor='date-of-first'>Date of Birth</label>
                                <DatePicker
                                    handleSelection = {handleBirthDateSelection}
                                ></DatePicker>
                            </div> */}

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
                                <input id="street" type="text"  value={street} onChange={(e) => {dispatch(addStreet(e.target.value))}} />
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" value={city} onChange={(e) => {dispatch(addCity(e.target.value))}} />
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
                                <input id="zip-code" type="number" value={zip} onChange={(e) => {dispatch(addZip(e.target.value))}} />
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