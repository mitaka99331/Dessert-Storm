import styled from "styled-components";

const NavBarContainer = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  width: 100%;
  z-index:100;
  .NavSurch {
    margin-left: 100px;
  }
  .NavDropdown {
    margin-right: 50px;
    display:flex;
    align-items:center;
  }
  .NavDropdown img {
    height: 50px;
    width: 50px;
  }
`;

export default NavBarContainer;
