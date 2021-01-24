import React, { useState, useEffect } from "react";
import PeopleYouMayKnowContainer from "./PeopleYouMayKnowContainer";
import { Image } from "react-bootstrap";
import { useDatabase } from "../../firebase/database";
import { Link } from "react-router-dom";

const PeopleYouMayKnow = ({userId}) => {
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

      {latestUsers.map(({ displayName, photoURL ,user }, index) => {
        return (
          <Link
            onClick={handleClickOnUser}
            key={index}
            className="user"
            to={`/profile?id=${user}`}
          >
            <div id={index} className="userBackground"></div>
            <Image src={photoURL} roundedCircle />
            <p>{displayName}</p>
          </Link>
        );
      })}
    </PeopleYouMayKnowContainer>
  );
};

export default PeopleYouMayKnow;
