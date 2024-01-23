import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Title from "../components/Shared/Title";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../store";
import { USER_SIGNIN } from "../Actions";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/signin", {
        email: email,
        password: password,
      });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <Container className="small-container">
      <Title title="SignIn Page" />
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer? <Link to="/signup">Create your account</Link>
        </div>
        <div className="mb-3">
          Forgot your password? <Link to="/resetpass">Reset password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
