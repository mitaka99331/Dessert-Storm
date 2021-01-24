import styled from "styled-components";

const FriendsContainer = styled.div`
  height: 100vh;
  width: 300px;


  padding-top: 30px;

  position: fixed;
  right: 0;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  h4{
    color: white;
    padding-bottom: 20px;
    margin-left: 10px;
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
  /* .user {
    display: flex;
    align-items: center;
    position: relative;
    padding-top:10px;
  }

  .userBackground {
    position: absolute;
    width: 100%;
    height: 100%;

border-radius:10px;;
    z-index: 10;

  } */

  .userBackground:hover:hover{
    background-color: rgb(0,0,0,0.2)
  }

  .user p {
    margin: 0px;
    font-size: 18px;
  }
  .avatar {
    height: 60px;
    width: 60px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: blue;
  }
`;

export default FriendsContainer;