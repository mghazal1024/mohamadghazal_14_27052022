import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';
import db from './firebaseConfig';


const App = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    let allEmployees = [];
    let error;
      try {
        const data = await db.collection('Employees').get();
        data.docs.map(el => {
          let employee = { ...el.data(), 'id' : el.id}
          allEmployees.push(employee);
          return allEmployees;
        });
        setData(allEmployees)
      } catch(e) {
        error = 'error';
        return error
      }
      console.log(data)
  }
  fetchData()
  // useEffect(() => {
    
  //   console.log(data);
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




