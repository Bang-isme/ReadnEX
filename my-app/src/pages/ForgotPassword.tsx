import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Mail, ArrowLeft, Send, Quote, Feather } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '../components/ui/use-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement forgot password API call
      console.log('Password reset request for:', email)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-parchment-50 dark:bg-ink-950 p-4 overflow-hidden">
      {/* Decorative background pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-repeat' style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5' opacity='0.2'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating feathers animation */}
      <motion.div 
        className="absolute top-20 left-10"
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, 10, 0] 
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Feather className="h-8 w-8 text-gold-leaf-600/20 dark:text-gold-leaf-500/20" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md relative z-10"
      >
        {/* Back to login link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 font-serif text-sm text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </motion.div>

        {!isSubmitted ? (
          <>
            {/* Literary Quote */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <Quote className="h-8 w-8 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-2" />
              <p className="font-serif text-lg italic text-ink-700 dark:text-parchment-300">
                "In the depth of winter, I finally learned that there was in me an invincible summer."
              </p>
              <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-1">— Albert Camus</p>
            </motion.div>

            <VintageCard variant="aged" ornate className="w-full">
              <VintageCardHeader className="text-center pb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500" />
                </div>
                <VintageCardTitle className="font-display text-3xl text-burgundy-700 dark:text-burgundy-400">
                  Forgot Your Passphrase?
                </VintageCardTitle>
                <p className="font-serif text-ink-600 dark:text-parchment-400 mt-3">
                  Fear not, dear reader. Enter your electronic mail address and we shall send you instructions to restore your access to the library.
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
                      disabled={isLoading}
                    />
                    <p className="font-serif text-xs text-ink-600 dark:text-parchment-500 mt-1">
                      Enter the address associated with your library account
                    </p>
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
                          Sending Instructions...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="h-5 w-5" />
                          Send Reset Instructions
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-parchment-300 dark:border-ink-700">
                  <p className="text-center font-serif text-sm text-ink-600 dark:text-parchment-400">
                    Remember your passphrase?
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
          </>
        ) : (
          /* Success message */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VintageCard variant="manuscript" ornate className="w-full text-center">
              <VintageCardContent className="py-12">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Mail className="h-16 w-16 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-6" />
                </motion.div>
                
                <h2 className="font-display text-2xl text-burgundy-700 dark:text-burgundy-400 mb-4">
                  Instructions Dispatched!
                </h2>
                
                <p className="font-serif text-ink-700 dark:text-parchment-300 mb-2">
                  A missive has been sent to:
                </p>
                
                <p className="font-serif text-lg font-semibold text-burgundy-700 dark:text-gold-leaf-500 mb-6">
                  {email}
                </p>
                
                <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-8">
                  Please check your correspondence for further instructions on restoring access to your literary sanctuary.
                </p>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                  >
                    Return to Login
                  </Button>
                  
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full font-serif text-sm text-burgundy-700 dark:text-burgundy-400 hover:text-burgundy-800 dark:hover:text-burgundy-300 underline decoration-dotted underline-offset-2"
                  >
                    Didn't receive the email? Try again
                  </button>
                </div>
              </VintageCardContent>
            </VintageCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}