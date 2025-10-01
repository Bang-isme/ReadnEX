import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { 
  ArrowLeft, 
  Calendar, 
  Star, 
  BookOpen, 
  Clock,
  Target,
  Library,
  ScrollText,
  Feather,
  Award,
  TrendingUp
} from 'lucide-react'

interface ReadingSession {
  id: string
  bookId: string
  bookTitle: string
  author: string
  cover: string
  startDate: string
  lastReadDate: string
  progress: number // percentage
  pagesRead: number
  totalPages: number
  status: 'reading' | 'completed' | 'paused'
  rating?: number
}

export default function ReadingHistory() {
  const [readingHistory, setReadingHistory] = useState<ReadingSession[]>([])
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed' | 'paused'>('all')

  useEffect(() => {
    // TODO: Fetch reading history from API
    const mockHistory: ReadingSession[] = [
      {
        id: '1',
        bookId: '1',
        bookTitle: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover: 'https://via.placeholder.com/120x160',
        startDate: '2024-01-15',
        lastReadDate: '2024-01-20',
        progress: 75,
        pagesRead: 135,
        totalPages: 180,
        status: 'reading',
        rating: 4
      },
      {
        id: '2',
        bookId: '2',
        bookTitle: 'Dune',
        author: 'Frank Herbert',
        cover: 'https://via.placeholder.com/120x160',
        startDate: '2024-01-10',
        lastReadDate: '2024-01-18',
        progress: 100,
        pagesRead: 688,
        totalPages: 688,
        status: 'completed',
        rating: 5
      },
      {
        id: '3',
        bookId: '3',
        bookTitle: '1984',
        author: 'George Orwell',
        cover: 'https://via.placeholder.com/120x160',
        startDate: '2024-01-05',
        lastReadDate: '2024-01-12',
        progress: 45,
        pagesRead: 148,
        totalPages: 328,
        status: 'paused'
      },
      {
        id: '4',
        bookId: '4',
        bookTitle: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        cover: 'https://via.placeholder.com/120x160',
        startDate: '2024-01-01',
        lastReadDate: '2024-01-08',
        progress: 100,
        pagesRead: 376,
        totalPages: 376,
        status: 'completed',
        rating: 5
      }
    ]

    setReadingHistory(mockHistory)
  }, [])

  const filteredHistory = readingHistory.filter(session => {
    if (filter === 'all') return true
    return session.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reading': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'reading': return 'Currently Reading'
      case 'completed': return 'Completed'
      case 'paused': return 'Paused'
      default: return status
    }
  }

  const ReadingCard = ({ session, index }: { session: ReadingSession; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      className="relative p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 hover:shadow-2xl transition-all duration-300"
    >
      {/* Vintage decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600 dark:border-amber-500" />
      
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={session.cover}
            alt={session.bookTitle}
            className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded shadow-lg"
            style={{ filter: 'sepia(0.1) saturate(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-serif font-bold text-base sm:text-xl text-amber-900 dark:text-amber-100 mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                {session.bookTitle}
              </h3>
              <p className="font-serif text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Feather className="w-3 h-3" />
                {session.author}
              </p>
            </div>
            <span
              className={`px-3 py-1 ${getStatusColor(session.status)} text-white rounded-full font-serif text-sm shadow-md`}
            >
              {getStatusText(session.status)}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="flex justify-between font-serif text-sm text-amber-800 dark:text-amber-200 mb-2">
                <span className="font-bold">Reading Progress</span>
                <span className="font-bold">{session.progress}%</span>
              </div>
              <div className="w-full h-3 bg-amber-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${session.progress}%` }}
                />
              </div>
              <p className="font-serif text-xs text-amber-600 dark:text-amber-400 mt-2 italic">
                {session.pagesRead} of {session.totalPages} pages journeyed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-2 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <Calendar className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="font-serif text-xs text-amber-600 dark:text-amber-400">Started</p>
                  <p className="font-serif text-sm text-amber-800 dark:text-amber-200">
                    {new Date(session.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <Clock className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="font-serif text-xs text-amber-600 dark:text-amber-400">Last Read</p>
                  <p className="font-serif text-sm text-amber-800 dark:text-amber-200">
                    {new Date(session.lastReadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {session.rating && (
              <div className="flex items-center gap-2 p-2 bg-amber-100/50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < session.rating ? 'fill-amber-600 text-amber-600' : 'text-amber-300'}`} />
                  ))}
                </div>
                <span className="font-serif text-sm text-amber-800 dark:text-amber-200">Rated {session.rating}/5</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const stats = {
    totalBooks: readingHistory.length,
    completedBooks: readingHistory.filter(s => s.status === 'completed').length,
    totalPagesRead: readingHistory.reduce((sum, s) => sum + s.pagesRead, 0),
    averageProgress: readingHistory.length > 0
      ? Math.round(readingHistory.reduce((sum, s) => sum + s.progress, 0) / readingHistory.length)
      : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Vintage Header */}
      <header className="relative bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-b-4 border-amber-200 dark:border-amber-900 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.1) 10px,
              rgba(139, 69, 19, 0.1) 20px
            )`
          }} />
        </div>
        <div className="container mx-auto px-4 py-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="bg-amber-700 dark:bg-amber-800 text-amber-50 hover:bg-amber-800 dark:hover:bg-amber-900 font-serif transition-all duration-300 shadow-lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Return to Library</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <ScrollText className="h-6 w-6" />
                <span className="font-serif text-2xl">Reading Chronicle</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-amber-700 dark:bg-amber-800 text-amber-50 rounded-full shadow-lg">
              <span className="font-serif font-bold">{filteredHistory.length}</span>
              <span className="font-serif"> literary journeys</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Vintage Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
            <Target className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.totalBooks}</div>
            <div className="font-serif text-amber-700 dark:text-amber-300 mt-1">Total Books</div>
          </div>
          <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="font-serif text-3xl font-bold text-green-600">{stats.completedBooks}</div>
            <div className="font-serif text-amber-700 dark:text-amber-300 mt-1">Completed</div>
          </div>
          <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
            <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.totalPagesRead.toLocaleString()}</div>
            <div className="font-serif text-amber-700 dark:text-amber-300 mt-1">Pages Read</div>
          </div>
          <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
            <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.averageProgress}%</div>
            <div className="font-serif text-amber-700 dark:text-amber-300 mt-1">Avg Progress</div>
          </div>
        </motion.div>

        {/* Vintage Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
        >
          {[
            { key: 'all', label: 'All Books', count: readingHistory.length, icon: '📚' },
            { key: 'reading', label: 'Currently Reading', count: readingHistory.filter(s => s.status === 'reading').length, icon: '📖' },
            { key: 'completed', label: 'Completed', count: readingHistory.filter(s => s.status === 'completed').length, icon: '✅' },
            { key: 'paused', label: 'Paused', count: readingHistory.filter(s => s.status === 'paused').length, icon: '⏸️' }
          ].map(({ key, label, count, icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(key as 'all' | 'reading' | 'completed' | 'paused')}
              className={`px-5 py-3 rounded-lg font-serif transition-all duration-300 shadow-lg flex items-center gap-2 ${
                filter === key 
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white' 
                  : 'bg-white/70 dark:bg-gray-800/70 text-amber-800 dark:text-amber-200 border-2 border-amber-300 dark:border-amber-600 hover:bg-amber-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                filter === key 
                  ? 'bg-white/20' 
                  : 'bg-amber-600 dark:bg-amber-700 text-white'
              }`}>
                {count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Reading History List */}
        {filteredHistory.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700"
          >
            <BookOpen className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3">
              {filter === 'all' ? 'Your Reading Journey Awaits' : 'No Books Found'}
            </h3>
            <p className="font-serif text-amber-700 dark:text-amber-300 mb-6">
              {filter === 'all'
                ? 'Begin your literary adventure by exploring the library.'
                : `No books currently marked as "${filter}".`
              }
            </p>
            {filter === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg font-serif shadow-lg"
              >
                <Library className="inline-block mr-2 h-5 w-5" />
                Explore Library
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredHistory.map((session, index) => (
                <ReadingCard key={session.id} session={session} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}
