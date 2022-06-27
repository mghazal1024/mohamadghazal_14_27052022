import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { normalizeText } from './helpers'
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';
import db from './firebaseConfig';


const App = () => {

  const [data, setData] = useState([]);
  const [ isLoading, setIsLoading ] = useState();
  const [ isEditEmployee, setIsEditEmployee ] = useState(false);
  const [ employeeId, setEmployeeId ] = useState('');
  const [searchedEmployees, setSearchEmployees ] = useState([])

  const [ sorted , setSorted ] = useState(false);

  const isMounted = useRef(false)

  const handleDelete = (id) => {
    if(isLoading) {
      db.collection('Employees').doc(id).delete();
    }
  }

  const handleSorting = ( label ) => {
    if(sorted) {
        searchedEmployees.sort((a,b) => {
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
        searchedEmployees.sort((a,b) => {
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

  const handleSearch = (e) => {

    setSearchEmployees(data.filter ( el => {
      return el.employee.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.department.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.street.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.city.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.state.toLowerCase().includes(e.target.value.toLowerCase())
      || el.employee.zip.toString().includes(e.target.value.toLowerCase())
    }))

    console.log(searchedEmployees)

  }

  const handleEditClick = (id) => {
    setIsEditEmployee(true);
    setEmployeeId(id);
  }

  const handleEditClose = () => {
    setIsEditEmployee(false);
  }

  useEffect(() => {
    if(isMounted.current) {
      db.collection('Employees').onSnapshot(snapshot => {
        setData(snapshot.docs.map(doc => ({id: doc.id, employee: doc.data()})))
      })
      db.collection('Employees').onSnapshot(snapshot => {
        setSearchEmployees(snapshot.docs.map(doc => ({id: doc.id, employee: doc.data()})))
      })
    } else {
      isMounted.current = true
    }
  }, [isMounted])


  useEffect(() => {
    setIsLoading(true);
  }, [data, sorted, setSearchEmployees])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/employee-list" element={
          <EmployeeList
            employees = {searchedEmployees} 
            employeeId = {employeeId}
            handleDelete = {handleDelete}
            handleSorting = {handleSorting}
            handleEditClick = {handleEditClick}
            handleEditClose = {handleEditClose}
            handleSearch = {handleSearch}
            isEditEmployee = {isEditEmployee}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App




