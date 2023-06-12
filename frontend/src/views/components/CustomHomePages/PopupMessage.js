import React from 'react';

const PopupMessage = ({ isOpen, onClose, message }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content card pt-1 pr-2">
        <div className='align-items-end pb-3'>
          <button type='button' onClick={onClose} className='close'>x</button>
        </div>
        <div className='h4 p-2'>
          {message}
        </div>
        {/* <button type="submit" className='btn btn-primary' onClick={onClose}>OK</button> */}
      </div>
    </div>
  );
};

export default PopupMessage;