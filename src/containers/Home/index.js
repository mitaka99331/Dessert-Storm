import React, { useEffect, useState } from "react";
import NewPost from "../../components/NewPost";
import styled from "styled-components";
import { useDatabase } from "../../firebase/database";
import { useAuth } from "../../firebase/auth";
import PeopleYouMayKnow from "../../components/PeopleYouMayKnow";
import Friends from "../../components/Friends";

const HomeContainer = styled.div`
  padding-top: 67px;

  max-width: 1400px;
  margin: auto;

  display: flex;
  justify-content: space-between;

  .homeBody {
    padding-top: 50px;
    text-align: center;
    min-width: 800px;
  }
  .friends {
    height: 80vh;
    width: 300px;
    background-color: red;
  }
`;

const Home = () => {
  const [newPost, setNewPost] = useState(false);
  const [userFrineds, setUserFrineds] = useState({});
  const [friendsPosts, setfriendsPosts] = useState({});

  const { currentUser } = useAuth();
  const { getFriendsPosts, getUserFriends } = useDatabase();

  const setFriends = async () => {
    await getUserFriends().then((friends) => setUserFrineds(friends));
    getFriendsPosts().then((posts) => setfriendsPosts(posts));
  };

  useEffect(() => {
    setFriends();
  }, [newPost]);

  return (
    <HomeContainer>
      <PeopleYouMayKnow currentUser={currentUser.uid} />

      <div className="homeBody">
        <button onClick={() => setNewPost(true)}> aaa</button>
        {newPost && <NewPost setNewPost={setNewPost} />}

        {friendsPosts &&
          Object.keys(friendsPosts).map((key) => {
            if (!friendsPosts[key]) return;
            return Object.values(friendsPosts[key]).map(({ text }, index) => {
              return (
                <p key={index}>
                  ot: {userFrineds[key].displayName}
                  text: {text}
                </p>
              );
            });
          })}
      </div>
      <Friends userFrineds={userFrineds} />
    </HomeContainer>
  );
};

export default Home;
