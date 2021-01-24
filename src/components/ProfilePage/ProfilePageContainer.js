import styled from "styled-components";

const ProfilePageContainer = styled.div`
  height: 100vh;
  width: 920px;
  margin: auto;

  margin-top: 67px;

  display: flex;
  flex-direction: column;

  color: white;

  a {
    color: white;
    font-size: 20px;
    padding: 14px;
  }

  .imageContainer {
    width: 100%;
    height: 300px;

    background: linear-gradient(
      90deg,
      rgba(78, 78, 78, 1) 0%,
      rgba(52, 58, 64, 1) 40%,
      rgba(52, 58, 64, 1) 60%,
      rgba(78, 78, 78, 1) 100%
    );

    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .imageContainer img {
    height: 180px;
    width: 180px;
    margin-bottom: 20px;
  }
`;

export default ProfilePageContainer;
