import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { touristId, latitude, longitude, timestamp } = await request.json()
    
    // In real implementation, save to database
    const panicAlert = {
      id: `panic-${Date.now()}`,
      touristId,
      latitude,
      longitude,
      timestamp,
      status: 'open',
      createdAt: new Date().toISOString()
    }
    
    // Log the panic alert (in real app, save to DB and notify authorities)
    console.log('PANIC ALERT RECEIVED:', panicAlert)
    
    // Here you would:
    // 1. Save to database
    // 2. Send SMS/push notifications to police
    // 3. Alert emergency contacts
    // 4. Log in blockchain for tamper-proof record
    
    return NextResponse.json({ 
      success: true, 
      alertId: panicAlert.id,
      message: 'Emergency alert sent successfully' 
    })
    
  } catch (error) {
    console.error('Panic API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send alert' },
      { status: 500 }
    )
  }
}
