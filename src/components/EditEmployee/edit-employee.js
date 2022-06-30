import React, { useState } from 'react'
import './edit-employee.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import db from '../../firebaseConfig'
import { states, departments} from '../../data/dropdownData'
import DatePicker from '../Datepicker/datepicker'
import Dropdown from '../Dropdown/dropdown'
import { useEmployeesStore } from '../../store'

const EditEmployee = ( props ) => {

    const {handleClose, employees, employeeId} = props 
    
    const updateEmployee = useEmployeesStore(state => state.updateEmployee)
    const selectedEmployee = employees.find( e => e.id === employeeId);


    // STATES
    const [ id ] = useState(selectedEmployee.id)
    const [ firstName, setFirstName ] = useState(selectedEmployee.firstName)
    const [ lastName, setLastName ] = useState(selectedEmployee.lastName)
    const [ street, setStreet ] = useState(selectedEmployee.street)
    const [ city, setCity ] = useState(selectedEmployee.city)
    const [ zip, setZip ] = useState(selectedEmployee.zip)
    const [ state, setState ] = useState(selectedEmployee.state)
    const [ department, setDepartment ] = useState(selectedEmployee.department)
    const [ birthDate, setBirthDate ] = useState(new Date(selectedEmployee.birthDate));
    const [ startDate, setStartDate ] = useState(new Date(selectedEmployee.startDate));
    const [ successMessage, setSuccessMessage ] = useState(false)
    const [ reset, setReset ] = useState(false)



    // Functions to handle selections
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
    

    // Handles edit submission
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        try {
            updateEmployee({
                id: id,
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
                            </div>

                            <div className='create-employee__input'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
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
                                    initialValue = {state}
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
                                    initialValue = {department}
                                ></Dropdown>
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