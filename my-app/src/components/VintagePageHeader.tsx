import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Feather } from 'lucide-react'

interface VintagePageHeaderProps {
  badge?: string
  title: string | ReactNode
  subtitle?: string
  quote?: {
    text: string
    author: string
  }
  children?: ReactNode
}

export default function VintagePageHeader({ 
  badge, 
  title, 
  subtitle, 
  quote,
  children 
}: VintagePageHeaderProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-burgundy-700 via-burgundy-800 to-burgundy-900 dark:from-burgundy-900 dark:via-ink-900 dark:to-ink-950 text-parchment-100">
      {/* Vintage Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative">
        <motion.div {...fadeInUp}>
          {/* Ornate Badge */}
          {badge && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6 py-2 sm:py-3 bg-parchment-100/10 dark:bg-ink-900/30 border-2 border-gold-leaf-600 dark:border-gold-leaf-700 rounded-sm shadow-sm backdrop-blur-sm">
              <Feather className="w-3 h-3 sm:w-4 sm:h-4 text-gold-leaf-400" />
              <span className="font-serif text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-gold-leaf-300">
                {badge}
              </span>
              <Feather className="w-3 h-3 sm:w-4 sm:h-4 text-gold-leaf-400 scale-x-[-1]" />
            </div>
          )}
          
          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-parchment-100 mb-4 sm:mb-6 tracking-wide leading-tight px-2 sm:px-0">
            {typeof title === 'string' ? (
              <span>{title}</span>
            ) : (
              title
            )}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="font-serif text-base sm:text-lg md:text-xl text-parchment-200/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              {subtitle}
            </p>
          )}
          
          {/* Quote */}
          {quote && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 sm:mt-8 inline-block max-w-2xl mx-auto px-2 sm:px-4"
            >
              <div className="flex items-start gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl text-gold-leaf-400/70 flex-shrink-0">"</span>
                <div className="flex-1">
                  <p className="font-serif text-sm sm:text-base text-parchment-200/80 italic leading-relaxed text-left">
                    {quote.text}
                  </p>
                  <p className="font-serif text-xs sm:text-sm text-parchment-300/60 mt-2 text-left">
                    — {quote.author}
                  </p>
                </div>
                <span className="text-xl sm:text-2xl text-gold-leaf-400/70 flex-shrink-0">"</span>
              </div>
            </motion.div>
          )}
          
          {/* Custom Children */}
          {children && (
            <div className="mt-6 sm:mt-8 px-2 sm:px-0">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}