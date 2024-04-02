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
    <Navbar bg="light" variant="light" className="py-3" expand="lg">
      <Container>
        <Button
          variant="light"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="text-orange-600 border-orange-600 p-0  min-w-9 min-h-9  hover:border-orange-600 border-1 hover:bg-transparent mr-1 hover:text-orange-600"
        >
          <i className="fas fa-bars "></i>
        </Button>

        <LinkContainer to="/">
          <Navbar.Brand className="text-orange-600 flex align-middle items-center justify-center hover:text-orange-600 transition-all">
            <img src="/logo.png" className="w-10 h-auto" alt="" />
            <span className="-mx-1">Turkfy</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          className="text-orange-600 border-orange-600 p-0  min-w-9 min-h-9  hover:border-orange-600 border-1 hover:bg-transparent mr-1 hover:text-orange-600"
          aria-controls="basic-navbar-nav"
        >
          <i className="fas fa-bars "></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="">
          <div className="container mx-auto w-full">
            <SearchBox />
          </div>

          <Nav className="justify-content-end sm:pt-0 pt-6 w-40 min-w-40">
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
              className="nav-link text-sm font-semibold leading-6 relative w-max text-[#212529] cursor-pointer flex align-middle items-center"
            >
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger" className="absolute -top-1 -right-1">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo && !userInfo.isSeller && !userInfo.isAdmin ? (
              <NavDropdown
                className="text-sm font-semibold leading-6 text-[#212529] cursor-pointer"
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
            ) : null}
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
                <Link
                  className="dropdown-item text-sm font-semibold leading-6 text-gray-800 cursor-pointer "
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
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
                <LinkContainer to="/admin/category">
                  <NavDropdown.Item>Categories</NavDropdown.Item>
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
                <Link
                  className="dropdown-item text-sm font-semibold leading-6 text-gray-800 cursor-pointer "
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            )}
            {!userInfo ? (
              <Link
                className="nav-link text-sm font-semibold leading-6 text-[#212529] cursor-pointer flex align-middle items-center"
                to="/signin"
              >
                Sign In
              </Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
