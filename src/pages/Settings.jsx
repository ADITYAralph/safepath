import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Privacy & Security
    locationSharing: true,
    emergencyContactSharing: true,
    dataCollection: false,
    biometricAuth: true,
    twoFactorAuth: false,

    // Notifications
    pushNotifications: true,
    emergencyAlerts: true,
    safetyUpdates: true,
    locationAlerts: true,
    weatherAlerts: false,

    // Safety Features
    autoCheckIn: true,
    panicButtonSensitivity: 'medium',
    geoFencingRadius: 500,
    emergencyAutoCall: true,

    // App Preferences
    language: 'en',
    theme: 'auto',
    mapProvider: 'google',
    units: 'metric'
  });

  const [activeTab, setActiveTab] = useState('privacy');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset logic here
      alert('Settings reset to default values.');
    }
  };

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 20px',
        background: isActive ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
        color: isActive ? 'white' : '#666',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        width: '100%',
        textAlign: 'left'
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label}
    </button>
  );

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div>
        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{label}</div>
        {description && (
          <div style={{ fontSize: '12px', color: '#888' }}>{description}</div>
        )}
      </div>
      <label style={{
        position: 'relative',
        display: 'inline-block',
        width: '50px',
        height: '24px'
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: checked ? '#667eea' : '#ccc',
          borderRadius: '24px',
          transition: '0.2s'
        }}>
          <span style={{
            position: 'absolute',
            content: '""',
            height: '18px',
            width: '18px',
            left: checked ? '26px' : '3px',
            bottom: '3px',
            background: 'white',
            borderRadius: '50%',
            transition: '0.2s'
          }}></span>
        </span>
      </label>
    </div>
  );

  const SelectField = ({ label, value, options, onChange, description }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>
        {label}
      </label>
      {description && (
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          {description}
        </p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '14px',
          background: 'white'
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
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
              ⚙️ Settings & Preferences
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
              Customize your SafePath experience
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '30px'
        }}>

          {/* Sidebar Navigation */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Settings Menu</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <TabButton
                id="privacy"
                label="Privacy & Security"
                icon="🔒"
                isActive={activeTab === 'privacy'}
                onClick={() => setActiveTab('privacy')}
              />
              <TabButton
                id="notifications"
                label="Notifications"
                icon="🔔"
                isActive={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <TabButton
                id="safety"
                label="Safety Features"
                icon="🛡️"
                isActive={activeTab === 'safety'}
                onClick={() => setActiveTab('safety')}
              />
              <TabButton
                id="preferences"
                label="App Preferences"
                icon="🎨"
                isActive={activeTab === 'preferences'}
                onClick={() => setActiveTab('preferences')}
              />
              <TabButton
                id="account"
                label="Account"
                icon="👤"
                isActive={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
              />
            </div>
          </div>

          {/* Settings Content */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 style={{ margin: '0 0 25px 0', color: '#333' }}>🔒 Privacy & Security</h2>

                <ToggleSwitch
                  checked={settings.locationSharing}
                  onChange={(value) => handleSettingChange('locationSharing', value)}
                  label="Location Sharing"
                  description="Share your location with emergency contacts and authorities"
                />

                <ToggleSwitch
                  checked={settings.emergencyContactSharing}
                  onChange={(value) => handleSettingChange('emergencyContactSharing', value)}
                  label="Emergency Contact Sharing"
                  description="Allow emergency contacts to see your real-time location"
                />

                <ToggleSwitch
                  checked={settings.dataCollection}
                  onChange={(value) => handleSettingChange('dataCollection', value)}
                  label="Anonymous Data Collection"
                  description="Help improve SafePath by sharing anonymous usage data"
                />

                <ToggleSwitch
                  checked={settings.biometricAuth}
                  onChange={(value) => handleSettingChange('biometricAuth', value)}
                  label="Biometric Authentication"
                  description="Use fingerprint or face recognition to secure your account"
                />

                <ToggleSwitch
                  checked={settings.twoFactorAuth}
                  onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security with SMS or app-based verification"
                />

                <div style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '25px',
                  color: 'white'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>🔐 Data Privacy</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    Your privacy is our priority. All location data is encrypted and only shared 
                    with your consent. You can delete your data anytime from Account settings.
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ margin: '0 0 25px 0', color: '#333' }}>🔔 Notifications</h2>

                <ToggleSwitch
                  checked={settings.pushNotifications}
                  onChange={(value) => handleSettingChange('pushNotifications', value)}
                  label="Push Notifications"
                  description="Receive notifications on your device"
                />

                <ToggleSwitch
                  checked={settings.emergencyAlerts}
                  onChange={(value) => handleSettingChange('emergencyAlerts', value)}
                  label="Emergency Alerts"
                  description="Critical safety alerts and emergency notifications"
                />

                <ToggleSwitch
                  checked={settings.safetyUpdates}
                  onChange={(value) => handleSettingChange('safetyUpdates', value)}
                  label="Safety Updates"
                  description="Updates about safety conditions in your area"
                />

                <ToggleSwitch
                  checked={settings.locationAlerts}
                  onChange={(value) => handleSettingChange('locationAlerts', value)}
                  label="Location Alerts"
                  description="Alerts when entering or leaving safe/unsafe zones"
                />

                <ToggleSwitch
                  checked={settings.weatherAlerts}
                  onChange={(value) => handleSettingChange('weatherAlerts', value)}
                  label="Weather Alerts"
                  description="Weather warnings and travel advisories"
                />
              </div>
            )}

            {/* Safety Features Tab */}
            {activeTab === 'safety' && (
              <div>
                <h2 style={{ margin: '0 0 25px 0', color: '#333' }}>🛡️ Safety Features</h2>

                <ToggleSwitch
                  checked={settings.autoCheckIn}
                  onChange={(value) => handleSettingChange('autoCheckIn', value)}
                  label="Auto Check-in"
                  description="Automatically check in when arriving at destinations"
                />

                <ToggleSwitch
                  checked={settings.emergencyAutoCall}
                  onChange={(value) => handleSettingChange('emergencyAutoCall', value)}
                  label="Emergency Auto-Call"
                  description="Automatically call emergency services when panic button is activated"
                />

                <SelectField
                  label="Panic Button Sensitivity"
                  value={settings.panicButtonSensitivity}
                  onChange={(value) => handleSettingChange('panicButtonSensitivity', value)}
                  options={[
                    { value: 'low', label: 'Low - Requires long press' },
                    { value: 'medium', label: 'Medium - Standard activation' },
                    { value: 'high', label: 'High - Quick activation' }
                  ]}
                  description="How sensitive the panic button should be to activation"
                />

                <SelectField
                  label="Geo-fencing Radius"
                  value={settings.geoFencingRadius}
                  onChange={(value) => handleSettingChange('geoFencingRadius', value)}
                  options={[
                    { value: 100, label: '100m - Very close monitoring' },
                    { value: 250, label: '250m - Close monitoring' },
                    { value: 500, label: '500m - Standard monitoring' },
                    { value: 1000, label: '1km - Wide monitoring' }
                  ]}
                  description="Distance for geo-fence alerts around your location"
                />

                <div style={{
                  background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '25px',
                  color: 'white'
                }}>
                  <h4 style={{ margin: '0 0 15px 0' }}>🆘 Emergency Contacts</h4>
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    <p style={{ margin: '0 0 10px 0' }}>Current emergency contacts: 3</p>
                    <button style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      Manage Emergency Contacts
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* App Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 style={{ margin: '0 0 25px 0', color: '#333' }}>🎨 App Preferences</h2>

                <SelectField
                  label="Language"
                  value={settings.language}
                  onChange={(value) => handleSettingChange('language', value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'hi', label: 'Hindi' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' }
                  ]}
                />

                <SelectField
                  label="Theme"
                  value={settings.theme}
                  onChange={(value) => handleSettingChange('theme', value)}
                  options={[
                    { value: 'light', label: 'Light Theme' },
                    { value: 'dark', label: 'Dark Theme' },
                    { value: 'auto', label: 'Auto (System)' }
                  ]}
                />

                <SelectField
                  label="Map Provider"
                  value={settings.mapProvider}
                  onChange={(value) => handleSettingChange('mapProvider', value)}
                  options={[
                    { value: 'google', label: 'Google Maps' },
                    { value: 'openstreet', label: 'OpenStreetMap' },
                    { value: 'mapbox', label: 'Mapbox' }
                  ]}
                  description="Choose your preferred map service"
                />

                <SelectField
                  label="Units"
                  value={settings.units}
                  onChange={(value) => handleSettingChange('units', value)}
                  options={[
                    { value: 'metric', label: 'Metric (km, °C)' },
                    { value: 'imperial', label: 'Imperial (miles, °F)' }
                  ]}
                />
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div>
                <h2 style={{ margin: '0 0 25px 0', color: '#333' }}>👤 Account Management</h2>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    📝 Update Profile Information
                  </button>

                  <button style={{
                    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    🔑 Change Password
                  </button>

                  <button style={{
                    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
                    color: '#333',
                    border: 'none',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    📊 Download My Data
                  </button>

                  <button style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}>
                    🗑️ Delete Account
                  </button>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '25px'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>📋 Account Information</h4>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    <p><strong>Account Created:</strong> January 15, 2024</p>
                    <p><strong>Last Login:</strong> Today, 2:30 PM</p>
                    <p><strong>Digital ID Status:</strong> Verified</p>
                    <p><strong>Data Storage:</strong> 15.2 MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* Save/Reset Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              marginTop: '40px',
              paddingTop: '25px',
              borderTop: '2px solid #f0f0f0'
            }}>
              <button
                onClick={resetSettings}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Reset to Default
              </button>
              <button
                onClick={saveSettings}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                💾 Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;