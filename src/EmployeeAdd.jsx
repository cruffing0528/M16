import React from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";

export default class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.setState = { 
      modalVisible: false 
    };
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
      <Container fluid>
        <form name="employeeAdd" onSubmit={e => this.handleSubmit(e)}>
          <Row>
            <Col md={3}>Name:</Col>
            <Col md="auto"><input type="text" name="name" /></Col>
          </Row>
          <Row>
            <Col md={3}>Extension:</Col>
            <Col md="auto"><input type="text" name="extension" maxLength={4} /></Col>
          </Row>
          <Row>
            <Col md={3}>Email:</Col>
            <Col md="auto"><input type="text" name="email" /></Col>
          </Row>
          <Row>
            <Col md={3}>Title:</Col>
            <Col md="auto"><input type="text" name="title" /></Col>
          </Row>
          <Row>
            <Button type="submit" variant="primary" size="sm" className="mt-4">
              Add Employee
            </Button>
          </Row>
        </form>
      </Container>
    )
  }
}