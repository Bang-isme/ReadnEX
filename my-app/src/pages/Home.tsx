import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookButton } from '@/components/ui/book-button'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '@/components/ui/vintage-card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Library,
  Feather,
  Scroll,
  BookMarked,
  Coffee,
  Glasses,
  Star,
  Quote,
  Users,
  Heart,
  ArrowRight,
  PenTool,
  TrendingUp,
  MessageCircle
} from 'lucide-react'

export default function Home () {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Sample book data for featured books
  const featuredBooks = [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "/api/placeholder/200/300",
      rating: 4.5,
      description: "Between life and death there is a library, and within that library, the shelves go on forever.",
      genre: "Fiction"
    },
    {
      id: "2",
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "/api/placeholder/200/300",
      rating: 4.8,
      description: "A lone astronaut must save humanity from an extinction-level threat.",
      genre: "Sci-Fi"
    },
    {
      id: "3",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "/api/placeholder/200/300",
      rating: 4.2,
      description: "A thrilling coming-of-age story about an Artificial Friend and her quest to save the family she loves.",
      genre: "Literary Fiction"
    },
    {
      id: "4",
      title: "The Seven Husbands",
      author: "Taylor Jenkins Reid",
      coverImage: "/api/placeholder/200/300",
      rating: 4.7,
      description: "Aging Hollywood icon finally tells her story of fame, fortune, and scandalous relationships.",
      genre: "Romance"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Avid Reader",
      avatar: "/api/placeholder/64/64",
      content: "MyNextBook's AI recommendations are incredibly accurate. It's like having a personal librarian who knows exactly what I'll love!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Book Blogger",
      avatar: "/api/placeholder/64/64",
      content: "The chatbot feature is revolutionary. I can discuss books with an AI that understands literature deeply. Absolutely amazing!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      avatar: "/api/placeholder/64/64",
      content: "Perfect for discovering new books for my classroom. The reading history tracking helps me keep organized and motivated.",
      rating: 5
    }
  ]

  return (
    <div className='relative min-h-screen overflow-hidden bg-parchment-50 dark:bg-ink-950'>

      
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-repeat' style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5' opacity='0.2'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className='max-w-7xl mx-auto text-center relative'>
          <motion.div {...fadeInUp}>
            {/* Ornate Badge */}
            <div className='inline-flex items-center gap-2 mb-12 px-6 py-3 bg-parchment-100 dark:bg-ink-900 border-2 border-gold-leaf-600 dark:border-gold-leaf-700 rounded-sm shadow-sm'>
              <Feather className='w-4 h-4 text-gold-leaf-700 dark:text-gold-leaf-400' />
              <span className='font-serif text-sm tracking-[0.2em] uppercase text-gold-leaf-800 dark:text-gold-leaf-300'>EST. 2025</span>
              <Feather className='w-4 h-4 text-gold-leaf-700 dark:text-gold-leaf-400 scale-x-[-1]' />
            </div>
            
            <h1 className='font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ink-900 dark:text-parchment-100 mb-8 tracking-wide leading-[0.9] uppercase'>
              Your Next Great
              <span className='block mt-4'>
                Read Awaits
              </span>
            </h1>
            
            <p className='font-serif text-xl md:text-2xl text-ink-700 dark:text-parchment-300 mb-6 max-w-3xl mx-auto leading-relaxed'>
              "A Literary Sanctuary where timeless wisdom meets modern reading."
            </p>
            
            <p className='font-serif text-base md:text-lg text-ink-600 dark:text-parchment-400 mb-12 italic'>
              Read, annotate, share, and create your literary legacy
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-4xl mx-auto'>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full sm:w-auto'>
                <Link 
                  to='/readnex' 
                  className='inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 border-2 border-burgundy-900 dark:border-burgundy-800 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group'
                >
                  <Library className='h-5 w-5' />
                  <span className='font-serif text-base sm:text-lg'>Enter ReadnEX</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full sm:w-auto'>
                <Link 
                  to='/noteshare' 
                  className='inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-ink-600 dark:border-parchment-500 rounded-sm hover:bg-ink-100 dark:hover:bg-ink-800 transition-all duration-300 group'
                >
                  <BookMarked className='h-5 w-5 text-ink-700 dark:text-parchment-300' />
                  <span className='font-serif text-base sm:text-lg text-ink-700 dark:text-parchment-300'>Explore NoteShare</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full sm:w-auto'>
                <Link 
                  to='/create-book' 
                  className='inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-ink-600 dark:border-parchment-500 rounded-sm hover:bg-ink-100 dark:hover:bg-ink-800 transition-all duration-300 group'
                >
                  <PenTool className='h-5 w-5 text-ink-700 dark:text-parchment-300' />
                  <span className='font-serif text-base sm:text-lg text-ink-700 dark:text-parchment-300'>Create Books</span>
                </Link>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className='mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'
            >
              {[
                { label: 'Volumes', value: '50,000', icon: BookOpen },
                { label: 'Members', value: '10,000', icon: Users },
                { label: 'Rare Editions', value: '1,200', icon: BookMarked },
                { label: 'Since', value: '2025', icon: Scroll }
              ].map((stat, index) => (
                <motion.div key={index} whileHover={{ y: -5 }} className='h-full'>
                  <VintageCard variant='aged' className='h-full p-4 sm:p-6 text-center flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center space-y-2 sm:space-y-3'>
                      <stat.icon className='h-6 w-6 sm:h-8 sm:w-8 text-burgundy-700 dark:text-gold-leaf-500 flex-shrink-0' />
                      <div className='font-display text-xl sm:text-2xl font-bold text-ink-900 dark:text-parchment-100 leading-none'>
                        {stat.value}
                      </div>
                      <div className='font-serif text-xs sm:text-sm text-ink-600 dark:text-parchment-400 leading-none'>
                        {stat.label}
                      </div>
                    </div>
                  </VintageCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-parchment-50 to-parchment-100 dark:from-ink-950 dark:to-ink-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            {/* Vintage Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-parchment-100 dark:bg-ink-900 border border-gold-leaf-600 dark:border-gold-leaf-700 rounded-sm">
              <TrendingUp className="w-4 h-4 text-gold-leaf-700 dark:text-gold-leaf-400" />
              <span className="font-serif text-xs tracking-[0.15em] uppercase text-gold-leaf-800 dark:text-gold-leaf-300">
                Trending Now
              </span>
            </div>
            
            {/* Title with ornamental decoration */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-leaf-600 to-transparent" />
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 dark:text-parchment-100 tracking-wide">
                Featured Books This Week
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-leaf-600 to-transparent" />
            </div>
            
            <p className="font-serif text-lg md:text-xl text-ink-700 dark:text-parchment-300 italic max-w-3xl mx-auto">
              Handpicked selections from our AI and community favorites
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book, index) => (
              <motion.div 
                key={book.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="h-full relative group cursor-pointer">
                  <VintageCard 
                    variant="aged" 
                    ornate 
                    hoverable 
                    className="h-full"
                  >
                    <div className="flex flex-col h-full">
                      {/* Book Cover */}
                      <div className="relative aspect-[3/4] overflow-hidden border-b-2 border-parchment-300 dark:border-ink-700">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover filter sepia-[0.15] group-hover:sepia-0 transition-all duration-500"
                        />
                        
                        {/* Vintage overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-parchment-100/10 opacity-40 group-hover:opacity-20 transition-opacity" />
                        
                        {/* Genre Badge */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center justify-between">
                            <span className="inline-block px-3 py-1 bg-burgundy-800/90 text-parchment-100 font-serif text-xs uppercase tracking-wider rounded-sm">
                              {book.genre}
                            </span>
                            <div className="flex items-center gap-1 bg-ink-900/80 px-2 py-1 rounded-sm">
                              <Star className="h-3 w-3 fill-gold-leaf-500 text-gold-leaf-500" />
                              <span className="text-xs font-serif text-parchment-100">{book.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Book Details Container with fixed height sections */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Title and Author - Fixed position */}
                        <div className="mb-3">
                          <h3 className="font-display text-xl text-ink-900 dark:text-parchment-100 mb-1 line-clamp-1">
                            {book.title}
                          </h3>
                          <p className="font-serif text-sm text-burgundy-700 dark:text-gold-leaf-400">
                            {book.author}
                          </p>
                        </div>
                        
                        {/* Description - Flexible height with min height */}
                        <div className="flex-1 min-h-[60px] mb-4">
                          <p className="font-body text-sm text-ink-700 dark:text-parchment-300 line-clamp-3 leading-relaxed italic">
                            "{book.description}"
                          </p>
                        </div>
                        
                        {/* Button - Fixed at bottom */}
                        <Link 
                          to={`/book/${book.id}`}
                          className="block"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group/btn"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-burgundy-700 to-burgundy-800 dark:from-gold-leaf-600 dark:to-gold-leaf-700 rounded-sm blur-sm group-hover/btn:blur-md transition-all" />
                            <div className="relative flex items-center justify-center gap-2 px-4 py-2 bg-parchment-100 dark:bg-ink-900 border-2 border-burgundy-700 dark:border-gold-leaf-600 rounded-sm transition-all">
                              <BookOpen className="h-4 w-4 text-burgundy-800 dark:text-gold-leaf-500" />
                              <span className="font-serif text-sm text-burgundy-800 dark:text-gold-leaf-400 tracking-wide">
                                Read More
                              </span>
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </VintageCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-24 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900'>
        <div className='max-w-7xl mx-auto'>
          <motion.div {...fadeInUp} className='text-center mb-16'>
            <div className='flex items-center justify-center gap-4 mb-6'>
              <div className='h-px w-12 bg-gold-leaf-600' />
              <h2 className='font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100'>
                Our Services
              </h2>
              <div className='h-px w-12 bg-gold-leaf-600' />
            </div>
            <p className='font-serif text-xl text-ink-700 dark:text-parchment-300 max-w-2xl mx-auto'>
              A curated experience for the discerning bibliophile
            </p>
          </motion.div>

          <motion.div {...stagger} className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: Glasses,
                title: 'Personal Librarian',
                description: 'Expert recommendations tailored to your literary tastes and reading history'
              },
              {
                icon: Coffee,
                title: 'Reading Nook',
                description: 'Cozy virtual spaces to discuss books with fellow literature enthusiasts'
              },
              {
                icon: Feather,
                title: 'Author\'s Corner',
                description: 'Exclusive insights and commentary from renowned authors and critics'
              },
              {
                icon: BookMarked,
                title: 'Rare Collections',
                description: 'Access to first editions, signed copies, and literary treasures'
              },
              {
                icon: Scroll,
                title: 'Literary Journal',
                description: 'Track your reading journey with beautiful, customizable journals'
              },
              {
                icon: Library,
                title: 'Private Library',
                description: 'Organize and showcase your personal collection with elegance'
              }
            ].map((service, index) => (
              <motion.div key={index} {...fadeInUp}>
                <VintageCard variant='paper' ornate hoverable className='h-full'>
                  <VintageCardHeader className='text-center'>
                    <div className='mx-auto mb-4 p-4 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full w-16 h-16 flex items-center justify-center'>
                      <service.icon className='h-8 w-8 text-burgundy-700 dark:text-gold-leaf-500' />
                    </div>
                    <VintageCardTitle className='text-xl'>{service.title}</VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <p className='text-center text-ink-700 dark:text-parchment-300'>
                      {service.description}
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='relative py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div {...fadeInUp} className='text-center mb-16'>
            <h2 className='font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100 mb-4'>
              Words from Fellow Readers
            </h2>
            <p className='font-serif text-xl text-ink-700 dark:text-parchment-300'>
              "Books are the quietest and most constant of friends"
            </p>
          </motion.div>

          <motion.div {...stagger} className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} {...fadeInUp}>
                <VintageCard variant='aged' className='h-full relative'>
                  <VintageCardContent className='pt-8'>
                    <Quote className='h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500 mb-4' />
                    <p className='font-serif text-ink-700 dark:text-parchment-300 mb-6 italic text-lg leading-relaxed'>
                      "{testimonial.content}"
                    </p>
                    <div className='border-t border-parchment-300 dark:border-ink-700 pt-4'>
                      <div className='flex items-center'>
                        <Avatar className='h-10 w-10 mr-3'>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className='bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300'>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-serif font-semibold text-ink-900 dark:text-parchment-100'>
                            {testimonial.name}
                          </p>
                          <p className='text-sm font-serif text-ink-600 dark:text-parchment-400'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-parchment-50 to-parchment-100 dark:from-ink-950 dark:to-ink-900'>
        <div className='max-w-6xl mx-auto'>
          <motion.div {...fadeInUp}>
            <VintageCard variant='manuscript' ornate className='p-6 sm:p-12 lg:p-16 text-center relative overflow-hidden'>
              {/* Decorative elements */}
              <div className='absolute top-0 left-0 w-32 h-32 opacity-10'>
                <BookOpen className='w-full h-full text-gold-leaf-600' />
              </div>
              <div className='absolute bottom-0 right-0 w-32 h-32 opacity-10'>
                <Library className='w-full h-full text-gold-leaf-600' />
              </div>
              
              <h2 className='font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-ink-900 dark:text-parchment-100 uppercase tracking-wide'>
                Start Your Reading
                <span className='block mt-2'>Adventure</span>
              </h2>
              <p className='font-serif text-xl mb-8 text-ink-700 dark:text-parchment-300 max-w-3xl mx-auto'>
                Join thousands of readers who read, annotate, share, and create in our literary sanctuary
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='inline-block'>
                <Link 
                  to='/register' 
                  className='inline-flex items-center gap-3 px-10 py-5 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800 rounded-sm uppercase tracking-wider'
                >
                  Join MyNextBook
                </Link>
              </motion.div>
              
              <div className='mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-serif text-xs sm:text-sm text-ink-600 dark:text-parchment-400 px-4'>
                <span className='flex items-center gap-2 whitespace-nowrap'>
                  <span className='w-2 h-2 bg-green-600 rounded-full animate-pulse' />
                  Free to join
                </span>
                <span className='text-gold-leaf-600 hidden sm:inline'>•</span>
                <span className='whitespace-nowrap'>Smart recommendations</span>
                <span className='text-gold-leaf-600 hidden sm:inline'>•</span>
                <span className='whitespace-nowrap'>Endless discoveries</span>
              </div>
            </VintageCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
