import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import classes from "./EmployeeList.module.css";
import { BsThreeDotsVertical, BsViewStacked } from "react-icons/bs";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import axios from "axios";

const EmployeeList = (props) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (empId) => {
    setSelectedEmployee(empId);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const viewEmployee = (empId) => {
    console.log(`Viewing employee with ID: ${empId}`);
  };

  const editEmployee = (empId) => {
    console.log(`Editing employee with ID: ${empId}`);
  };

  const deleteEmployee = async (empId) => {
    console.log(`Deleting employee with ID: ${empId}`);

    try {
        const res = await axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${empId}`)
    }
    catch(err) {
        alert(err)
    }

  };

  return (
    <div className={classes.listCon}>
      <Table className={classes.tableCon}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.FirstName} {' '}{emp.LastName}</td>
              <td>{emp.DOB}</td>
              <td>{emp.StartDate}</td>
              <td>{emp.EndDate}</td>
              <td dangerouslySetInnerHTML={{ __html: emp.Description }} />
              <td className={classes.threeDot}>
                <div className={classes.dropdown}>
                  <BsThreeDotsVertical onClick={() => toggleDropdown(emp.id)} />
                  {selectedEmployee === emp.id && isDropdownOpen && (
                    <div className={classes.dropdownMenu}>
                      <ul>
                        <li onClick={() => viewEmployee(emp.id)}><AiFillEye /><span>View</span></li>
                        <li onClick={() => editEmployee(emp.id)}><AiFillEdit /><span>Edit</span></li>
                        <li onClick={() => deleteEmployee(emp.id)}><AiFillDelete /><span>Delete</span></li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
