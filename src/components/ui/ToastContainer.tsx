import React from 'react';
import Toast from './Toast';

interface ToastContainerProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  show,
  message,
  type = 'info',
  onClose
}) => {
  return (
    <Toast
      message={message}
      type={type}
      isVisible={show}
      onClose={onClose}
      duration={3000}
    />
  );
};

export default ToastContainer;