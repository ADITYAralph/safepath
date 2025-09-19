'use client'

import { useState } from 'react'
import { indianMonuments, Monument } from '@/data/monuments'
import { MapPin, Clock, Star, ChevronRight, Search } from 'lucide-react'

interface MonumentSidebarProps {
  onMonumentSelect: (monument: Monument) => void
  selectedMonument?: Monument | null
}

export function MonumentSidebar({ onMonumentSelect, selectedMonument }: MonumentSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('All')
  const [isExpanded, setIsExpanded] = useState(false)

  // Get unique states
  const states = ['All', ...Array.from(new Set(indianMonuments.map(m => m.state)))]

  // Filter monuments
  const filteredMonuments = indianMonuments.filter(monument => {
    const matchesSearch = monument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monument.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === 'All' || monument.state === selectedState
    return matchesSearch && matchesState
  })

  return (
    <>
      <div 
        className={`monument-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="sidebar-header">
          {/* Always visible icon */}
          <div className="sidebar-icon">
            🏛️
          </div>
          
          {/* Expandable content */}
          <div className={`header-content ${isExpanded ? 'visible' : 'hidden'}`}>
            <h2 className="header-title">
              Explore India's Heritage
            </h2>
            
            {/* Search */}
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search monuments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-filter"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Monument List */}
        <div className="monument-list">
          {filteredMonuments.map((monument) => (
            <div
              key={monument.id}
              onClick={() => onMonumentSelect(monument)}
              className={`monument-card ${selectedMonument?.id === monument.id ? 'active' : ''} group`}
            >
              <div className="monument-doodle">
                {monument.doodle}
              </div>
              
              <div className={`monument-info ${isExpanded ? 'visible' : 'hidden'}`}>
                <h3 className="monument-name">{monument.name}</h3>
                <div className="monument-location">
                  <MapPin size={12} />
                  <span>{monument.location}, {monument.state}</span>
                </div>
                <div className="monument-meta">
                  <div className="monument-rating">
                    <Star size={12} fill="currentColor" />
                    <span>{monument.reviews.rating}</span>
                  </div>
                  <div className="monument-type">
                    {monument.type}
                  </div>
                </div>
              </div>

              <ChevronRight size={16} className={`monument-arrow ${isExpanded ? 'visible' : 'hidden'}`} />

              {/* Tooltip for collapsed state */}
              {!isExpanded && (
                <div className="monument-tooltip">
                  <div className="tooltip-name">{monument.name}</div>
                  <div className="tooltip-location">{monument.location}, {monument.state}</div>
                  <div className="tooltip-rating">
                    <Star size={10} fill="currentColor" />
                    {monument.reviews.rating} • {monument.type}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expand indicator */}
        <div className="expand-indicator">
          <div className={`indicator-bar ${isExpanded ? 'expanded' : ''}`}></div>
        </div>
      </div>

      <style jsx>{`
        .monument-sidebar {
          position: fixed;
          left: 0;
          top: 80px;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid #e5e7eb;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          z-index: 40;
          transition: width 0.3s ease-in-out;
        }

        .monument-sidebar.collapsed {
          width: 64px;
        }

        .monument-sidebar.expanded {
          width: 320px;
        }

        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .sidebar-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 10px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3));
        }

        .header-content {
          flex: 1;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }

        .header-content.hidden {
          opacity: 0;
          width: 0;
        }

        .header-content.visible {
          opacity: 1;
          width: auto;
        }

        .header-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
          white-space: nowrap;
        }

        .search-container {
          position: relative;
          margin-bottom: 12px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px 8px 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .state-filter {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
        }

        .state-filter:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .monument-list {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }

        .monument-list::-webkit-scrollbar {
          width: 6px;
        }

        .monument-list::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .monument-list::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .monument-card {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          position: relative;
        }

        .monument-card:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          transform: translateX(4px);
        }

        .monument-card.active {
          background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
          border-color: #3b82f6;
          transform: translateX(4px);
        }

        .monument-doodle {
          font-size: 32px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .monument-info {
          flex: 1;
          min-width: 0;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }

        .monument-info.hidden {
          opacity: 0;
          width: 0;
          margin: 0;
        }

        .monument-info.visible {
          opacity: 1;
          width: auto;
        }

        .monument-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 14px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .monument-location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .monument-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .monument-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #f59e0b;
          font-size: 12px;
          font-weight: 500;
        }

        .monument-type {
          background: #e5e7eb;
          color: #4b5563;
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
        }

        .monument-arrow {
          color: #9ca3af;
          margin-left: 8px;
          transition: all 0.3s ease;
        }

        .monument-arrow.hidden {
          opacity: 0;
          width: 0;
        }

        .monument-arrow.visible {
          opacity: 1;
          width: auto;
        }

        .monument-card:hover .monument-arrow {
          transform: translateX(2px);
        }

        .monument-tooltip {
          position: absolute;
          left: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: #1f2937;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 50;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .monument-tooltip::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          border: 4px solid transparent;
          border-right-color: #1f2937;
        }

        .monument-card.group:hover .monument-tooltip {
          opacity: 1;
        }

        .tooltip-name {
          font-weight: 600;
          margin-bottom: 2px;
        }

        .tooltip-location {
          color: #d1d5db;
          font-size: 11px;
          margin-bottom: 2px;
        }

        .tooltip-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fbbf24;
          font-size: 11px;
        }

        .expand-indicator {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
        }

        .indicator-bar {
          height: 3px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 2px;
          transition: width 0.3s ease;
          width: 24px;
        }

        .indicator-bar.expanded {
          width: 48px;
        }

        @media (max-width: 768px) {
          .monument-sidebar.expanded {
            width: 280px;
          }
        }
      `}</style>
    </>
  )
}
