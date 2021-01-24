import React from "react";
import FriendsContainer from "./FriendsContainer";
import { Image } from "react-bootstrap";

const Friends = ({ userFrineds }) => (
  <FriendsContainer>
    <h4>Friends</h4>


    {userFrineds &&
      Object.values(userFrineds).map(({ displayName, photoURL }, index) => (
        <div className="user" key={index}>
          <div id={index} className="userBackground"></div>
          <Image src={photoURL} roundedCircle />
          <p>{displayName}</p>
        </div>
      ))}
  </FriendsContainer>
);

export default Friends;
