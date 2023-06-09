import axios from 'axios';
import { getCurrentUser } from 'helpers/Utils';
import React, { useState } from 'react';
import { Form, Label } from 'reactstrap';

const PopupMember = ({ isOpen, onClose, month }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [otpError, setOtpError] = useState('');

  const changeAccountNumber = (value) => {
    setAccountNumber(value);
  };

  const changeOTP = (value) => {
    setOTP(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation logic
    let hasError = false;

    if (accountNumber !== '9704198526191432198') {
      setAccountNumberError('Wrong account number');
      hasError = true;
    } else {
      setAccountNumberError('');
    }

    if (otp !== '123456') {
      setOtpError('Wrong OTP');
      hasError = true;
    } else {
      setOtpError('');
    }

    if (hasError) {
      event.preventDefault();// Prevent form submission if there are errors
      return;
    }

    if (getCurrentUser() != null) {
      const userToken = getCurrentUser().token;
      const Uid = getCurrentUser().uid;
      try {
        const response = await axios.get(`http://localhost:5013/api/Membership?UserID=${Uid}&month=${month}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data.data !== null) {
          const text = `You paid for ${month} month. ${response.data.message}!. Please relogin`
          window.confirm(text)
          // setCurrentUser()
          window.location.href = "/login";
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert("Session expired. Payment fail, relogin")
      }
    } else {
      const text = `Your are not Login yet. Please login/register to pay for membership`
      if (window.confirm(text) === true) {
        window.location.href = "/user/login";
      }
    }
    onClose();
  };
  
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content card">
        <h2 className='m-1'>Payment for {month} month(s) Membership</h2>
        <h2 className='m-1'>with {(month === 1) ? ('10') : ('100')}$</h2>
        
        <Form onSubmit={handleSubmit} className='av-tooltip tooltip-label-right'>
          <div className='form-group'>
            <Label htmlFor="accNum" ><strong>Account Number:</strong></Label>
            <input className='form-control'
              type="number"
              id="accNum"
              name="accNum"
              value={accountNumber}
              onChange={(event) => changeAccountNumber(event.target.value)}
            />
            {accountNumberError && <p className="alert-danger">{accountNumberError}</p>}
          </div>
          <div className='form-group'>
            <Label htmlFor="otp">OTP:</Label>
            <input className='form-control'
              type="number"
              id="otp"
              name="otp"
              value={otp}
              onChange={(event) => changeOTP(event.target.value)}
            />
            {otpError && <p className="alert-danger">{otpError}</p>}
          </div>
          <button type="submit" className='btn btn-primary mr-4'>Submit</button>
          <button type='button' onClick={onClose} className='btn btn-danger'>Close</button>
        </Form>
      </div>
    </div>
  );
};

export default PopupMember;