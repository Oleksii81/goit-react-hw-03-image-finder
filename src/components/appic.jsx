import React, { PureComponent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css'
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { fetchImages } from './Api/Api';
import { Loader} from '../components/Loader/Loader'

class App extends PureComponent {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    error: false,
    loadMore: false,
  }

  async componentDidUpdate(prevProps, prevState) {
  
    
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      try {
        this.setState({ loading: true, error: false })
        const { query, page } = this.state;
        const fetchedImages = await fetchImages(query, page);

        
        if (query.trim() === '') {
      toast.error('Please enter valid request');
      return;
    }

        if (fetchedImages.hits.length === 0) {
          toast.info('There are no pictures matching your request')
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...fetchedImages.hits],
          loadMore: page < Math.ceil(fetchedImages.totalHits / 12),
 
        }))
              }
          catch (error) {
        this.setState({ error: true })
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  
  onFormSubmit = (value) => {
    const { query } = this.state;
      
    if (query === value) {
      return;
    }
      this.setState({ query: value, images: [],
        page: 1, error: false, loadMore: false });
  }

  onLoadMore = () => {
    this.setState(prevState => ({
         page: prevState.page + 1  
        }));
  }
 
  
render() {
    const { images, loading, error, loadMore} = this.state;
  return(
    <div className={css.App}>
      <Searchbar onSubmit={this.onFormSubmit} />
      {error && toast.error(`Whoops, something went wrong. Try reloading the page`)}
      {loading && <Loader/>}
      {images.length > 0 && <ImageGallery images={images} />}
      {loadMore && <Button onLoadMore={this.onLoadMore} />}
      <ToastContainer autoClose={4000} theme="colored" />
    </div>
  )
  };
}

export default App;