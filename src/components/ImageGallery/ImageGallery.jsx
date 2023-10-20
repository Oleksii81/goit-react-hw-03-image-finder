
import Notiflix from 'notiflix';
import { ImageGalleryStyles } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
    return (
        <div>
        <ImageGalleryStyles>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              
            />
          ))}
        </ImageGalleryStyles>
        {images.length === 0 && Notiflix.Notify.failure('No results')}
      </div>
    );
  };


  