import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { 
  ArrowLeft, 
  Search, 
  Star, 
  Heart, 
  Trash2,
  Filter,
  Library,
  BookOpen,
  Feather,
  Sparkles
} from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  cover: string
  rating: number
  genre: string[]
  dateAdded: string
  description: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')

  useEffect(() => {
    // TODO: Fetch favorites from API
    const mockFavorites: Book[] = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.5,
        genre: ['Classic', 'Fiction'],
        dateAdded: '2024-01-15',
        description: 'A classic American novel about the Jazz Age.'
      },
      {
        id: '2',
        title: 'Dune',
        author: 'Frank Herbert',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.8,
        genre: ['Sci-Fi', 'Adventure'],
        dateAdded: '2024-01-10',
        description: 'Epic science fiction masterpiece.'
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.6,
        genre: ['Dystopian', 'Classic'],
        dateAdded: '2024-01-05',
        description: 'A dystopian social science fiction novel.'
      },
      {
        id: '4',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.7,
        genre: ['Classic', 'Drama'],
        dateAdded: '2024-01-01',
        description: 'A gripping tale of racial injustice.'
      }
    ]

    setFavorites(mockFavorites)
    setFilteredFavorites(mockFavorites)
  }, [])

  useEffect(() => {
    let filtered = favorites

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(book => book.genre.includes(selectedGenre))
    }

    setFilteredFavorites(filtered)
  }, [searchTerm, selectedGenre, favorites])

  const handleRemoveFavorite = (bookId: string) => {
    setFavorites(prev => prev.filter(book => book.id !== bookId))
    // TODO: API call to remove from favorites
  }

  const allGenres = Array.from(new Set(favorites.flatMap(book => book.genre)))

  const BookCard = ({ book, index }: { book: Book; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 hover:shadow-2xl transition-all duration-300"
    >
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600 dark:border-amber-500" />
      
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded shadow-lg"
            style={{ filter: 'sepia(0.1) saturate(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-base sm:text-lg text-amber-900 dark:text-amber-100 line-clamp-2 mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}>
            {book.title}
          </h3>
          <p className="font-serif text-amber-700 dark:text-amber-300 flex items-center gap-1 mb-2">
            <Feather className="w-3 h-3" />
            {book.author}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-amber-600 text-amber-600' : 'text-amber-300'}`} />
              ))}
            </div>
            <span className="font-serif text-sm text-amber-700 dark:text-amber-300">{book.rating}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {book.genre.slice(0, 2).map((g) => (
              <span key={g} className="px-3 py-1 bg-amber-600 dark:bg-amber-700 text-white rounded-full font-serif text-xs">
                {g}
              </span>
            ))}
          </div>
          <p className="font-serif text-xs text-amber-600 dark:text-amber-400 italic">
            Added: {new Date(book.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRemoveFavorite(book.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg"
        >
          <Trash2 className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  )

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
                <Heart className="h-6 w-6 text-red-500" />
                <span className="font-serif text-2xl">My Treasured Collection</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-amber-700 dark:bg-amber-800 text-amber-50 rounded-full shadow-lg">
              <span className="font-serif font-bold">{filteredFavorites.length}</span>
              <span className="font-serif"> of </span>
              <span className="font-serif font-bold">{favorites.length}</span>
              <span className="font-serif"> books</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Vintage Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
              <input
                placeholder="Search your treasured collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 border-2 border-amber-300 dark:border-amber-600 rounded-lg font-serif text-gray-800 dark:text-gray-200 placeholder-amber-500 dark:placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-inner"
                style={{ fontFamily: 'Crimson Text, serif' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-amber-600" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-3 bg-white/70 dark:bg-gray-800/70 border-2 border-amber-300 dark:border-amber-600 rounded-lg font-serif text-amber-800 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-md cursor-pointer"
              >
                <option value="all">All Genres</option>
                {allGenres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700"
          >
            <Heart className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3">
              {searchTerm || selectedGenre !== 'all' ? 'No Matching Treasures' : 'Your Collection Awaits'}
            </h3>
            <p className="font-serif text-amber-700 dark:text-amber-300 mb-6">
              {searchTerm || selectedGenre !== 'all'
                ? 'Perhaps try different search terms or explore all genres.'
                : 'Begin your collection by adding beloved books from the library.'
              }
            </p>
            {!searchTerm && selectedGenre === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg font-serif shadow-lg"
              >
                <BookOpen className="inline-block mr-2 h-5 w-5" />
                Browse Library
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredFavorites.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Vintage Statistics */}
        {favorites.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
              <Sparkles className="absolute top-3 right-3 h-5 w-5 text-amber-400" />
              <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">{favorites.length}</div>
              <div className="font-serif text-amber-700 dark:text-amber-300 mt-2">Total Treasures</div>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
              <Library className="absolute top-3 right-3 h-5 w-5 text-amber-400" />
              <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">
                {allGenres.length}
              </div>
              <div className="font-serif text-amber-700 dark:text-amber-300 mt-2">Literary Genres</div>
            </div>
            <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 text-center">
              <Star className="absolute top-3 right-3 h-5 w-5 text-amber-400" />
              <div className="font-serif text-3xl font-bold text-amber-900 dark:text-amber-100">
                {(favorites.reduce((sum, book) => sum + book.rating, 0) / favorites.length).toFixed(1)}
              </div>
              <div className="font-serif text-amber-700 dark:text-amber-300 mt-2">Average Rating</div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
