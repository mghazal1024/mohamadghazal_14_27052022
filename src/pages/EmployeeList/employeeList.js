import React, {useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import './employeeList.scss';
import EditEmployee from '../../components/EditEmployee/edit-employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { columns  } from '../../data/dropdownData';

import { useEmployeesStore } from '../../store';



// RENDERS the list of employees
const EmployeeList = () => {


    const deleteEmployee = useEmployeesStore(state => state.deleteEmployee)
    const searchEmployees = useEmployeesStore(state => state.searchEmployees)
    const sortEmployees = useEmployeesStore(state => state.sortEmployees)
    const employees = useEmployeesStore(state => state.employees)
    const currentPage = useEmployeesStore(state => state.currentPage)
    const sorted = useEmployeesStore(state => state.sorted)
    const paginate = useEmployeesStore(state => state.paginate)
    const backToOne = useEmployeesStore(state => state.backToOne)

    const [ perPage, setPerPage ] = useState(10);
    const [ isEditEmployee, setIsEditEmployee ] = useState(false);
    const [ employeeId, setEmployeeId ] = useState('');
    const [ activeCount, setActiveCount ] = useState(null)



    const handleEditClick = (id) => {
        setIsEditEmployee(true);
        setEmployeeId(id);
      }

      const handleEditClose = () => {
        setIsEditEmployee(false);
      }


    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(employees.length / perPage); i++) {
      pageNumbers.push(i);
    }



    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const currentDisplayed = employees.slice(indexOfFirst, indexOfLast); 

    const counts = [10, 25, 50];

    
    return (
        <>
            <div className='employee__header'>
                <h1>Table of employees</h1>
                <div className='employee__search'>
                    <Link className='button' to="/">Homepage</Link>
                    <input type="text" onChange={(e) => {searchEmployees(e)}}/>
                </div>
                <div className='employee__per-page'>
                    <p>Display per Page:</p>
                    <ul>
                        {counts.map( link => {
                            return <li key={link} className={`${activeCount === link ? 'active' : ''}`} onClick={() => {setPerPage(link); setActiveCount(link); backToOne()}}>{link}</li>
                        })}
                    </ul>
                </div>
            </div>
            <section className='employee__section'>
                <ul className='employee__titles'>
                    { columns.map( (column, i) => {
                        return <li className='employee__title' key={i} onClick={() => {sortEmployees(column.value)}}>{column.title}</li>
                    })}
                    <li className='employee__title'>Actions</li>
                </ul>
                {currentDisplayed.map((employee, i) => {
                    return (
                        <ul className='employee__row' key={i}>
                            <li className='employee__cell'>{new Date(employee.startDate).toDateString()}</li>
                            <li className='employee__cell'>{employee.firstName}</li>
                            <li className='employee__cell'>{employee.lastName}</li>
                            <li className='employee__cell'>{employee.department}</li>
                            <li className='employee__cell'>{employee.street}</li>
                            <li className='employee__cell'>{employee.city}</li>
                            <li className='employee__cell'>{employee.state}</li>
                            <li className='employee__cell'>{employee.zip}</li>
                            <li className='employee__cell'>{new Date(employee.birthDate).toDateString()}</li>
                            <li className='employee__cell employee__cell--action'>
                                <div className='employee__action'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => {handleEditClick(employee.id)}}/>
                                </div>
                                <div className='employee__action' onClick={() => {deleteEmployee(employee.id)}}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </div>
                            </li>
                        </ul>
                    )
                })}
            </section>
            <ul className='employee__pagination'>
                {pageNumbers.map( number =>  (
                    <li key={number} className={`${currentPage === number ? 'active' : ''}`} onClick={() => {paginate(number)}}>{number}</li>
                ))}
            </ul>
            {isEditEmployee ? <EditEmployee handleClose = {handleEditClose} employees={employees} employeeId = {employeeId}></EditEmployee> : null}
        </>
    )
}

export default EmployeeList