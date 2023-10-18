import PropTypes from 'prop-types';
import { LoadMoreBtnStyles } from "./Button.styled";

export const Button = ({isVisible, onClick}) => {
    return(
        <LoadMoreBtnStyles 
            className="load-more"
            type="button"
            style={{ display: isVisible ? 'block' : 'none' }}
            onClick={onClick}
            >Load more
        </LoadMoreBtnStyles>
    )
};

Button.propTypes ={
    onClick: PropTypes.func.isRequired,
};