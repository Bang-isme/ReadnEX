import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Eye, EyeOff, BookOpen, Quote, KeyRound } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement login API call
    console.log('Login attempt:', { email, password })
    
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-parchment-50 dark:bg-ink-950 p-4 overflow-hidden">
      {/* Decorative background pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-repeat' style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5' opacity='0.2'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md relative z-10"
      >
        {/* Literary Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <Quote className="h-8 w-8 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-2" />
          <p className="font-serif text-lg italic text-ink-700 dark:text-parchment-300">
            "Books are a uniquely portable magic."
          </p>
          <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-1">— Stephen King</p>
        </motion.div>

        <VintageCard variant="aged" ornate className="w-full">
          <VintageCardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <KeyRound className="h-6 w-6 text-gold-leaf-600 dark:text-gold-leaf-500" />
            </div>
            <VintageCardTitle className="font-display text-3xl text-burgundy-700 dark:text-burgundy-400">
              Welcome Back
            </VintageCardTitle>
            <p className="font-serif text-ink-600 dark:text-parchment-400 mt-2">
              Enter your credentials to continue your literary journey
            </p>
          </VintageCardHeader>
          <VintageCardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  Electronic Mail Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@literature.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                    Secret Passphrase
                  </Label>
                  <Link 
                    to="/forgot-password" 
                    className="font-serif text-xs text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 underline decoration-dotted underline-offset-2"
                  >
                    Forgotten?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your passphrase"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-ink-600 dark:text-parchment-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-parchment-200 border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Enter the Library
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-parchment-300 dark:border-ink-700">
              <p className="text-center font-serif text-sm text-ink-600 dark:text-parchment-400">
                New to our literary sanctuary?
              </p>
              <Link 
                to="/register" 
                className="block text-center mt-2 font-serif text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 underline decoration-dotted underline-offset-4"
              >
                Create your account
              </Link>
            </div>
          </VintageCardContent>
        </VintageCard>
      </motion.div>
    </div>
  )
}
