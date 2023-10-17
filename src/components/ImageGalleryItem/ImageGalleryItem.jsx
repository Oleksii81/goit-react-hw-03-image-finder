import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemStyles } from "./ImageGalleryItem.styled";

export function ImageGalleryItem({ url, tags, onClick }) {
  return (
            <>
      <ImageGalleryItemStyles>
        <img
          className="image"
          src={url}
          alt={tags}
          onClick={() => onClick(url)}
        />
      </ImageGalleryItemStyles>
    </>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
