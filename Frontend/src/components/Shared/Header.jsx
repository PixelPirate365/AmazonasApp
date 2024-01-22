import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
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
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link">
              <i
                className="fas fa-shopping-cart text-white"
                area-hidden="true"
              ></i>
            </Link>
          </nav>
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
