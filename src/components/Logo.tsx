interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'default' | 'white' | 'mono'
}

export function Logo({ size = 'md', className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const svgColors = {
    default: {
      shield: '#22C55E',
      path: 'url(#blueGradient)',
      arrow: '#0EA5E9'
    },
    white: {
      shield: '#FFF',
      path: 'url(#whiteGradient)', 
      arrow: '#0EA5E9'
    },
    mono: {
      shield: '#374151',
      path: '#6B7280',
      arrow: '#374151'
    }
  }

  const colors = svgColors[variant]

  return (
    <img 
      src={`data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4 L32 8 L32 20 C32 28 26 34 20 36 C14 34 8 28 8 20 L8 8 Z" 
                fill="none" stroke="${colors.shield}" stroke-width="2"/>
          <path d="M20 12 Q16 16 14 20 Q16 24 20 28 Q24 24 26 20 Q24 16 20 12 Z" 
                fill="${colors.path}"/>
          <path d="M20 12 L18 14 L19 14 L19 18 L21 18 L21 14 L22 14 Z" 
                fill="${colors.arrow}"/>
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3B82F6"/>
              <stop offset="100%" style="stop-color:#1E40AF"/>
            </linearGradient>
            <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFF"/>
              <stop offset="100%" style="stop-color:#F5F5F5"/>
            </linearGradient>
          </defs>
        </svg>
      `)}`}
      alt="SafePath Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  )
}
