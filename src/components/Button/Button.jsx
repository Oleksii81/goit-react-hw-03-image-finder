import { LoadMoreBtnStyles } from "./Button.styled";

export const Button = ({loadMoreBtn}) => {
    return(
        <LoadMoreBtnStyles 
            className="load-more"
            type="button"
            onClick={loadMoreBtn}
            >Load more
        </LoadMoreBtnStyles>
    )
};


