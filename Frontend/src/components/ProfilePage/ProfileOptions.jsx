import React, { useState } from "react";
import { ListGroup, Row, Col, Form } from "react-bootstrap";

const ProfileOptions = ({ selectedOption, onOptionChange }) => {
  return (
    <div>
      <ListGroup>
        <h2>Options</h2>
        <ListGroup.Item className="list-group-item-dark">
          <Form>
            <Form.Group as={Row}>
              <Col sm={10}>
                <Form.Check
                  className="mb-3 mt-3 "
                  type="radio"
                  label="My Orders"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={() => onOptionChange("option1")}
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  label="Change Password"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={() => onOptionChange("option2")}
                />
              </Col>
            </Form.Group>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ProfileOptions;
