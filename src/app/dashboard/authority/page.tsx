'use client'

import { useState, useEffect } from 'react'
import { Shield, Users, AlertTriangle, MapPin, FileText, Phone } from 'lucide-react'

export default function AuthorityDashboard() {
  const [tourists, setTourists] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalTourists: 0,
    activeTourists: 0,
    highRiskAreas: 3,
    activeAlerts: 0
  })

  useEffect(() => {
    // Load demo data
    loadDemoData()
  }, [])

  const loadDemoData = () => {
    const demoTourists = [
      {
        id: 'tourist-001',
        name: 'John Doe',
        phone: '+91 98765 43210',
        lastLocation: { lat: 28.7041, lng: 77.1025 },
        safetyScore: 85,
        status: 'active',
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 'tourist-002',
        name: 'Jane Smith',
        phone: '+91 87654 32109',
        lastLocation: { lat: 28.6139, lng: 77.2090 },
        safetyScore: 92,
        status: 'active',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ]

    const demoAlerts = [
      {
        id: 'alert-001',
        touristId: 'tourist-001',
        type: 'panic',
        message: 'Emergency panic button pressed',
        location: { lat: 28.7041, lng: 77.1025 },
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        status: 'open'
      }
    ]

    setTourists(demoTourists)
    setAlerts(demoAlerts)
    setStats({
      totalTourists: demoTourists.length,
      activeTourists: demoTourists.filter(t => t.status === 'active').length,
      highRiskAreas: 3,
      activeAlerts: demoAlerts.filter(a => a.status === 'open').length
    })
  }

  const generateEFIR = (tourist: any) => {
    const efir = {
      firNumber: `FIR/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}`,
      touristId: tourist.id,
      touristName: tourist.name,
      lastKnownLocation: `${tourist.lastLocation.lat}, ${tourist.lastLocation.lng}`,
      reportTime: new Date().toISOString(),
      status: 'Missing Person Report'
    }

    // In real implementation, this would save to database and generate PDF
    alert(`E-FIR Generated!\n\nFIR Number: ${efir.firNumber}\nTourist: ${efir.touristName}\nStatus: ${efir.status}\n\nReport has been filed electronically.`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="text-blue-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Authority Dashboard</h1>
                <p className="text-gray-600">Smart Tourist Safety Monitoring System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-semibold">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tourists</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTourists}</p>
              </div>
              <Users className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tourists</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeTourists}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Areas</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.highRiskAreas}</p>
              </div>
              <AlertTriangle className="text-yellow-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-3xl font-bold text-red-600">{stats.activeAlerts}</p>
              </div>
              <div className="relative">
                <AlertTriangle className="text-red-500" size={40} />
                {stats.activeAlerts > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{stats.activeAlerts}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tourist List */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Registered Tourists</h2>
            </div>
            
            <div className="divide-y">
              {tourists.map((tourist) => (
                <div key={tourist.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{tourist.name}</h3>
                        <p className="text-sm text-gray-600">ID: {tourist.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tourist.safetyScore >= 80 ? 'bg-green-100 text-green-800' : 
                        tourist.safetyScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        Safety: {tourist.safetyScore}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Phone:</span> {tourist.phone}
                    </div>
                    <div>
                      <span className="font-medium">Last Seen:</span> {new Date(tourist.lastSeen).toLocaleTimeString()}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Location:</span> {tourist.lastLocation.lat.toFixed(4)}, {tourist.lastLocation.lng.toFixed(4)}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => generateEFIR(tourist)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Generate E-FIR
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Active Alerts</h2>
            </div>
            
            <div className="divide-y">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No active alerts
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="text-red-600" size={20} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{alert.type.toUpperCase()} Alert</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                        <p className="text-gray-500 text-xs mb-3">
                          Tourist ID: {alert.touristId}
                        </p>
                        <p className="text-gray-500 text-xs mb-3">
                          Location: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                        </p>
                        
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            Respond
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                            Close Alert
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
