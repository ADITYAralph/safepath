import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [stats, setStats] = useState({
    safetyScore: 85,
    placesVisited: 12,
    safeCheckIns: 48,
    emergencyContacts: 3,
    distanceTraveled: 245,
    alertsSent: 2
  });

  const [recentActivity] = useState([
    { icon: '✅', action: 'Checked in at Red Fort', time: '2 hours ago', status: 'safe' },
    { icon: '📍', action: 'Entered safe zone: Connaught Place', time: '4 hours ago', status: 'info' },
    { icon: '🚨', action: 'Emergency contact updated', time: '1 day ago', status: 'warning' },
    { icon: '🗺️', action: 'Route planned to India Gate', time: '2 days ago', status: 'info' },
    { icon: '🆔', action: 'Digital ID verified', time: '3 days ago', status: 'success' }
  ]);

  const [weatherData] = useState({
    location: 'New Delhi',
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h'
  });

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
              Welcome back, Aditya! Here's your SafePath summary
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

            {/* Weather Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
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
                <button style={{
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
                }}>
                  <span>📍</span> Update Current Location
                </button>

                <button style={{
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
                }}>
                  <span>🚨</span> Test Panic Button
                </button>

                <button style={{
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
                }}>
                  <span>📤</span> Share Itinerary
                </button>

                <button style={{
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
                }}>
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