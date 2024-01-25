import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../store";
import { toast } from "react-toastify";
import { USER_SIGNOUT } from "../../Actions";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const signoutHandler = () => {
    try {
      //add cookies after
      ctxDispatch({ type: USER_SIGNOUT });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      toast.success("Sign out successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          {window.location.pathname !== "/" && (
            <div className="d-flex align-items-left justify-content-end me-2 ms-4">
              <Button variant="outline-primary" id="button-signin" onClick={() => navigate(-1)}>
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </Button>
            </div>
          )}
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
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </nav>
          {userInfo ? (
            <NavDropdown
              className="text-white"
              title={userInfo.name}
              id="username"
            >
              <NavDropdown.Divider />
              <Link to="/profile" className="dropdown-item ">
                Profile
              </Link>
              <NavDropdown.Divider />
              <Link
                to="/#signout"
                onClick={signoutHandler}
                className="dropdown-item text-danger"
              >
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
