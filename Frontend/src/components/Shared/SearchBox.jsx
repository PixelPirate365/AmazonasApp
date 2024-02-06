import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { getFilterUrl } from "../../utils";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const filterUrl = getFilterUrl(search, { query: searchQuery },false);
    navigate(filterUrl);
  }, [searchQuery]);

  const submitHandler = (e) => {
    e.preventDefault();
    const filterUrl = getFilterUrl(search, { query: searchQuery });
    navigate(filterUrl);
  };

  return (
    <Form className="d-flex me-auto w-50" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search For Product"
          aria-describedby="button-search"
          onChange={(e) => setSearchQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-primary" id="button-search" type="submit">
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
