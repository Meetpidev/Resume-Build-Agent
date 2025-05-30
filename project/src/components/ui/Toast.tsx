import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts?: Toast[];
  removeToast?: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts = [], 
  removeToast = () => {} 
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  removeToast: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  }[toast.type];

  return (
    <div 
      className={`${bgColor} text-white rounded-md shadow-lg p-4 min-w-[300px] max-w-md flex justify-between items-center animate-slideIn`}
    >
      <p>{toast.message}</p>
      <button 
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-white/80 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ToastContainer;