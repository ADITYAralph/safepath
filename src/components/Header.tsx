'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Bell, MessageCircle, User, Settings, LifeBuoy, LogOut, Menu } from 'lucide-react'

interface HeaderProps {
  userName?: string
  userImage?: string
}

export function Header({ userName = "Aditya Kaushik", userImage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New monument review posted for Taj Mahal", time: "2m ago", type: "review" },
    { id: 2, message: "Safety alert: High crowd at Red Fort", time: "15m ago", type: "alert" },
    { id: 3, message: "Your digital ID has been verified", time: "1h ago", type: "success" }
  ])

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Implement search functionality here
    }
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'review': return '⭐'
      case 'alert': return '🚨'
      case 'success': return '✅'
      default: return '🔔'
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🛡️</span>
            <div className="logo-text">
              <h1>SafePath</h1>
              <p>Smart Tourist Safety System</p>
            </div>
          </div>
        </div>

        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Find monuments, locations, safety info..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <kbd className="search-shortcut">F</kbd>
            </div>
          </form>
        </div>

        <div className="header-right">
          {/* Feedback Button */}
          <button className="feedback-btn">
            <MessageCircle size={18} />
            <span>Feedback</span>
          </button>

          {/* Notifications */}
          <div className="notification-container" ref={notificationRef}>
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <span className="notification-count">{notifications.length}</span>
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="notification-item"
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-notifications">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="profile-container" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">
                {userImage ? (
                  <img src={userImage} alt={userName} />
                ) : (
                  <div className="avatar-placeholder">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <span className="profile-name">{userName}</span>
                <div className="profile-status"></div>
              </div>
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-avatar-large">
                    {userImage ? (
                      <img src={userImage} alt={userName} />
                    ) : (
                      <div className="avatar-placeholder-large">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="profile-dropdown-info">
                    <h4>{userName}</h4>
                    <p>Tourist ID: TID{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>

                <div className="profile-menu-items">
                  <button className="profile-menu-item">
                    <User size={18} />
                    <span>Edit Profile</span>
                  </button>
                  <button className="profile-menu-item">
                    <Settings size={18} />
                    <span>Dashboard</span>
                  </button>
                  <button className="profile-menu-item">
                    <LifeBuoy size={18} />
                    <span>Customer Care</span>
                  </button>
                </div>

                <div className="profile-menu-footer">
                  <button className="profile-menu-item logout">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(135deg, #1a1f2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 50;
          backdrop-filter: blur(10px);
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          font-size: 32px;
          filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
        }

        .logo-text h1 {
          color: white;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }

        .logo-text p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          margin: 0;
          line-height: 1.2;
        }

        .header-center {
          flex: 1;
          max-width: 600px;
          margin: 0 40px;
        }

        .search-form {
          width: 100%;
        }

        .search-container {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 44px;
          padding: 0 80px 0 48px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-shortcut {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .feedback-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .feedback-btn:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }

        .notification-container {
          position: relative;
        }

        .notification-btn {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notification-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #dc2626;
          color: white;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          min-width: 18px;
          text-align: center;
        }

        .notification-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          z-index: 100;
        }

        .notification-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .notification-count {
          background: #3b82f6;
          color: white;
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 12px 20px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          gap: 12px;
        }

        .notification-item:hover {
          background: #f9fafb;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .notification-content {
          flex: 1;
        }

        .notification-content p {
          margin: 0 0 4px 0;
          color: #374151;
          font-size: 14px;
          line-height: 1.4;
        }

        .notification-time {
          color: #6b7280;
          font-size: 12px;
        }

        .no-notifications {
          padding: 40px 20px;
          text-align: center;
          color: #6b7280;
        }

        .profile-container {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        .profile-name {
          color: white;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.2;
        }

        .profile-status {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          right: -12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          z-index: 100;
        }

        .profile-dropdown-header {
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .profile-avatar-large {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          overflow: hidden;
        }

        .profile-avatar-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder-large {
          width: 100%;
          height: 100%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
        }

        .profile-dropdown-info h4 {
          margin: 0 0 4px 0;
          color: #1f2937;
          font-size: 16px;
          font-weight: 600;
        }

        .profile-dropdown-info p {
          margin: 0;
          color: #6b7280;
          font-size: 12px;
        }

        .profile-menu-items {
          padding: 8px;
        }

        .profile-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
          font-size: 14px;
          text-align: left;
        }

        .profile-menu-item:hover {
          background: #f3f4f6;
        }

        .profile-menu-footer {
          padding: 8px;
          border-top: 1px solid #e5e7eb;
        }

        .profile-menu-item.logout {
          color: #dc2626;
        }

        .profile-menu-item.logout:hover {
          background: #fef2f2;
        }

        @media (max-width: 768px) {
          .header {
            padding: 0 16px;
          }
          
          .header-center {
            margin: 0 16px;
          }
          
          .logo-text {
            display: none;
          }
          
          .feedback-btn span {
            display: none;
          }
          
          .profile-name {
            display: none;
          }
          
          .notification-dropdown,
          .profile-dropdown {
            width: 280px;
          }
        }
      `}</style>
    </>
  )
}
