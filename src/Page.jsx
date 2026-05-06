import React from "react";
import Contents from "./Contents.jsx";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
    const Separator = () => <span> | </span>;
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Employee Management Application</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/employees">All Employees</Nav.Link>
                <Nav.Link href="/reports">Reports</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    )
}