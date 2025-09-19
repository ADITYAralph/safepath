import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Aditya Kaushik',
    email: 'aditya@safepath.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    emergencyContact: '+91 98765 43211',
    emergencyContactName: 'Parent/Guardian',
    bloodGroup: 'O+',
    medicalInfo: '',
    profilePicture: '/api/placeholder/100/100',
    nationality: 'Indian',
    passportNumber: '',
    dateOfBirth: '1995-05-15'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save user data to backend
    console.log('Saving user data:', formData);
    setIsEditing(false);
    alert('Profile updated successfully! Your changes have been saved.');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

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
                disabled={!isEditing}
                className={!isEditing ? 'readonly' : ''}
              />
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