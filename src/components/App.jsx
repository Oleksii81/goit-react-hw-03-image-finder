import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { getImages } from "../Api/api";
import { PER_PAGE } from '../Api/api';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';

export class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    status: 'idle',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, page } = this.state;
    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.fetchLoad();
    }
  }

  fetchLoad = () => {
    const { inputValue, page } = this.state;
    this.setState({ loading: true });
  
    getImages(inputValue, page)
      .then(response => {
        if (response.hits.length === 0) {
          toast.error('Sorry, there are no images matching your search query. Please try again.');
        }
  
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          shouldShowLoadMore: page < Math.ceil(response.totalHits / PER_PAGE),
        }));
      })
      .catch(error => {
        toast.error('Sorry, there was an error. Please try again.');
        this.setState({ status: 'rejected' });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  
  

  getInputValue = handleValue => {
    this.setState({ inputValue: handleValue, page: 1, shouldShowLoadMore: false, images: [] });
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, shouldShowLoadMore, loading } = this.state;

    return (
      <>
        <Searchbar getInputValue={this.getInputValue} />
        {images.length > 0 && <ImageGallery images={images} />}
        {shouldShowLoadMore && <Button loadMoreBtn={this.loadMoreBtn} />}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {(status === 'pending' || loading) && <Loader />}
      </>
    );
  }
}
