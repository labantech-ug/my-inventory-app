import React, { useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'error';
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Example data
    { id: 1, message: 'Low stock on Item A', date: '2025-01-15', type: 'warning' },
    { id: 2, message: 'New order received', date: '2025-01-16', type: 'info' },
  ]);

  useEffect(() => {
    // Logic to fetch notifications from API or server
    console.log('Fetching notifications');
  }, []);

  const handleClearNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getColor = (type: 'info' | 'warning' | 'error'): string => {
    switch (type) {
      case 'info':
        return 'blue';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} style={{ color: getColor(notification.type) }}>
            <p>{notification.message}</p>
            <p>{notification.date}</p>
            <button onClick={() => handleClearNotification(notification.id)}>Clear</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;