import React, { useState } from 'react'
import './homepage.scss'

import Header from '../../components/Header/header'
import Dropdown from '../../components/Dropdown/dropdown'
import { states, departments } from '../../data/dropdownData'
import Modal from '../../components/Modal/modal'
import db from '../../firebaseConfig'
import DatePicker from '../../components/Datepicker/datepicker'
import { useEmployeesStore } from '../../store'

const Homepage = () => {

    const addEmployee = useEmployeesStore(state => state.addEmployee)

    // STATES
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState(0);
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(new Date());

    const [error, setError] = useState(false);
    const [reset, setReset] = useState(false);
    const [modal, setModal] = useState(false);


    // ERROR STATES
    const [ firstNameError, setFirstNameError ] = useState('');
    const [ lastNameError, setLastNameError ] = useState('');
    const [ streetError, setStreetError ] = useState('');
    const [ cityError, setCityError ] = useState('');
    const [ stateError, setStateError ] = useState('');
    const [ zipError, setZipError ] = useState('');
    const [ departmentError, setDepartmentError ] = useState('');

    // Validates if all form inputs are filled
    const validateForm = () => {

        let firstNameErrorMessage = '';
        let lastNameErrorMessage = '';
        let streetErrorMessage = '';
        let cityErrorMessage = '';
        let stateErrorMessage = '';
        let zipErrorMessage = '';
        let departmentErrorMessage = '';
        let startDateErrorMessage = '';
        let birthDateErrorMessage = '';


        if (!firstName) {
            firstNameErrorMessage = 'Please enter your first name';
        }

        if (!lastName) {
            lastNameErrorMessage = 'Please enter your last name';
        }

        if (!street) {
            streetErrorMessage = 'Please enter your street address';
        }
        
        if (!city) {
            cityErrorMessage = 'Please enter your city';
        }

        if (!state) {
            stateErrorMessage = 'Please select an state';
        }

        if (!zip) {
            zipErrorMessage = 'Please enter your zip code';
        }

        if (!department) {
            departmentErrorMessage = 'Please select a department';
        }

        if (firstNameErrorMessage || lastNameErrorMessage || streetErrorMessage || cityErrorMessage || stateErrorMessage || zipErrorMessage || departmentErrorMessage || startDateErrorMessage || birthDateErrorMessage) {
            setFirstNameError(firstNameErrorMessage);
            setLastNameError(lastNameErrorMessage);
            setStreetError(streetErrorMessage);
            setCityError(cityErrorMessage);
            setStateError(stateErrorMessage);
            setZipError(zipErrorMessage);
            setDepartmentError(departmentErrorMessage);

            return false
        }


        return true;
        
    }

    // Handle the form submit and add the new employee
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                addEmployee({
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

            setFirstNameError('');
            setLastNameError('');
            setStreetError('');
            setCityError('');
            setStateError('');
            setZipError('');
            setDepartmentError('');
        
            setReset(!reset);
            setFirstName('');
            setLastName('');
            setStreet('');
            setCity('');
            setZip(0);
            
        }
    }

    // Functions to handle selections
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

    // Handles Modal Close
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
                                <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                {firstNameError ? <p className='create-employee__error'>{firstNameError}</p> : null}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {lastNameError ? <p className='create-employee__error'>{lastNameError}</p> : null}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='date-of-first'>Date of Birth</label>
                                <DatePicker
                                    handleSelection = {handleBirthDateSelection}
                                ></DatePicker>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="start-date">Start Date</label>
                                <DatePicker
                                    handleSelection = {handleStartDateSelection}
                                ></DatePicker>
                            </div>
                        </div>
                        <div className='create-employee__form-block create-employee__form-block--background'>
                            <div className='create-employee__input'>
                                <label htmlFor="street">Street</label>
                                <input id="street" type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
                                {streetError ? <p className='create-employee__error'>{streetError}</p> : null}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                {cityError ? <p className='create-employee__error'>{cityError}</p> : null}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    list = {states}
                                    name = "state"
                                    handleSelection = {handleStateSelection}
                                    reset = {reset}
                                ></Dropdown>
                                {stateError ? <p className='create-employee__error'>{stateError}</p> : null}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="zip-code">Zip Code</label>
                                <input id="zip-code" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
                                {zipError ? <p className='create-employee__error'>{zipError}</p> : null}
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
                                {departmentError ? <p className='create-employee__error'>{departmentError}</p> : null}
                            </div>
                            <button onClick={handleSubmit}>Create</button>
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