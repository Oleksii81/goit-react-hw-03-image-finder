import { styled } from "styled-components";


export const ImageGalleryItemStyles = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 360px;
    box-shadow: 0 20px 38px rgba(0,0,0, 0.1), 0 10px 20px;

.image {
    display: block;
    max-width: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    margin: 0 auto;
    cursor: pointer;
}
.image:hover {
        border-color: #daf52e;
        box-shadow: 0px 3px 20px rgb(247, 243, 4);
    }
`