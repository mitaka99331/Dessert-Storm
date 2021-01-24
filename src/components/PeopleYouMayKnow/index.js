import React, { useState, useEffect } from "react";
import PeopleYouMayKnowContainer from "./PeopleYouMayKnowContainer";
import { Form, Button, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useDatabase } from "../../firebase/database";

const PeopleYouMayKnow = () => {
  const { getLatestUsers, addFriend } = useDatabase();
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    getLatestUsers().then((users) => setLatestUsers(users));
  }, []);

  const handleClickOnUser = (e) => {
    addFriend(latestUsers[e.target.id].user);
  };

  return (
    <PeopleYouMayKnowContainer>
      <h4>People You May Know</h4>

      {latestUsers.map(({ displayName, photoURL }, index) => {
        return (
          <div className="user" onClick={handleClickOnUser} key={index}>
            <div id={index} className="userBackground"></div>
            <Image src={photoURL} roundedCircle />
            <p>{displayName}</p>
          </div>
        );
      })}
    </PeopleYouMayKnowContainer>
  );
};

export default PeopleYouMayKnow;
