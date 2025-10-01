import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Eye, EyeOff, BookOpen, Feather, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // TODO: Implement registration API call
    console.log('Registration attempt:', formData)
    
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
        className="w-full max-w-lg relative z-10"
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
            "A reader lives a thousand lives before he dies."
          </p>
          <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-1">— George R.R. Martin</p>
        </motion.div>

        <VintageCard variant="manuscript" ornate className="w-full">
          <VintageCardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Feather className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
              <VintageCardTitle className="font-display text-3xl text-burgundy-700 dark:text-burgundy-400">
                Join the Literary Circle
              </VintageCardTitle>
              <Feather className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500 scale-x-[-1]" />
            </div>
            <p className="font-serif text-ink-600 dark:text-parchment-400">
              Create your account to begin your reading odyssey
            </p>
          </VintageCardHeader>
          <VintageCardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Charles"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500"
                    required
                  />
                  {errors.firstName && <p className="text-sm text-burgundy-600">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Dickens"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500"
                    required
                  />
                  {errors.lastName && <p className="text-sm text-burgundy-600">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  Electronic Mail Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="charles@literature.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500"
                  required
                />
                {errors.email && <p className="text-sm text-burgundy-600">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  Secret Passphrase
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create your passphrase"
                    value={formData.password}
                    onChange={handleChange}
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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-burgundy-600">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                  Confirm Passphrase
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat your passphrase"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-parchment-100 dark:bg-ink-800 border-parchment-300 dark:border-ink-600 focus:border-gold-leaf-500 dark:focus:border-gold-leaf-600 placeholder:text-ink-400 dark:placeholder:text-parchment-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-ink-600 dark:text-parchment-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-burgundy-600">{errors.confirmPassword}</p>}
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
                      Inscribing your details...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Join the Library
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-parchment-300 dark:border-ink-700">
              <p className="text-center font-serif text-sm text-ink-600 dark:text-parchment-400">
                Already a member of our literary circle?
              </p>
              <Link 
                to="/login" 
                className="block text-center mt-2 font-serif text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 underline decoration-dotted underline-offset-4"
              >
                Sign in to your account
              </Link>
            </div>
          </VintageCardContent>
        </VintageCard>
      </motion.div>
    </div>
  )
}
