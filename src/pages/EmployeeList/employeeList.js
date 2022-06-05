import React from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';

const EmployeeList = ( props ) => {

    const {employees} = props;

    console.log(employees)
    
    return (
        <>
            <h1>Table of employees</h1>
            <Link to="/">Homepage</Link>
            <section className='employee__section'>
                <ul className='employee__titles'>
                    <li className='employee__title'>First Name</li>
                    <li className='employee__title'>Last Name Name</li>
                    <li className='employee__title'>Department</li>
                    <li className='employee__title'>Street</li>
                    <li className='employee__title'>City</li>
                    <li className='employee__title'>State</li>
                    <li className='employee__title'>Zip Code</li>
                </ul>
                {employees.map((employee, i) => {
                    return (
                        <ul className='employee__row' key={i}>
                            {/* <li className='employee__cell'>{employee.startDate}</li> */}
                            <li className='employee__cell'>{employee.firstName}</li>
                            <li className='employee__cell'>{employee.lastName}</li>
                            <li className='employee__cell'>{employee.department}</li>
                            <li className='employee__cell'>{employee.street}</li>
                            <li className='employee__cell'>{employee.city}</li>
                            <li className='employee__cell'>{employee.state}</li>
                            <li className='employee__cell'>{employee.zip}</li>
                            {/* <li className='employee__cell'>{employee.birthDate}</li> */}
                        </ul>
                    )
                })}
            </section>
        </>
    )
}

export default EmployeeList