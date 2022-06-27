import React, { useState } from 'react'
import './edit-employee.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import db from '../../firebaseConfig'
import { states, departments} from '../../data/dropdownData'

import DatePicker from '../Datepicker/datepicker'
import Dropdown from '../Dropdown/dropdown'

const EditEmployee = ( props ) => {

    const {handleClose, employees, employeeId} = props 

    const selectedEmployee = employees.find( e => e.id === employeeId);

    const [ firstName, setFirstName ] = useState(selectedEmployee.employee.firstName)
    const [ lastName, setLastName ] = useState(selectedEmployee.employee.lastName)
    const [ street, setStreet ] = useState(selectedEmployee.employee.street)
    const [ city, setCity ] = useState(selectedEmployee.employee.city)
    const [ zip, setZip ] = useState(selectedEmployee.employee.zip)
    const [ state, setState ] = useState(selectedEmployee.employee.state)
    const [ department, setDepartment ] = useState(selectedEmployee.employee.department)
    const [ birthDate, setBirthDate ] = useState(new Date(selectedEmployee.employee.birthDate.seconds * 1000));
    const [ startDate, setStartDate ] = useState(new Date(selectedEmployee.employee.startDate.seconds * 1000));

    const [ successMessage, setSuccessMessage ] = useState(false)

    const [ reset, setReset ] = useState(false)

    const handleStateSelection = (data) => {
        setState(data);
    }

    const handleDepartmentSelection = (data) => {
        setDepartment(data);
    }

    const handleBirthDateSelection = (data) => {
        setBirthDate(data);
    }

    const handleStartDateSelection = (data) => {
        setStartDate(data);
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        try {
            db.collection('Employees').doc(employeeId).update({
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                zip: zip,
                state: state,
                department: department,
                birthDate: birthDate,
                startDate: startDate
            })
            setSuccessMessage(true)
        } catch {
            console.error("error updating the employee's information")
            setSuccessMessage(false)
        }
    }


 


    return (
        <section className='edit-employee'>
            <div className='edit-employee__modal'>
                <h2>Edit the employee</h2>
                <div className='modal__close'>
                    <FontAwesomeIcon icon={faClose} onClick={handleClose}></FontAwesomeIcon>
                </div>
                <form className='create-employee__form'>
                        <div className='create-employee__form-block'>
                            <div className='create-employee__input'>
                                <label htmlFor='firstName'>First Name</label>
                                <input id="firstName" type="text" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                                {/* {firstNameError ? <p className='create-employee__error'>{firstNameError}</p> : null} */}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {/* {lastNameError ? <p className='create-employee__error'>{lastNameError}</p> : null} */}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='date-of-first'>Date of Birth</label>
                                <DatePicker
                                    handleSelection = {handleBirthDateSelection}
                                    initialValue = {birthDate}
                                ></DatePicker>
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="start-date">Start Date</label>
                                <DatePicker
                                    handleSelection = {handleStartDateSelection}
                                    initialValue = {startDate}
                                ></DatePicker>
                            </div>
                        </div>
                        <div className='create-employee__form-block create-employee__form-block--background'>
                            <div className='create-employee__input'>
                                <label htmlFor="street">Street</label>
                                <input id="street" type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
                                {/* {streetError ? <p className='create-employee__error'>{streetError}</p> : null} */}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="city">City</label>
                                <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                {/* {cityError ? <p className='create-employee__error'>{cityError}</p> : null} */}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    list = {states}
                                    name = "state"
                                    handleSelection = {handleStateSelection}
                                    reset = {reset}
                                    initialValue = {state}
                                ></Dropdown>
                                {/* {stateError ? <p className='create-employee__error'>{stateError}</p> : null} */}
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor="zip-code">Zip Code</label>
                                <input id="zip-code" type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
                                {/* {zipError ? <p className='create-employee__error'>{zipError}</p> : null} */}
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
                                    initialValue = {department}
                                ></Dropdown>
                                {/* {departmentError ? <p className='create-employee__error'>{departmentError}</p> : null} */}
                            </div>
                            <button onClick={handleUpdateSubmit}>Update</button>
                            {successMessage ? <p className='successful_p'>Employee updated successfully</p> : ''}
                        </div>
                    </form>
            </div>
        </section>
    )
}

export default EditEmployee