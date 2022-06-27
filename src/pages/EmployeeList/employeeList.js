import React from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';
import EditEmployee from '../../components/EditEmployee/edit-employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { columns  } from '../../data/dropdownData';


// RENDERS the list of employees
const EmployeeList = ( props ) => {

    const {employees, handleDelete, handleSorting, handleEditClick, handleEditClose, handleSearch, employeeId, isEditEmployee} = props;

    
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
                    { columns.map( (column, i) => {
                        return <li className='employee__title' key={i} onClick={() => {handleSorting(column.value)}}>{column.title}</li>
                    })}
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