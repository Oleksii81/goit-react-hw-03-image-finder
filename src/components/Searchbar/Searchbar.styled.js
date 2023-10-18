import { styled } from "styled-components";

export const SearchStyles = styled.form`
    display: flex;
    position: relative;
    padding: 48px;
    justify-content: center;
    .button{
        padding: 10px 20px;
        margin-left: 10px;
        border: 2px solid transparent;
        border-radius: 30px;
        background-color: transparent;
        color: #daf52e;
        font-size: 16px;
        font-weight: bold;
        outline: none;
        cursor: pointer;
        position: relative;
    }
    .input{
        padding: 12px;
        border: 2px solid transparent;
        border-radius: 30px;
        background-color: transparent;
        color: #daf52e;
        font-size: 16px;
        outline: none;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
        transition: border-color 0.5s ease-out, box-shadow 0.5s ease-out;
    }
    .button[type='submit']::before,
    .input[type='text']::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 30px;
        border: 2px solid #daf52e;
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
    .button[type='submit']:hover,
    .input[type='text']:hover {
        border-color: #daf52e;
        box-shadow: 0px 3px 20px rgb(247, 243, 4);
    }
`