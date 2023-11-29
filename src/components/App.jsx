import { React } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImages } from 'API';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { Pagination } from './Button/Button';
import { Wrapper } from './App.styled'
import { Loader } from './Loader/Loader'
import { notifyInfo, success } from './Notify/Notify'
import { useState, useEffect } from 'react';

export const App = () => {
  const [query,setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [randomId, setRandomId] = useState(false);

  const onSubmit = (query) => {
    setQuery(query);
    setRandomId(Math.floor(Math.random() * 100));
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;
    const loadResult = async () => {
      try {
        setLoading(true);
        const result = await fetchImages(query, page);

        if (result.length === 0) {
          notifyInfo();
        } else {
          setImages((prevImages) => [...prevImages, ...result]);
          setShowBtn(result.length === 12 || result.length === 0);
          success(query);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadResult();
  }, [query, page, randomId]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={onSubmit} />
      {loading && <Loader />}
      {images.length > 0 && <Gallery imgItems={images} />}
      {showBtn && <Pagination onClick={handleLoadMore}>Load More</Pagination>}
      <Toaster position="top-right" reverseOrder={true} />
    </Wrapper>
  )
};