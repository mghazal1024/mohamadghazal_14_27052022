import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { normalizeText } from './helpers'
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';
import db from './firebaseConfig';

import { useEmployeesStore } from './store';


const App = () => {

  // STATES

  const employees = useEmployeesStore(state => state.employees);
  const deleteEmployee = useEmployeesStore(state => state.deleteEmployee);

  const [data, setData] = useState([]);
  // const [ isLoading, setIsLoading ] = useState();
  // const [ isEditEmployee, setIsEditEmployee ] = useState(false);
  // const [ employeeId, setEmployeeId ] = useState('');
  const [searchedEmployees, setSearchEmployees ] = useState([])
  const [ sorted , setSorted ] = useState(false);
  const isMounted = useRef(false);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ perPage, setPerPage ] = useState(5);

  // ACTIONS


  // Sorts the list of employees when title header is clicked
  // const handleSorting = ( label ) => {
  //   if(sorted) {
  //       searchedEmployees.sort((a,b) => {
  //           const aElement = normalizeText(a.employee[label]);
  //           const bElement = normalizeText(b.employee[label]);

  //           if (aElement < bElement) {
  //               return -1
  //           }
  //           if (aElement > bElement) {
  //               return 1;
  //           }
  //           return 0;
  //       })
  //       setSorted(!sorted)
  //   } else {
  //       searchedEmployees.sort((a,b) => {
  //           const aElement = normalizeText(a.employee[label]);
  //           const bElement = normalizeText(b.employee[label]);

  //           if (aElement > bElement) {
  //               return -1
  //           }
  //           if (aElement < bElement) {
  //               return 1;
  //           }
  //           return 0;
  //       })
  //       setSorted(!sorted)
  //   }
  // }
 

  // display a modal to edit the employee
  // const handleEditClick = (id) => {
  //   setIsEditEmployee(true);
  //   setEmployeeId(id);
  // }

  // closes the employee edit
  // const handleEditClose = () => {
  //   setIsEditEmployee(false);
  // }

  // Change page on pagination
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  // }



  // LYFECYCLE OF COMPONENT
  // useEffect(() => {
  //   if(isMounted.current) {
  //     db.collection('Employees').onSnapshot(snapshot => {
  //       setData(snapshot.docs.map(doc => ({id: doc.id, employee: doc.data()})))
  //     })
  //     db.collection('Employees').onSnapshot(snapshot => {
  //       setSearchEmployees(snapshot.docs.map(doc => ({id: doc.id, employee: doc.data()})))
  //     })
  //   } else {
  //     isMounted.current = true
  //   }
  // }, [isMounted])
  // useEffect(() => {
  //   if(isMounted.current) {
  //     setData(employees)
  //     setSearchEmployees(employees)
  //   } else {
  //     isMounted.current = true
  //   }
  // }, [isMounted])


  // useEffect(() => {
  //   console.log(employees)
  //   setIsLoading(true);
  // }, [data, sorted, setSearchEmployees])
  

  // const indexOfLast = currentPage * perPage;
  // const indexOfFirst = indexOfLast - perPage;
  // const currentDisplayed = searchedEmployees.slice(indexOfFirst, indexOfLast); 


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/employee-list" element={
          <EmployeeList
            // employees = {currentDisplayed} 
            // employeeId = {employeeId}
            // handleDelete = {handleDelete}
            // handleSorting = {handleSorting}
            // handleEditClick = {handleEditClick}
            // handleEditClose = {handleEditClose}
            // handleSearch = {handleSearch}
            // isEditEmployee = {isEditEmployee}
            // perPage = {perPage}
            // totalEmployees = {searchedEmployees.length}
            // paginate = {paginate}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App




