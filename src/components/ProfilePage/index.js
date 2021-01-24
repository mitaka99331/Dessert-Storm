import React, { useEffect, useState } from "react";
import ProfilePageContainer from "./ProfilePageContainer";
import { useAuth } from "../../firebase/auth";
import { useDatabase } from "../../firebase/database";
import { Nav, Image } from "react-bootstrap";

const ProfilePage = ({ location }) => {
  const { currentUser } = useAuth();
  const { getUserByUid } = useDatabase();

  const [userInfo, setUserInfo] = useState({});
  const [activeTab, setActiveTab] = useState("");

  const params = new URLSearchParams(location.search);
  let userUid = params.get("id");

  useEffect(() => {
    if (!userUid) {
      userUid = currentUser.uid;
    }
    getUserByUid(userUid).then((info) => setUserInfo(info));
  }, [userUid]);

  return (
    <ProfilePageContainer>
      <div className="imageContainer">
        <Image src={userInfo.photoURL} roundedCircle />
        <h1>{userInfo.displayName}</h1>
      </div>
      <Nav variant="pills" defaultActiveKey="Posts" justify>
        <Nav.Item>
          <Nav.Link eventKey="Posts" onSelect={(e) => setActiveTab(e)}>
            Posts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Images" onSelect={(e) => setActiveTab(e)}>
            Images
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Friends" onSelect={(e) => setActiveTab(e)}>
            Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Profile" onSelect={(e) => setActiveTab(e)}>
            Profile
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
