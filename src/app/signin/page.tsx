'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple demo login - accepts any email/password
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo - accept any login
      const userData = {
        name: formData.email.split('@')[0],
        email: formData.email,
        token: 'demo-jwt-token-' + Date.now()
      }

      // Store in localStorage
      localStorage.setItem('safepath_token', userData.token)
      localStorage.setItem('safepath_user', JSON.stringify(userData))

      console.log('Login successful, redirecting to dashboard')
      router.push('/dashboard')
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg mx-auto mb-4 w-fit">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to SafePath</h1>
          <p className="text-gray-300">Sign in to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="Enter any password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <p className="text-blue-200 text-sm text-center">
            <strong>Demo Mode:</strong> Enter any email and password to continue
          </p>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6 pt-6 border-t border-white/10">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
