import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';

import EditEmployee from '../../components/EditEmployee/edit-employee';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import db from '../../firebaseConfig';


const EmployeeList = ( props ) => {

    const {employees, handleDelete, handleSorting, handleEditClick, handleEditClose, handleSearch, employeeId, isEditEmployee} = props;

    

    // const handleChange = (e) => {
    //     console.log(e.target.value)
    // }

    
    return (
        <>
            <div className='employee__header'>
                <h1>Table of employees</h1>
                <div className='employee__search'>
                    <Link className='button' to="/">Homepage</Link>
                    <input type="text" onChange={(e) => {handleSearch(e)}}/>
                </div>
            </div>
            <section className='employee__section'>
                <ul className='employee__titles'>
                    <li className='employee__title' onClick={() => {handleSorting('startDate')}}>StartDate</li>
                    <li className='employee__title' onClick={() => {handleSorting('firstName')}}>First Name</li>
                    <li className='employee__title' onClick={() => {handleSorting('lastName')}}>Last Name</li>
                    <li className='employee__title' onClick={() => {handleSorting('department')}}>Department</li>
                    <li className='employee__title' onClick={() => {handleSorting('street')}}>Street</li>
                    <li className='employee__title' onClick={() => {handleSorting('city')}}>City</li>
                    <li className='employee__title' onClick={() => {handleSorting('state')}}>State</li>
                    <li className='employee__title' onClick={() => {handleSorting('zip')}}>Zip Code</li>
                    <li className='employee__title' onClick={() => {handleSorting('birthDate')}}>Birthdate</li>
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