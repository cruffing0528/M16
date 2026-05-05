import React from "react";

export default class EmployeeFilter extends React.Component {
  render() {
    return (
      <div>
        Filter: {' '}
        <a href="/#/employees">All Employees</a>
        { ' | ' }
        <a href="/#/employees?employed=true">Employed</a>
        { ' | ' }
        <a href="/#/employees?employed=false">Not Employed</a>
      </div>
    );
  }
}