import { styled } from "styled-components";

export const LoadMoreBtnStyles = styled.div`
    display: flex;
    justify-content: center;
    .button {
    display: block;
    justify-content: center;
    padding: 10px 20px;
    margin: 20px 10px;
    border: 2px solid transparent;
    border-radius: 30px;
    background-color: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    position: relative;
    margin-top: 20px;
    align-self: center;
    }
  .load-more:hover {
    border-color: #daf52e;
    box-shadow: 0px 3px 20px rgb(247, 243, 4);
  }
  .load-more:hover::before {
    opacity: 1;
    animation: glowing-border 1s ease-out infinite alternate;
  }
`