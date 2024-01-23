import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../store";
import { USER_SIGNOUT } from "../../Actions";
const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
  };
  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazonas logo"
              />
            </NavBar.Brand>
          </LinkContainer>
          <SearchBox />
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link">
              <i
                className="fas fa-shopping-cart text-white"
                aria-hidden="true"
              ></i>
            </Link>
          </nav>
          {userInfo ? (
            <NavDropdown
              className="text-white"
              title={userInfo.name}
              id="username"
            >
              <NavDropdown.Divider />
              <Link to="/#signout" onClick={signoutHandler} className="dropdown item">
                Sign out
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/signin" className="text-white nav-link">
              <Button variant="outline-primary" id="button-signin">
                Sign-in
              </Button>
            </Link>
          )}
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
