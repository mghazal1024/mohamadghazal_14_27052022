import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';
import db from './firebaseConfig';


const App = () => {

  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   let allEmployees = [];
  //   let error;
  //     try {
  //       const data = await db.collection('Employees').get();
  //       data.docs.map(el => {
  //         let employee = { ...el.data(), 'id' : el.id}
  //         allEmployees.push(employee);
  //         return allEmployees;
  //       });
  //       setData(allEmployees)
  //     } catch(e) {
  //       error = 'error';
  //       return error
  //     }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const [data, setData] = useState([]);
  const isMounted = useRef(false)

  useEffect(() => {
    if(isMounted.current) {
      db.collection('Employees').onSnapshot(snapshot => {
        setData(snapshot.docs.map(doc => ({id: doc.id, employee: doc.data()})))
        snapshot.docs.map( doc => {
          console.log(doc.id)
        })
      })
    } else {
      isMounted.current = true
    }
  }, [isMounted])

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




