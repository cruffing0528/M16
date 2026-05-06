import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Badge, Button, Table, Card, Modal } from 'react-bootstrap';

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
    <Card>
      <Card.Header as="h5">All Employees <Badge bg="secondary">{props.employees.length}</Badge></Card.Header>
      <Card.Body>
        <Card.Text>
          <Table striped bordered size="sm">
            <thead>
              <tr>
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
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

class EmployeeRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  onDeleteClick() {
    this.props.deleteEmployee(this.props.employee._id);
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td><Link to={`/edit/${this.props.employee._id}`}>{this.props.employee.name}</Link></td>
          <td>{this.props.employee.extension}</td>
          <td>{this.props.employee.email}</td>
          <td>{this.props.employee.title}</td>
          <td>{this.props.employee.dateHired.toLocaleDateString()}</td>
          <td>{this.props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
          <td>
            <div>
              <Button onClick={this.toggleModal} variant="danger" size="sm">X</Button>
            </div>

            <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Employee?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this employee?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="danger"
                  size="sm"
                  className="mt-4"
                  onClick={this.toggleModal}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="mt-4"
                  onClick={this.onDeleteClick}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </td>
        </tr>
      </React.Fragment>
    );
  }
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
        <EmployeeAdd createEmployee={this.createEmployee} />
        <EmployeeFilter />
        <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
      </React.Fragment>
    );
  }
}