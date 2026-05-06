import React from "react";
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

export default class EmployeeEdit extends React.Component {
    constructor() {
        super();
        this.state = { 
            employee: [],
            alertVisible: false,
            alertColor: "success",
            alertMessage: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const id = window.location.pathname.split('/')[2];
        fetch(`/api/employees/${id}`)
            .then(response => response.json())
            .then(data => {
                data.employee.dateHired = new Date(data.employee.dateHired);
                this.setState({ employee: data.employee });
            })
            .catch(err => { console.log("Error fetching data from server:", err) }
            );
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.employeeUpdate;
        let id = form.id.value;
        let name = form.name.value;
        let extension = form.extension.value;
        let email = form.email.value;
        let title = form.title.value;
        let currentlyEmployed = form.currentlyEmployed.checked;

        let url = `/api/employees/${id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'utf-8'
            },
            body: JSON.stringify({
                "name": name,
                "extension": extension,
                "email": email,
                "title": title,
                "currentlyEmployed": currentlyEmployed
            }),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    alertVisible: true,
                    alertMessage: data.msg,
                });
            })
            .catch(err => { console.log("Error updating employee:", err) });

    }

    render() {
        return (
            <Card>
                <Card.Header as="h5">Edit {this.state.employee.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Container fluid>
                            <form name="employeeUpdate" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col md={2}>ID:</Col>
                                    <Col md="auto"><input type="text" name="id" defaultValue={this.state.employee._id} readOnly="readOnly" /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Name:</Col>
                                    <Col md="auto"><input type="text" name="name" defaultValue={this.state.employee.name} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Extension:</Col>
                                    <Col md="auto"><input type="text" name="extension" maxLength={4} defaultValue={this.state.employee.extension} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Email:</Col>
                                    <Col md="auto"><input type="text" name="email" defaultValue={this.state.employee.email} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Title:</Col>
                                    <Col md="auto"><input type="text" name="title" defaultValue={this.state.employee.title} /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Date Hired:</Col>
                                    <Col md="auto"><input type="text" name="dateHired" defaultValue={this.state.employee.dateHired} readOnly="readOnly" /></Col>
                                </Row>
                                <Row>
                                    <Col md={2}>Currently Employed:</Col>
                                    <Col md="auto"><input type="checkbox" name="currentlyEmployed" defaultChecked={this.state.employee.currentlyEmployed} /></Col>
                                </Row>
                                <Button type="submit" variant="primary" size="sm" className="my-3">
                                    Update Employee
                                </Button>
                                <Alert 
                                    variant={this.state.alertColor} 
                                    show={this.state.alertVisible} 
                                    dismissible 
                                    onClose={() => this.setState({ alertVisible: false })}>
                                        {this.state.alertMessage}
                                </Alert>
                            </form>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}