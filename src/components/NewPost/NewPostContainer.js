import styled from "styled-components";

const NewPostContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(33, 37, 41, 0.8);

  .card-body {
    text-align: center;
    width: 100vh;
    max-width: 600px;
    background-color: #4e4e4e;
    color: white;
  }
`;

export default NewPostContainer;
