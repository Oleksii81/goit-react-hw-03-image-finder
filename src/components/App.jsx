import { Component } from "react";
import { fetchArticles } from "../Api/api";
import { Containers } from "./Containers/Containers";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state={
    page: 1,
    perPage: 12,
    searchQuery: '',

    images: [],
    webformatURL: [],
    largeImageURL: '',

    isLoading: false,
    showModal: false,
  };


  componentDidUpdate(prevProps, prevState) {
    const {page, searchQuery} = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchImages(searchQuery, page);
    }
  };


  fetchImages = async () => {
    const { searchQuery, page, perPage } = this.state;
    
    try {
      this.setState({ isLoading: true });

      const articles = await fetchArticles(searchQuery, page, perPage);

      if (page === 1) {
        this.setState({ images: articles.hits });
      } 
      else {
        this.setState(prevState => ({
          images: [...prevState.images, ...articles.hits],
        }));
      }

      if (articles.hits.length > 0 && page === 1) {
        toast.success('We found your images!!');
      } 
      else if (articles.hits.length === 0) {
        throw new Error();
      }

    } 
    catch (error) {
      toast.error('Sorry, there are no images matching your search query. Please try again.');
      this.setState({ error: error.message });
    } 
    finally {
      this.setState({ isLoading: false });
    }
  };


  onFormSubmitData = searchQuery => {
    if ((this.state.searchQuery.toLowerCase()).trim() === 
      (searchQuery.toLowerCase()).trim()) {
      return toast.warn(`You are already viewing ${searchQuery}`); 
    }
    this.setState({ 
      searchQuery: (searchQuery.toLowerCase()).trim(), 
      page: 1,
      images: [],
    });
  };


  onLoadMoreData = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };


  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };


  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };


  onClose = () => {
    this.setState({ showModal: false });
  };



  render(){
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

          <Searchbar onSubmit={this.onFormSubmitData}/>

          <Containers>
            <ImageGallery
              articles={this.state.images}
              onClick={this.handleImageClick}       
            />

            {this.state.images.length > 0 && (
              <LoadMoreBtn 
                onClick={this.onLoadMoreData}
                isVisible={!this.state.isLoading} 
              />
            )}

            {this.state.isLoading && (
              <div className="loading-spinner"
                style={{position:'fixed',
                  top: '0',
                  left: '0',
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}>
              </div>
            )}
          </Containers>

          {this.state.showModal && (
            <Modal
              onClose={this.onClose}
              showModal={this.state.showModal}
              largeImageURL={this.state.largeImageURL}
              articles={this.state.images}
            />
          )}
      </>
    )
  };
};