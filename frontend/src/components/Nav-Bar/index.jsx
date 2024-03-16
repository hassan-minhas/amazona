import React from "react";
import {
  Navbar,
  Container,
  Button,
  Nav,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useContext } from "react";
import SearchBox from "../SearchBox";

function NavBar({
  sidebarIsOpen,
  setSidebarIsOpen,
  cart,
  userInfo,
  signoutHandler,
  categories,
}) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Button
          variant="light"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="text-orange-500"
        >
          <i className="fas fa-bars text-orange-500"></i>
        </Button>

        <LinkContainer to="/">
          <Navbar.Brand className="text-orange-500">amazona</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="">

          <div className="container mx-auto w-full">
            <SearchBox />
          </div>

          <Nav className="  justify-content-end">
            <LinkContainer to="/cart" className="nav-link">
              <Nav.Link className="text-orange-500 flex items-center">
                <div className="mr-1">Cart</div>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="basic-nav-dropdown"
                className="text-orange-500"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={signoutHandler}
                  className="text-orange-500"
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/signin">
                <Nav.Link className="text-orange-500">Sign In</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isSeller && (
              <NavDropdown
                title="Seller"
                id="admin-nav-dropdown"
                className="text-orange-500"
              >
                <LinkContainer to={`/seller/${userInfo._id}`}>
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title="Admin"
                id="admin-nav-dropdown"
                className="text-orange-500"
              >
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/support">
                  <NavDropdown.Item>Support</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
