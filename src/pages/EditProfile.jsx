import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    emergencyContact: '',
    emergencyContactName: '',
    bloodGroup: 'O+',
    medicalInfo: '',
    profilePicture: '/api/placeholder/100/100',
    nationality: '',
    passportNumber: '',
    dateOfBirth: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.displayName || user.email?.split('@')[0] || '',
        email: user.email || '',
        profilePicture: user.photoURL || '/api/placeholder/100/100',
        // Try to load additional data from localStorage or your database
        ...loadUserProfileData(user.uid)
      }));
      setIsLoading(false);
    }
  }, [user]);

  // Function to load additional user profile data
  const loadUserProfileData = (userId) => {
    // Try to load from localStorage first
    const savedProfile = localStorage.getItem(`userProfile_${userId}`);
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }

    // Return default values if no saved data
    return {
      phone: '',
      location: '',
      emergencyContact: '',
      emergencyContactName: '',
      nationality: '',
      dateOfBirth: '',
      medicalInfo: '',
      bloodGroup: 'O+'
    };
  };

  // Function to save user profile data
  const saveUserProfileData = (userId, profileData) => {
    try {
      localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData));
      // Here you would also save to your backend/database
      // await saveToDatabase(userId, profileData);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!user) return;

    // Save the profile data
    const profileDataToSave = {
      phone: formData.phone,
      location: formData.location,
      emergencyContact: formData.emergencyContact,
      emergencyContactName: formData.emergencyContactName,
      nationality: formData.nationality,
      dateOfBirth: formData.dateOfBirth,
      medicalInfo: formData.medicalInfo,
      bloodGroup: formData.bloodGroup
    };

    saveUserProfileData(user.uid, profileDataToSave);
    setIsEditing(false);
    alert('Profile updated successfully! Your changes have been saved.');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload original data
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        ...loadUserProfileData(user.uid)
      }));
    }
  };

  // Show loading state while user data is loading
  if (isLoading || !user) {
    return (
      <div className="edit-profile-container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          color: 'white',
          fontSize: '18px'
        }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            Loading user profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="profile-header">
        <h2>📝 Edit Profile</h2>
        <div className="header-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                ✅ Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          )}
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to SafePath
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-picture-section">
          <img 
            src={formData.profilePicture} 
            alt="Profile" 
            className="large-profile-pic" 
          />
          {isEditing && (
            <button className="change-photo-btn">
              📷 Change Photo
            </button>
          )}
          <div className="user-status">
            <span className="status-indicator online"></span>
            <span>Online</span>
          </div>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '14px' }}>
              User ID: {user.uid?.substring(0, 8)}...
            </p>
          </div>
        </div>

        <div className="form-container">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true} // Email should not be editable
                className="readonly"
              />
              <small style={{ color: '#888', fontSize: '12px' }}>
                Email cannot be changed
              </small>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
                placeholder="Enter your nationality"
              />
            </div>

            <div className="form-group">
              <label>Current Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
                placeholder="Enter your current location"
              />
            </div>
          </div>

          <h3>Emergency & Medical Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
                placeholder="Enter emergency contact name"
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
                placeholder="Enter emergency contact number"
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select 
                name="bloodGroup" 
                value={formData.bloodGroup} 
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Medical Information & Allergies</label>
              <textarea
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleInputChange}
                placeholder="Any allergies, medical conditions, medications, or important health information..."
                rows={4}
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
              />
            </div>
          </div>

          <div className="safety-features">
            <h3>🛡️ SafePath Features</h3>
            <div className="feature-status">
              <div className="feature-item">
                <span className="feature-icon">🆔</span>
                <span>Digital Tourist ID</span>
                <span className="status-badge active">Active</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚨</span>
                <span>Panic Button</span>
                <span className="status-badge active">Enabled</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📍</span>
                <span>Geo-Fencing</span>
                <span className="status-badge active">Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;