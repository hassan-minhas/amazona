import React from "react";
import { Link } from "react-router-dom";
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
    <Navbar bg="dark" variant="light" className="py-3" expand="lg">
      <Container>
        <Button
          variant="light"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="text-orange-600 border-orange-600 p-0  min-w-9 min-h-9  hover:border-orange-600 border-1 hover:bg-orange-600 mr-1 hover:text-white"
        >
          <i className="fas fa-bars "></i>
        </Button>

        <LinkContainer to="/">
          <Navbar.Brand className="text-orange-600 hover:text-white transition-all">
            amazona
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="">
          <div className="container mx-auto w-full">
            <SearchBox />
          </div>

          <Nav className="justify-content-end w-40 min-w-40">
            {/* <LinkContainer to="/cart" className="nav-link">
              <Nav.Link className="text-orange-600 flex items-center">
                <div className="mr-1">Cart</div>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer> */}
            <Link
              to="/cart"
              className="nav-link text-sm font-semibold leading-6 relative text-white cursor-pointer flex align-middle justify-center items-center"
            >
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger" className="absolute -top-1 -right-1">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown
                className="text-sm font-semibold leading-6 text-white cursor-pointer"
                title={userInfo.name}
                style={{ color: "white" }}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item className="text-sm font-semibold leading-6 text-gray-800 cursor-pointer">
                    User Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item className="text-sm font-semibold leading-6 text-gray-800 cursor-pointer">
                    Order History
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item text-sm font-semibold leading-6 text-gray-800 cursor-pointer "
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link
                className="nav-link text-sm font-semibold leading-6 text-white cursor-pointer flex align-middle justify-center items-center"
                to="/signin"
              >
                Sign In
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <NavDropdown
                title="Seller"
                id="admin-nav-dropdown"
                className="text-orange-600"
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
                className="text-orange-600"
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
