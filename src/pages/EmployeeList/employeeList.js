import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';

import EditEmployee from '../../components/EditEmployee/edit-employee';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import db from '../../firebaseConfig';
// import EditEmployee from '../../components/EditEmployee/editEmployee';


const EmployeeList = ( props ) => {

    const {employees} = props;

    // console.log(employees)

    const [ isLoading, setIsLoading] = useState();
    const [ isEditEmployee, setIsEditEmployee ] = useState(false);
    const [ employeeId, setEmployeeId ] = useState('')

    const handleDelete = (id) => {
        // console.log(id)
        if(isLoading) {
            db.collection('Employees').doc(id).delete();
        }
        
    }

    const handleEditClick = (id) => {
        setIsEditEmployee(true);
        setEmployeeId(id);
        // console.log(employeeId)
    }

    const handleEditClose = () => {
        setIsEditEmployee(false)
    }

    useEffect(() => {
        setIsLoading(true);
    }, [employees])
    
    return (
        <>
            {employees.map(( employee, id) => {
                {/* console.log(employee) */}
            })}
            <h1>Table of employees</h1>
            <Link to="/">Homepage</Link>
            <section className='employee__section'>
                <ul className='employee__titles'>
                    <li className='employee__title'>StartDate</li>
                    <li className='employee__title'>First Name</li>
                    <li className='employee__title'>Last Name Name</li>
                    <li className='employee__title'>Department</li>
                    <li className='employee__title'>Street</li>
                    <li className='employee__title'>City</li>
                    <li className='employee__title'>State</li>
                    <li className='employee__title'>Zip Code</li>
                    <li className='employee__title'>Birthdate</li>
                    <li className='employee__title'>Actions</li>
                </ul>
                {employees.map((employee, i) => {
                    return (
                        <ul className='employee__row' key={i}>
                            <li className='employee__cell'>{new Date(employee.employee.startDate.seconds*1000).toDateString()}</li>
                            <li className='employee__cell'>{employee.employee.firstName}</li>
                            <li className='employee__cell'>{employee.employee.lastName}</li>
                            <li className='employee__cell'>{employee.employee.department}</li>
                            <li className='employee__cell'>{employee.employee.street}</li>
                            <li className='employee__cell'>{employee.employee.city}</li>
                            <li className='employee__cell'>{employee.employee.state}</li>
                            <li className='employee__cell'>{employee.employee.zip}</li>
                            <li className='employee__cell'>{new Date(employee.employee.birthDate.seconds*1000).toDateString()}</li>
                            <li className='employee__cell employee__cell--action'>
                                <div className='employee__action'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => {handleEditClick(employee.id)}}/>
                                </div>
                                <div className='employee__action' onClick={() => {handleDelete(employee.id)}}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </li>
                        </ul>
                    )
                })}
            </section>
            {isEditEmployee ? <EditEmployee handleClose = {handleEditClose} employees={employees} employeeId = {employeeId}></EditEmployee> : null}
        </>
    )
}

export default EmployeeList