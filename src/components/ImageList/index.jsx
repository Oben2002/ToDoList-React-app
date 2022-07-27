import React from "react";
//import { useDrag, useDrop } from "react-dnd";

const Image = ({ image }) => {
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" />
    </div>
  );
};

// ImageList Component
const ImageList = ({ images }) => {

  // render each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
      />
    );
  };
  // Return the list of files
  return <section className="file-list">{images.map(renderImage)}</section>;
};


export default ImageList;