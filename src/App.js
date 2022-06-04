import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage/homepage';
import EmployeeList from './pages/EmployeeList/employeeList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/employee-list" element={<EmployeeList/>} />
      </Routes>
    </Router>
  )
}

export default App




