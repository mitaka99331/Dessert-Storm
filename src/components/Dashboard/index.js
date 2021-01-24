import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../firebase/auth";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../NavBar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <NavBar />
    </>
  );
}

{
  /* <Card>
<Card.Body>
  <h2 style={{ textAlign: "center", marginBottom: "4%" }}>Profile</h2>
  {error && <Alert variant="danger">{error}</Alert>}
  <strong>Email:</strong>
  {currentUser.email}
  <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
    Update Profile
  </Link>
</Card.Body>
</Card>
<div style={{ width: "100%", textAlign: "center", marginTop: "2%" }}>
<Button variant="link" onClick={handleLogout}>
  Log Out
</Button>
</div> */
}
