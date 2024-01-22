import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import Button from "react-bootstrap/Button";
const Header = () => {
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
                area-hidden="true"
              ></i>
            </Link>
          </nav>
          <Link to="/signin" className="text-white nav-link">
            <Button variant="outline-primary" id="button-signin">
              Sign-in
            </Button>
          </Link>
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
