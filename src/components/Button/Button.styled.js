import styled from "styled-components";

export const LoadMoreBtnStyles = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 30px;
  background-color: transparent;
  color: #daf52e;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #daf52e;
    box-shadow: 0px 3px 20px rgb(247, 243, 4);
  }

  &:hover::before {
    opacity: 1;
    animation: glowing-border 1s ease-out infinite alternate;
  }

  @keyframes glowing-border {
    0% {
      box-shadow: 0 0 5px #daf52e;
    }
    100% {
      box-shadow: 0 0 20px 10px #daf52e;
    }
  }
`;

