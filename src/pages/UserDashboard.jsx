import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    safetyScore: 85,
    placesVisited: 0,
    safeCheckIns: 0,
    emergencyContacts: 0,
    distanceTraveled: 0,
    alertsSent: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [weatherData] = useState({
    location: 'Current Location',
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h'
  });

  // Load user-specific data when component mounts
  useEffect(() => {
    if (user) {
      loadUserStats();
      loadUserActivity();
      setIsLoading(false);
    }
  }, [user]);

  // Function to load user-specific stats
  const loadUserStats = () => {
    const savedStats = localStorage.getItem(`userStats_${user.uid}`);
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(prevStats => ({ ...prevStats, ...parsedStats }));
      } catch (error) {
        console.error('Error parsing user stats:', error);
      }
    } else {
      // Initialize default stats for new user
      const defaultStats = {
        safetyScore: 85,
        placesVisited: Math.floor(Math.random() * 15) + 1, // Random between 1-15
        safeCheckIns: Math.floor(Math.random() * 50) + 10, // Random between 10-60
        emergencyContacts: 3,
        distanceTraveled: Math.floor(Math.random() * 500) + 50, // Random between 50-550
        alertsSent: Math.floor(Math.random() * 5) // Random between 0-4
      };
      setStats(defaultStats);
      localStorage.setItem(`userStats_${user.uid}`, JSON.stringify(defaultStats));
    }
  };

  // Function to load user-specific activity
  const loadUserActivity = () => {
    const savedActivity = localStorage.getItem(`userActivity_${user.uid}`);
    if (savedActivity) {
      try {
        setRecentActivity(JSON.parse(savedActivity));
      } catch (error) {
        console.error('Error parsing user activity:', error);
        setDefaultActivity();
      }
    } else {
      setDefaultActivity();
    }
  };

  // Set default activity for new users
  const setDefaultActivity = () => {
    const defaultActivity = [
      { icon: '✅', action: 'Profile created successfully', time: '1 day ago', status: 'success' },
      { icon: '🆔', action: 'Digital ID verified', time: '1 day ago', status: 'success' },
      { icon: '🛡️', action: 'Safety features activated', time: '1 day ago', status: 'info' },
      { icon: '📱', action: 'Welcome to SafePath!', time: '1 day ago', status: 'info' }
    ];
    setRecentActivity(defaultActivity);
    localStorage.setItem(`userActivity_${user.uid}`, JSON.stringify(defaultActivity));
  };

  // Function to get user display name
  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Function to add new activity (can be called from other parts of the app)
  const addActivity = (icon, action, status = 'info') => {
    const newActivity = {
      icon,
      action,
      time: 'Just now',
      status
    };

    const updatedActivity = [newActivity, ...recentActivity.slice(0, 9)]; // Keep only last 10
    setRecentActivity(updatedActivity);
    localStorage.setItem(`userActivity_${user.uid}`, JSON.stringify(updatedActivity));
  };

  // Show loading state
  if (isLoading || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px 30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              margin: '0 0 10px 0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              📊 Personal Dashboard
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
              Welcome back, {getUserDisplayName()}! Here's your SafePath summary
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            ← Back to SafePath
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>

          {/* Safety Score */}
          <div style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            borderRadius: '20px',
            padding: '25px',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '100%',
              height: '100%',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            }}></div>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>🛡️ Safety Score</h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: '15px 0',
              position: 'relative',
              zIndex: 1
            }}>
              {stats.safetyScore}/100
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem', position: 'relative', zIndex: 1 }}>
              Excellent Safety Rating
            </p>
          </div>

          {/* Places Visited */}
          <div style={{
            background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
            borderRadius: '20px',
            padding: '25px',
            color: '#333',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>🗺️ Places Visited</h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: '15px 0',
              color: '#667eea'
            }}>
              {stats.placesVisited}
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Locations explored</p>
          </div>

          {/* Distance Traveled */}
          <div style={{
            background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
            borderRadius: '20px',
            padding: '25px',
            color: '#333',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>🚗 Distance</h3>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: '15px 0',
              color: '#f7971e'
            }}>
              {stats.distanceTraveled} km
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Total traveled</p>
          </div>

          {/* Safe Check-ins */}
          <div style={{
            background: 'linear-gradient(135deg, #96fbc4, #f9f586)',
            borderRadius: '20px',
            padding: '25px',
            color: '#333',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>✅ Check-ins</h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: '15px 0',
              color: '#00b894'
            }}>
              {stats.safeCheckIns}
            </div>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Safe arrivals</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              margin: '0 0 25px 0',
              fontSize: '1.5rem',
              color: '#333',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '15px'
            }}>
              📋 Recent Activity
            </h3>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {recentActivity.map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '12px',
                  background: activity.status === 'safe' ? 'rgba(0, 184, 148, 0.1)' :
                             activity.status === 'warning' ? 'rgba(255, 107, 107, 0.1)' :
                             activity.status === 'success' ? 'rgba(0, 184, 148, 0.1)' :
                             'rgba(116, 185, 255, 0.1)',
                  border: `1px solid ${activity.status === 'safe' ? '#00b894' :
                                      activity.status === 'warning' ? '#ff6b6b' :
                                      activity.status === 'success' ? '#00b894' :
                                      '#74b9ff'}20`
                }}>
                  <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>
                    {activity.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: '500', color: '#333' }}>
                      {activity.action}
                    </p>
                    <span style={{ fontSize: '0.9rem', color: '#888' }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* User Info Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              padding: '25px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>
                👤 User Information
              </h4>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={user?.photoURL || '/api/placeholder/60/60'} 
                  alt="Profile"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginBottom: '10px',
                    border: '3px solid white'
                  }}
                />
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>
                  {getUserDisplayName()}
                </div>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', opacity: 0.9 }}>
                  {user?.email}
                </p>
                <p style={{ margin: '5px 0', fontSize: '0.8rem', opacity: 0.7 }}>
                  ID: {user?.uid?.substring(0, 8)}...
                </p>
              </div>
            </div>

            {/* Weather Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              borderRadius: '20px',
              padding: '25px',
              color: 'white'
            }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>
                🌤️ Current Weather
              </h4>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>
                  {weatherData.temperature}
                </div>
                <p style={{ margin: '5px 0', fontSize: '1.1rem' }}>
                  {weatherData.condition}
                </p>
                <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                  📍 {weatherData.location}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '15px',
                  fontSize: '0.9rem'
                }}>
                  <span>💧 {weatherData.humidity}</span>
                  <span>💨 {weatherData.windSpeed}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#333' }}>
                ⚡ Quick Actions
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={() => addActivity('📍', 'Location updated manually')}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>📍</span> Update Current Location
                </button>

                <button 
                  onClick={() => addActivity('🚨', 'Panic button tested successfully', 'safe')}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>🚨</span> Test Panic Button
                </button>

                <button 
                  onClick={() => addActivity('📤', 'Travel itinerary shared with contacts')}
                  style={{
                    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>📤</span> Share Itinerary
                </button>

                <button 
                  onClick={() => window.location.href = '/edit-profile'}
                  style={{
                    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
                    color: '#333',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>👥</span> Emergency Contacts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Features Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            margin: '0 0 25px 0',
            fontSize: '1.5rem',
            color: '#333',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '15px'
          }}>
            🛡️ SafePath Features Status
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(0, 184, 148, 0.1)',
              border: '1px solid rgba(0, 184, 148, 0.2)'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>🆔</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Digital Tourist ID</h4>
                <span style={{
                  background: '#00b894',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓ ACTIVE
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.2)'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>🚨</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Panic Button</h4>
                <span style={{
                  background: '#ff6b6b',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓ ENABLED
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(116, 185, 255, 0.1)',
              border: '1px solid rgba(116, 185, 255, 0.2)'
            }}>
              <span style={{ fontSize: '2rem', marginRight: '15px' }}>📍</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Geo-Fencing</h4>
                <span style={{
                  background: '#74b9ff',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ✓ MONITORING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;