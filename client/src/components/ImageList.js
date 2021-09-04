import React from "react";

const ImageList = ({ images }) => {
  const imgList = images.map((image) => (
    <img
      key={image.key}
      style={{ width: "100%" }}
      src={`http://localhost:5000/uploads${image.key}`}
      alt=""
    />
  ));
  return (
    <div>
      <h3>Image List</h3>
      {imgList}
    </div>
  );
};

export default ImageList;
