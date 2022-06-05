import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';
import db from './firebaseConfig';


const App = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    let employeeArray = [];
    let error;
      try {
        const data = await db.collection('Employees').get();
        data.docs.map(el => {
          let employee = { ...el.data(), 'id' : el.id}
          employeeArray.push(employee);
          return employeeArray;
        });
        setData(employeeArray)
      } catch(e) {
        error = 'error';
        return error
      }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // const [employees, setEmployees] = useState([]);

  // const fetchEmployees = async() => {
  //   const response = db.collection('Employees');
  //   const data = await response.get();
  //   data.docs.map(item => {
  //     setEmployees([...employees, item.data()])
  //   })
  // }


  // useEffect(() => {
  //   fetchEmployees();
  //   console.log(employees)
  // }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/employee-list" element={<EmployeeList employees={data} />} />
      </Routes>
    </Router>
  )
}

export default App




