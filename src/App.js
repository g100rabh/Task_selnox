import { Button } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";
import RegForm from "./Components/RegForm";

import axios from 'axios';
import { useState, useEffect } from "react";

function App() {

  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const empData = async () => {
    try {
      const res = await axios.get('https://sweede.app/DeliveryBoy/Get-Employee/');
      const data = res.data;
      console.log(data);
      setEmployeeData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=> {
    empData();
  })


  const listClickHandler = () => {
    empData();
    navigate("/list")
    
  };

  return (
    <div className="App">
      <div>
        <Button variant="primary" onClick={()=> navigate("/")}>Employee Registration</Button>{" "}
        <Button variant="secondary" onClick={listClickHandler}>Employee List</Button>{" "}
        <Button variant="success">Search Employee</Button>{" "}
      </div>
      <Routes>
        <Route path="/" element={<RegForm />} />
        <Route path="/list" element={<EmployeeList data={employeeData} />} />
      </Routes>
    </div>
  );
}

export default App;
