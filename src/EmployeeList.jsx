import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";
import React from "react";
import { useLocation, Link } from "react-router-dom";

function EmployeeTable(props) {
  // Get the URL
  const { search } = useLocation();
  //Get the parameters from the URL
  const query = new URLSearchParams(search);
  // Get the 'employed' param specifically
  const q = query.get('employed');

  const employeeRows = props.employees
    .filter(employee => {
      if (q === 'true') {
        return employee.currentlyEmployed;
      } else if (q === 'false') {
        return !employee.currentlyEmployed;
      }
      return true;
    })
    .map(employee =>
      <EmployeeRow
        key={employee._id}
        employee={employee}
        deleteEmployee={props.deleteEmployee}
      />);

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Name</th>
          <th>Extension</th>
          <th>Email</th>
          <th>Title</th>
          <th>Date Hired</th>
          <th>Currently Employed?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employeeRows}
      </tbody>
    </table>
  );
}

function EmployeeRow(props) {
  const employee = props.employee;
  function onDeleteClick() {
    alert(`Delete employee with ID ${employee._id}`);
    props.deleteEmployee(props.employee._id);
  }
  return (
    <tr>
      <td><Link to={`/edit/${props.employee._id}`}>EDIT</Link></td>
      {/* <td>{props.employee._id}</td> */}
      <td>{props.employee.name}</td>
      <td>{props.employee.extension}</td>
      <td>{props.employee.email}</td>
      <td>{props.employee.title}</td>
      <td>{props.employee.dateHired.toLocaleDateString()}</td>
      <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
      <td><button onClick={onDeleteClick}>DELETE</button></td>
    </tr>
  );
}

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/employees').
      then(response => response.json()).
      then(data => {
        console.log("Total count of employees:", data.count);
        data.employees.forEach(employee => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      })
      .catch(err => {
        console.log("Error fetching data from server:", err);
      });
  }

  createEmployee(employee) {
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(newEmployee => {
        newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired);
        const newEmployees = this.state.employees.concat(newEmployee.employee);
        this.setState({ employees: newEmployees });
        console.log("Total count of employees:", newEmployees.length);
      })
      .catch(err => {
        console.log("Error creating employee:", err);
      });
  }

  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete employee with ID ${id}`);
        }
        else {
          this.loadData();
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management Application</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
        <hr />
        <EmployeeAdd createEmployee={this.createEmployee} />
      </React.Fragment>
    );
  }
}