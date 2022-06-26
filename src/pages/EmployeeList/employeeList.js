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
    const [ employeeId, setEmployeeId ] = useState('');

    const [ sorted , setSorted ] = useState(false)

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

    const normalizeText = (text) => {

        if(typeof text === 'string')  {
            console.log(typeof text);
            console.log(text);
            return text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim();
        } else {
            console.log(typeof text)
            console.log(text)
            console.log(new Date(text.seconds * 1000).getTime());
            return new Date(text.seconds * 1000).getTime();
        }
      };

    const handleSorting = ( label ) => {
        console.log(employees)
        if(sorted) {
            employees.sort((a,b) => {
                const aElement = normalizeText(a.employee[label]);
                const bElement = normalizeText(b.employee[label]);
    
                if (aElement < bElement) {
                    return -1
                }
                if (aElement > bElement) {
                    return 1;
                }
                return 0;
            })
            setSorted(!sorted)
        } else {
            employees.sort((a,b) => {
                const aElement = normalizeText(a.employee[label]);
                const bElement = normalizeText(b.employee[label]);
    
                if (aElement > bElement) {
                    return -1
                }
                if (aElement < bElement) {
                    return 1;
                }
                return 0;
            })
            setSorted(!sorted)
        }
    }

    useEffect(() => {
        setIsLoading(true);
    }, [employees, sorted])
    
    return (
        <>
            {employees.map(( employee, id) => {
                {/* console.log(employee) */}
            })}
            <div className='employee__header'>
                <h1>Table of employees</h1>
                <Link className='button' to="/">Homepage</Link>
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