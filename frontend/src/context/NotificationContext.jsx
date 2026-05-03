import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setNotifications((prev) => [
      { id, message, read: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({
      ...notification,
      read: true,
    })));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
