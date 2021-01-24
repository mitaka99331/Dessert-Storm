import styled from "styled-components";

const PeopleYouMayKnowContainer = styled.div`
  height: 100vh;
  width: 300px;

  padding-top: 30px;

  position: fixed;
  overflow: scroll;

  h4 {
    color: white;
    padding-bottom: 20px;
    margin-left: 10px;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  .user {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 10px;
  }

  .userBackground {
    position: absolute;
    width: 100%;
    height: 100%;

    border-radius: 10px;
    z-index: 10;
  }

  .userBackground:hover:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }

  .user p {
    margin: 0px;
    font-size: 18px;
    color: white;
  }
  .user img {
    height: 50px;
    width: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export default PeopleYouMayKnowContainer;
