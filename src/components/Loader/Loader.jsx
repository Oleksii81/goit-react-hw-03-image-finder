import { RotatingLines } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';
import PropTypes from 'prop-types';

export const Loader = ({ loading }) => {
  return (
    <LoaderStyled>
      <RotatingLines
        loading={loading}
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LoaderStyled>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

