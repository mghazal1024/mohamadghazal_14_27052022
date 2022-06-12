import React from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
// import EditEmployee from '../../components/EditEmployee/editEmployee';


const EmployeeList = ( props ) => {

    const {employees} = props;

    console.log(employees)
    
    return (
        <>
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
                            <li className='employee__cell'>{new Date(employee.startDate.seconds*1000).toDateString()}</li>
                            <li className='employee__cell'>{employee.firstName}</li>
                            <li className='employee__cell'>{employee.lastName}</li>
                            <li className='employee__cell'>{employee.department}</li>
                            <li className='employee__cell'>{employee.street}</li>
                            <li className='employee__cell'>{employee.city}</li>
                            <li className='employee__cell'>{employee.state}</li>
                            <li className='employee__cell'>{employee.zip}</li>
                            <li className='employee__cell'>{new Date(employee.birthDate.seconds*1000).toDateString()}</li>
                            <li className='employee__cell employee__cell--action'>
                                <div className='employee__action'>
                                    <FontAwesomeIcon icon={faPencil}/>
                                </div>
                                <div className='employee__action'>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </li>
                        </ul>
                    )
                })}
            </section>
            {/* <EditEmployee></EditEmployee> */}
        </>
    )
}

export default EmployeeList