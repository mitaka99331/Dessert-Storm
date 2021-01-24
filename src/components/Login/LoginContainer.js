import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;  
  display: flex;
  align-items: center;
  justify-content: center;

  .CardBody {
    width: 100vh;
    max-width: 400px;
  }
  .forgotenPasswordLink {
    width: 100%;
    text-align: center;
    margin-top: 4%;
  }
  .signupLink {
    width: 100%;
    text-align: center;
    margin-top: 2%;
  }
  h2 {
    text-align: center;
    margin-bottom: 4%;
  }
  button {
    width: 100%;
  }
`;
export default LoginContainer;
