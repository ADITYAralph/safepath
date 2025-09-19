'use client'

import { useState } from 'react'
import { Monument } from '@/data/monuments'
import { MapPin, Clock, Star, Phone, Navigation, Calendar, DollarSign, Camera, Route } from 'lucide-react'
import { NavigationMap } from './NavigationMap'

interface MonumentDetailProps {
  monument: Monument
  onClose: () => void
}

export function MonumentDetail({ monument, onClose }: MonumentDetailProps) {
  const [showNavigationMap, setShowNavigationMap] = useState(false)

  return (
    <div className="monument-detail-overlay">
      <div className="monument-detail-container">
        {/* Close Button */}
        <button onClick={onClose} className="close-button">
          ✕
        </button>

        {/* Hero Section */}
        <div className="monument-hero">
          <img 
            src={monument.mainImage} 
            alt={monument.name}
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="monument-doodle-large">{monument.doodle}</div>
              <h1 className="monument-title">{monument.name}</h1>
              <div className="monument-subtitle">
                <MapPin size={18} />
                <span>{monument.location}, {monument.state}</span>
              </div>
              <div className="monument-rating-large">
                <Star size={20} fill="currentColor" />
                <span>{monument.reviews.rating}</span>
                <span>({monument.reviews.totalReviews.toLocaleString()} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="monument-content">
          {/* Quick Info Cards */}
          <div className="info-cards-grid">
            <div className="info-card">
              <Clock className="info-icon" />
              <div>
                <h4>Timings</h4>
                <p>{monument.timings.hours}</p>
                <small>{monument.timings.days}</small>
              </div>
            </div>

            <div className="info-card">
              <DollarSign className="info-icon" />
              <div>
                <h4>Entry Fee</h4>
                <p>Indians: {monument.timings.entryFee.indian}</p>
                <small>Foreigners: {monument.timings.entryFee.foreign}</small>
              </div>
            </div>

            <div className="info-card">
              <Navigation className="info-icon" />
              <div>
                <h4>Distance</h4>
                <p>{monument.location_details.distanceFromCity}</p>
                <small>From city center</small>
              </div>
            </div>

            <div className="info-card">
              <Calendar className="info-icon" />
              <div>
                <h4>Built In</h4>
                <p>{monument.builtIn}</p>
                <small>By {monument.builtBy}</small>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <section className="content-section">
            <h2>About {monument.name}</h2>
            <p>{monument.description}</p>
          </section>

          {/* History Section */}
          <section className="content-section">
            <h2>History</h2>
            <p>{monument.history}</p>
          </section>

          {/* Architecture Section */}
          <section className="content-section">
            <h2>Architecture</h2>
            <p>{monument.architecture}</p>
          </section>

          {/* How to Reach - UPDATED SECTION */}
          <section className="content-section">
            <h2>How to Reach</h2>
            <div className="travel-options">
              <div className="travel-option">
                <h4>✈️ By Air</h4>
                <p>{monument.howToReach.byAir}</p>
              </div>
              <div className="travel-option">
                <h4>🚂 By Train</h4>
                <p>{monument.howToReach.byTrain}</p>
              </div>
              <div className="travel-option">
                <h4>🚗 By Road</h4>
                <p>{monument.howToReach.byRoad}</p>
              </div>
            </div>
            
            {/* NEW: View on Map Button */}
            <button 
              onClick={() => setShowNavigationMap(true)}
              className="view-on-map-btn"
            >
              <Route size={18} />
              <span>View on Map & Get Directions</span>
              <MapPin size={16} />
            </button>
          </section>

          {/* Location Details */}
          <section className="content-section">
            <h2>Location Details</h2>
            <div className="location-info">
              <p><strong>Address:</strong> {monument.location_details.address}</p>
              <p><strong>Nearest Railway Station:</strong> {monument.location_details.nearestStation}</p>
              <p><strong>Nearest Airport:</strong> {monument.location_details.nearestAirport}</p>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="content-section">
            <h2>Recent Reviews</h2>
            <div className="reviews-list">
              {monument.reviews.recentReviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5>{review.author}</h5>
                        <div className="review-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="content-section">
            <h2>Gallery</h2>
            <div className="photo-gallery">
              {monument.gallery.map((photo, index) => (
                <img 
                  key={index}
                  src={photo} 
                  alt={`${monument.name} ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Navigation Map Modal - NEW */}
      {showNavigationMap && (
        <NavigationMap 
          monument={monument}
          onClose={() => setShowNavigationMap(false)}
        />
      )}

      <style jsx>{`
        .monument-detail-overlay {
          position: fixed;
          top: 0;
          left: 320px; /* Start after sidebar */
          right: 0;
          bottom: 0;
          background: white;
          z-index: 50;
          overflow-y: auto;
        }

        .monument-detail-container {
          position: relative;
        }

        .close-button {
          position: fixed;
          top: 100px;
          right: 30px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          cursor: pointer;
          z-index: 51;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .monument-hero {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 40px;
        }

        .hero-content {
          color: white;
        }

        .monument-doodle-large {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .monument-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .monument-subtitle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.2rem;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .monument-rating-large {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fbbf24;
          font-size: 1.1rem;
        }

        .monument-content {
          padding: 40px;
          max-width: 1000px;
        }

        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        }

        .info-icon {
          color: #3b82f6;
          flex-shrink: 0;
        }

        .info-card h4 {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .info-card p {
          color: #4b5563;
          margin-bottom: 2px;
        }

        .info-card small {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .content-section {
          margin-bottom: 40px;
        }

        .content-section h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 16px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }

        .content-section p {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .travel-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .travel-option {
          padding: 20px;
          background: #f1f5f9;
          border-radius: 8px;
        }

        .travel-option h4 {
          color: #1e40af;
          margin-bottom: 8px;
        }

        /* NEW: View on Map Button Styles */
        .view-on-map-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
          margin-top: 24px;
        }

        .view-on-map-btn:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .view-on-map-btn:active {
          transform: translateY(0);
        }

        .location-info p {
          margin-bottom: 8px;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-card {
          padding: 20px;
          background: #fafafa;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .reviewer-info h5 {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .review-rating {
          display: flex;
          gap: 2px;
          color: #fbbf24;
        }

        .review-date {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .review-text {
          color: #4b5563;
          line-height: 1.6;
        }

        .photo-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .gallery-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .gallery-image:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .monument-detail-overlay {
            left: 0;
          }
          
          .monument-title {
            font-size: 2rem;
          }
          
          .monument-content {
            padding: 20px;
          }
          
          .info-cards-grid {
            grid-template-columns: 1fr;
          }

          .view-on-map-btn {
            padding: 14px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
