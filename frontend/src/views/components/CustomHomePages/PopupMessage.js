import React from 'react';

const PopupMessage = ({ isOpen, onClose, message }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content card">
        <div className='alert alert-warning alert-dismissible fade show'>
          <button type='button' onClick={onClose} className='close'>x</button>
          {message}
        </div>
        {/* <button type="submit" className='btn btn-primary' onClick={onClose}>OK</button> */}
      </div>
    </div>
  );
};

export default PopupMessage;