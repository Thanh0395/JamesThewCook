import React from 'react';
// import { NavLink } from 'react-router-dom';
// import Lightbox from 'react-image-lightbox';

const SingleLightbox = ({ thumb, className }) => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <NavLink to="#" onClick={() => setIsOpen(false)}> */}
        <img src={thumb} alt="thumbnail" className={className} />
      {/* </NavLink> */}

      {/* {isOpen && (
        <Lightbox mainSrc={large} onCloseRequest={() => setIsOpen(false)} />
      )} */}
    </>
  );
};
export default SingleLightbox;
