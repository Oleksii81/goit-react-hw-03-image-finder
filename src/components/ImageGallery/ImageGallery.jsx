
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
        
      </div>
    );
  };




  