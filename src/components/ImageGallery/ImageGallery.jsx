import PropTypes from 'prop-types';
import { Component } from "react";
import { getImages } from "../../Api/api";
import { PER_PAGE } from '../../Api/api';
import { Loader } from '../Loader/Loader';
import { LoadMoreBtn } from '../Button/Button';
import Notiflix from 'notiflix';
import { ImageGalleryStyles } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export class ImageGallery extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      inputValue: PropTypes.string.isRequired,
    };
  
    state = {
      images: [],
      status: 'idle',
      totalPages: 0,
    };
  
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.inputValue !== this.props.inputValue) {
        this.fetchLoad();
      }
      if (prevProps.page !== this.props.page && this.props.page > 1) {
        this.fetchLoadMore();
      }
    }
  
    fetchLoad = () => {
      const { inputValue, page } = this.props;
  
      getImages(inputValue, page)
        .then(response => {
          const totalPages = Math.ceil(response.totalHits / PER_PAGE);
          const shouldShowLoadMore = totalPages > 1;
  
          this.setState({
            images: response.hits,
            status: 'resolve',
            totalPages: totalPages,
            shouldShowLoadMore: shouldShowLoadMore,
          });
        })
        .catch(_error => this.setState({ status: 'rejected' }));
    };
  
    fetchLoadMore = () => {
      const { inputValue, page } = this.props;
  
      getImages(inputValue, page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            status: 'resolve',
          }));
        })
        .catch(_error => this.setState({ status: 'rejected' }));
    };
  
    render() {
      const { images, status, shouldShowLoadMore } = this.state;
  
      if (status === 'pending') {
        return <Loader />;
      }
  
      if (status === 'resolve') {
        return (
          <div>
            <ImageGalleryStyles>
              {images.map(({ id, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  url={largeImageURL}
                  tags={tags}
                  onClick={this.props.onClick}
                />
              ))}
            </ImageGalleryStyles>
            {shouldShowLoadMore &&
              (this.props.page < this.state.totalPages ? (
                <LoadMoreBtn onClick={this.props.loadMoreBtn} />
              ) : (
                Notiflix.Notify.failure('No more results')
              ))}
            {images.length === 0 && Notiflix.Notify.failure('No results')}
          </div>
        );
      }
  
      return null;
    }
  }

  