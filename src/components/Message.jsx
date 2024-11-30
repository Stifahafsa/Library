import React from 'react';

const Message = ({ message, type }) => {
  const alertType = type === 'success' ? 'alert-success' 
                    : type === 'error' ? 'alert-danger' 
                    : 'alert-info';

  return (
    <div className={`alert ${alertType} text-center`} role="alert">
      {message}
    </div>
  );
};

export default Message;
