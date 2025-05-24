import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  isVisible
}) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (!isVisible) return;
    
    setProgress(100);
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;
      
      if (remaining <= 0) {
        clearInterval(timer);
        onClose();
      } else {
        setProgress(newProgress);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [duration, isVisible, onClose]);
  
  const typeStyles: Record<ToastType, { 
    bgColor: string; 
    iconColor: string;
    darkBgColor: string;
    darkIconColor: string;
    icon: React.ReactNode;
  }> = {
    success: {
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      darkBgColor: 'dark:bg-green-900/20',
      darkIconColor: 'dark:text-green-400',
      icon: <CheckCircle size={18} />
    },
    error: {
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      darkBgColor: 'dark:bg-red-900/20',
      darkIconColor: 'dark:text-red-400',
      icon: <AlertCircle size={18} />
    },
    warning: {
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      darkBgColor: 'dark:bg-amber-900/20',
      darkIconColor: 'dark:text-amber-400',
      icon: <AlertCircle size={18} />
    },
    info: {
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      darkBgColor: 'dark:bg-blue-900/20',
      darkIconColor: 'dark:text-blue-400',
      icon: <Info size={18} />
    }
  };
  
  const currentStyle = typeStyles[type];
  
  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 flex items-center max-w-xs w-full
        p-3 rounded-lg shadow-lg transform transition-all duration-300
        ${currentStyle.bgColor} ${currentStyle.darkBgColor}
        text-slate-800 dark:text-slate-200
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'}
      `}
      role="alert"
    >
      <div className={`flex-shrink-0 ${currentStyle.iconColor} ${currentStyle.darkIconColor}`}>
        {currentStyle.icon}
      </div>
      
      <div className="ml-3 mr-6 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      
      <button
        type="button"
        className="ml-auto text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={16} />
      </button>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full ${currentStyle.iconColor} ${currentStyle.darkIconColor}`} 
          style={{ width: `${progress}%`, transition: 'width 16ms linear' }}
        />
      </div>
    </div>
  );
};

export default Toast;