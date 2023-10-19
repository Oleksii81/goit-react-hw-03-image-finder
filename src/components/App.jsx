import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import Notiflix from 'notiflix';
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {
    inputValue: '',
    modalImg: '',
    showModal: false,
    page: 1,
    shouldShowLoadMore: false,
    totalPages: 0
  };

  getInputValue = handleValue => {
    this.setState({ inputValue: handleValue, page: 1, shouldShowLoadMore: false });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { modalImg, showModal, page, shouldShowLoadMore, totalPages } = this.state;

    return (
      <>
        <Searchbar getInputValue={this.getInputValue} />
        <ImageGallery
          inputValue={this.state.inputValue}
          onClick={this.getLargeImg}
          loadMoreBtn={this.loadMoreBtn}
          page={page}
          shouldShowLoadMore={shouldShowLoadMore}
          totalPages={totalPages}
        />
        {showModal && <Modal url={modalImg} onClose={this.toggleModal} />}
        {shouldShowLoadMore &&
          (page < totalPages ? (
            <Button isVisible={shouldShowLoadMore} onClick={this.loadMoreBtn} />
          ) : (
            Notiflix.Notify.failure('No more results')
          ))}
      </>
    );
  }
}
