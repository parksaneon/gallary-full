import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [imageUrl, setImageUrl] = useState("/images");
  const [me] = useContext(AuthContext);

  // 처음 로딩했을 때만 실행됨
  useEffect(() => {
    axios
      .get(imageUrl)
      .then((result) => setImages((prevData) => [...prevData, ...result.data]))
      .catch((error) => console.error(error));
  }, [imageUrl]);

  // me 의 값이 바뀔때 마다 실행됨
  useEffect(() => {
    if (me) {
      setTimeout(() => {
        axios
          .get("/users/me/images")
          .then((result) => setMyImages(result.data))
          .catch((err) => console.error(err));
      }, 0);
    } else {
      setMyImages([]);
      setIsPublic(true);
    }
  }, [me]);

  const loaderMoreImages = () => {
    if (images.length === 0) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`/images?lastid=${lastImageId}`);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        myImages,
        setMyImages,
        isPublic,
        setIsPublic,
        loaderMoreImages,
      }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};
