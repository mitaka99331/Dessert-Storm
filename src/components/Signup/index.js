import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/auth";
import SignupContainer from "./SignupContainer";
import { useDatabase } from "../../firebase/database";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();

  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setError("Password is too short");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");

      localStorage.setItem(
        "userNames",
        JSON.stringify({
          userNames:
            firstNameRef.current.value + " " + lastNameRef.current.value,
        })
      );
      signup(emailRef.current.value, passwordConfirmRef.current.value).then(
        (resp) => resp && setError(resp.message)
      );
    } catch {
      setError("Failed to create an account");
    }
  };

  return (
    <SignupContainer>
      <Card>
        <Card.Body>
          <h2>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                ref={firstNameRef}
                maxLength="20"
                required
              />
            </Form.Group>

            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                ref={lastNameRef}
                maxLength="20"
                required
              />
            </Form.Group>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmatin</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="loginLink">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </SignupContainer>
  );
}
