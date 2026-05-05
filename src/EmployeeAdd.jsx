import React from "react";

export default class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      name: form.name.value,
      extension: form.extension.value,
      email: form.email.value,
      title: form.title.value,
    }
    this.props.createEmployee(employee);
    form.name.value = "";
    form.extension.value = "";
    form.email.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <form name="employeeAdd" onSubmit={e => this.handleSubmit(e)}>
        Name: <input type="text" name="name" />
        Extension: <input type="text" name="extension" maxLength={4} />
        Email: <input type="text" name="email" />
        Title: <input type="text" name="title" />
        <button type="submit">Add Employee</button>
      </form>
    )
  }
}