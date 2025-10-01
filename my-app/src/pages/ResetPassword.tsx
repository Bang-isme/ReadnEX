import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Key, Eye, EyeOff, Shield, CheckCircle, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '../components/ui/use-toast'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(password), text: "One special character" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive"
      })
      return
    }

    if (!passwordRequirements.every(req => req.met)) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    try {
      // TODO: Implement reset password API call
      console.log('Password reset with token:', token, password)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsReset(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been successfully reset.",
      })
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isReset) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-parchment-50 dark:bg-ink-950 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <VintageCard variant="manuscript" ornate className="w-full text-center">
            <VintageCardContent className="py-12">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-16 w-16 mx-auto text-forest-600 dark:text-forest-500 mb-6" />
              </motion.div>
              
              <h2 className="font-display text-2xl text-burgundy-700 dark:text-burgundy-400 mb-4">
                Passphrase Successfully Reset!
              </h2>
              
              <p className="font-serif text-ink-700 dark:text-parchment-300 mb-6">
                Your new passphrase has been secured in our vault. You may now access the library with your renewed credentials.
              </p>
              
              <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-2">
                Redirecting you to the entrance...
              </p>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 border-2 border-burgundy-700 dark:border-burgundy-400 border-t-transparent rounded-full animate-spin" />
              </div>
            </VintageCardContent>
          </VintageCard>
        </motion.div>
      </div>
    )
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
            "And, when you want something, all the universe conspires in helping you to achieve it."
          </p>
          <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-1">— Paulo Coelho</p>
        </motion.div>

        <VintageCard variant="aged" ornate className="w-full">
          <VintageCardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500" />
            </div>
            <VintageCardTitle className="font-display text-3xl text-burgundy-700 dark:text-burgundy-400">
              Create New Passphrase
            </VintageCardTitle>
            <p className="font-serif text-ink-600 dark:text-parchment-400 mt-3">
              Forge a new key to your literary sanctuary
            </p>
          </VintageCardHeader>
          
          <VintageCardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  New Passphrase
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new passphrase"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500 pr-10"
                    required
                    disabled={isLoading}
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  Confirm New Passphrase
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new passphrase"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-ink-600 dark:text-parchment-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Password requirements */}
              {password && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-parchment-100 dark:bg-ink-800 p-4 rounded-sm border border-parchment-300 dark:border-ink-600"
                >
                  <p className="font-serif text-xs text-ink-700 dark:text-parchment-300 mb-2">
                    Passphrase Requirements:
                  </p>
                  <ul className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 font-serif text-xs">
                        <div className={`w-3 h-3 rounded-full ${
                          req.met 
                            ? 'bg-forest-600 dark:bg-forest-500' 
                            : 'bg-parchment-300 dark:bg-ink-600'
                        }`} />
                        <span className={
                          req.met 
                            ? 'text-forest-700 dark:text-forest-400' 
                            : 'text-ink-500 dark:text-parchment-500'
                        }>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800" 
                  disabled={isLoading || !passwordRequirements.every(req => req.met) || password !== confirmPassword}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-parchment-200 border-t-transparent rounded-full animate-spin" />
                      Securing Your Passphrase...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Key className="h-5 w-5" />
                      Reset Passphrase
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-parchment-300 dark:border-ink-700">
              <p className="text-center font-serif text-sm text-ink-600 dark:text-parchment-400">
                Remember your old passphrase?
              </p>
              <Link 
                to="/login" 
                className="block text-center mt-2 font-serif text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 underline decoration-dotted underline-offset-4"
              >
                Return to login
              </Link>
            </div>
          </VintageCardContent>
        </VintageCard>
      </motion.div>
    </div>
  )
}