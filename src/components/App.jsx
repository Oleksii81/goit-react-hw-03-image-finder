import { Component } from "react";
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
    totalPages: 0,
    loading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue || prevState.page !== this.state.page) {
      this.fetchLoad();
    }
  }

fetchLoad = () => {
  const { inputValue, page } = this.state;

  if (inputValue.trim() === '') {
    toast.error('Please enter a valid search query.');
    return;
  }

  this.setState({ loading: true });

  getImages(inputValue, page)
    .then(response => {
      const totalPages = Math.ceil(response.totalHits / PER_PAGE);
      const shouldShowLoadMore = totalPages > 1;

      if (response.hits.length === 0) {
        toast.error('Sorry, there are no images matching your search query. Please try again.');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        status: 'resolve',
        totalPages: totalPages,
        shouldShowLoadMore: shouldShowLoadMore,
        loading: false,
        error: false,
      }));
    })
    .catch(error => {
      toast.error('Sorry, there was an error. Please try again.');
      this.setState({ status: 'rejected', loading: false, error: true });
    });
};

  getInputValue = handleValue => {
    this.setState({ inputValue: handleValue, page: 1, shouldShowLoadMore: false, images: [] });
  };

  loadMoreBtn = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, shouldShowLoadMore, loading } = this.state;
    if (status === 'pending' || loading) {
      return <Loader />;
    }

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
      </>
    );
  }
}

