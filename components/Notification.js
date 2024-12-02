import React, { useState, useEffect } from 'react';
import { useChats } from './context/ChatsContext';

const Notification = ({ text }) => {
const {setIsShowNotification} = useChats()
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsShowNotification(false);
    }, 10000); // Close after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setIsShowNotification(false);
  };

  const handleCancel = () => {
    setIsShowNotification(false);
  };

  return (
    <>
        <div className="notification">
          <p>{text}</p>
          <div className='button-container'>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
    </>
  );
};

export default Notification;