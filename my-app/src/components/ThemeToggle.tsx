import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  // Get the actual theme (handling system preference)
  const actualTheme = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: actualTheme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-5 h-5"
      >
        {actualTheme === 'light' ? (
          <Sun className="w-5 h-5 text-amber-50" />
        ) : (
          <Moon className="w-5 h-5 text-amber-50" />
        )}
      </motion.div>
      
      {/* Tooltip - Positioned to the left */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-amber-900 dark:bg-amber-100 text-amber-50 dark:text-amber-900 text-xs font-serif rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
        {actualTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        {/* Arrow pointing right */}
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-amber-900 dark:bg-amber-100" />
      </div>
    </motion.button>
  )
}

// Floating theme toggle for fixed position
export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const actualTheme = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="relative p-4 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white rounded-full shadow-2xl hover:shadow-amber-500/50 dark:hover:shadow-amber-600/50 transition-all duration-300 group border-2 border-amber-300 dark:border-amber-700"
        aria-label="Toggle theme"
      >
        {/* Vintage decorative corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-700 dark:border-amber-400 rounded-tl" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-700 dark:border-amber-400 rounded-tr" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-700 dark:border-amber-400 rounded-bl" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-700 dark:border-amber-400 rounded-br" />
        
        <motion.div
          initial={false}
          animate={{ 
            rotate: actualTheme === 'dark' ? 360 : 0,
            scale: actualTheme === 'dark' ? 0.9 : 1
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-7 h-7"
        >
          {actualTheme === 'light' ? (
            <Sun className="w-7 h-7 text-amber-50" />
          ) : (
            <Moon className="w-7 h-7 text-amber-50" />
          )}
        </motion.div>
        
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 rounded-full bg-amber-400 dark:bg-amber-500 opacity-20 blur-md animate-pulse" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-amber-900 dark:bg-amber-100 text-amber-50 dark:text-amber-900 text-sm font-serif rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          <span className="flex items-center gap-2">
            {actualTheme === 'light' ? (
              <>
                <Moon className="w-4 h-4" />
                Embrace the Night
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                Welcome the Dawn
              </>
            )}
          </span>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-amber-900 dark:bg-amber-100" />
        </div>
      </motion.button>
    </motion.div>
  )
}