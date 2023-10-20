import React from 'react';
import { Component } from "react";
import PropTypes from 'prop-types';
import { ImageGalleryItemStyles } from "./ImageGalleryItem.styled";
import { Modal } from "../Modal/Modal";

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    modalImg: '',
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  render() {
    const { url, tags } = this.props;
    const { showModal, modalImg } = this.state;
  
 
  return (
    <>
      <ImageGalleryItemStyles>
        <img
          className="image"
          src={url}
          alt={tags}
          onClick={() => this.getLargeImg(url)}
        />
      </ImageGalleryItemStyles>
      {showModal && <Modal url={modalImg} onClose={this.toggleModal} />}
    </>
  );
}
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};


