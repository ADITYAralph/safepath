'use client'

import { useEffect } from 'react'

export function GoogleTranslate() {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script')
        script.id = 'google-translate-script'
        script.type = 'text/javascript'
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        document.head.appendChild(script)
      }
    }

    // Initialize Google Translate - Using any to bypass TypeScript errors
    ;(window as any).googleTranslateElementInit = () => {
      const google = (window as any).google
      if (google && google.translate && google.translate.TranslateElement) {
        if (!document.querySelector('.goog-te-combo')) {
          new google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,bn,te,ta,mr,gu,kn,ml,pa,ur,ne,as,or,si,my',
              layout: 0,
              autoDisplay: false,
              multilanguagePage: true
            },
            'google_translate_element'
          )
        }
      }
    }

    addScript()

    return () => {
      const script = document.getElementById('google-translate-script')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <div className="google-translate-container">
      <div id="google_translate_element"></div>
    </div>
  )
}
