import React from 'react'
import { Navbar, Container, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import logo from '../logo.png'

const SiteNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ borderRadius: '50%' }}
          />{' '}
          Pet Project
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
          <Button variant="info" style={{ marginRight: "10px" }}><i class="fas fa-plus"></i> new Add</Button>
          <DropdownButton id="dropdown-variants-Info" variant="info" title="Sort by">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
        <a href="#">
          <i class="fas fa-sign-out-alt" style={{ color: "#0dcaf0", marginLeft: "20px" }}></i>
        </a>
      </Container>
    </Navbar >
  )
}

export default SiteNavbar