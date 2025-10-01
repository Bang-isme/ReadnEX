import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Textarea } from '../components/ui/textarea'
import { 
  Heart, 
  Star, 
  BookOpen, 
  ArrowLeft, 
  Send,
  User,
  Bookmark,
  Calendar,
  Feather,
  Library,
  ScrollText
} from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  cover: string
  rating: number
  description: string
  genre: string[]
  publishedDate: string
  pages: number
}

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [isInReadingHistory, setIsInReadingHistory] = useState(false)

  useEffect(() => {
    // TODO: Fetch book details from API
    const mockBook: Book = {
      id: id || '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://via.placeholder.com/300x400',
      rating: 4.5,
      description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in Jazz Age New York, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his obsession with Daisy Buchanan.',
      genre: ['Classic', 'Fiction', 'Drama'],
      publishedDate: '1925',
      pages: 180
    }

    const mockReviews: Review[] = [
      {
        id: '1',
        user: 'John Doe',
        rating: 5,
        comment: 'Absolutely loved this book! A timeless classic that everyone should read.',
        date: '2024-01-15'
      },
      {
        id: '2',
        user: 'Jane Smith',
        rating: 4,
        comment: 'Beautiful writing and compelling characters. A must-read for literature lovers.',
        date: '2024-01-10'
      }
    ]

    const mockRelatedBooks: Book[] = [
      {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.6,
        description: 'A dystopian social science fiction novel.',
        genre: ['Dystopian', 'Classic'],
        publishedDate: '1949',
        pages: 328
      },
      {
        id: '3',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        cover: 'https://via.placeholder.com/150x200',
        rating: 4.7,
        description: 'A gripping tale of racial injustice.',
        genre: ['Classic', 'Drama'],
        publishedDate: '1960',
        pages: 376
      }
    ]

    setBook(mockBook)
    setReviews(mockReviews)
    setRelatedBooks(mockRelatedBooks)
  }, [id])

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    // TODO: API call to add/remove from favorites
  }

  const handleAddToReadingHistory = () => {
    setIsInReadingHistory(!isInReadingHistory)
    // TODO: API call to add to reading history
  }

  const handleSubmitReview = () => {
    if (newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: 'You',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 5, comment: '' })
      // TODO: API call to submit review
    }
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
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
              <Library className="h-6 w-6" />
              <span className="font-serif text-xl hidden sm:inline">Book Details</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Hero Section with Vintage Styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8"
        >
          {/* Book Cover with Ornate Frame */}
          <div className="lg:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative p-4 sm:p-6 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl"
              style={{
                border: '2px solid #8B4513',
                boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.1), 0 10px 40px rgba(139, 69, 19, 0.2)'
              }}
            >
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-700 dark:border-amber-600" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-700 dark:border-amber-600" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-700 dark:border-amber-600" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-700 dark:border-amber-600" />
              
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full rounded shadow-xl"
                style={{ filter: 'sepia(0.2) saturate(1.2)' }}
              />
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 dark:bg-amber-800 text-amber-50 rounded-full shadow-lg">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-serif text-sm">First Edition</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Book Details with Vintage Typography */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl"
              style={{
                border: '2px solid #D97706',
                backgroundImage: `linear-gradient(45deg, transparent 98%, rgba(139, 69, 19, 0.05) 0),
                                 linear-gradient(-45deg, transparent 98%, rgba(139, 69, 19, 0.05) 0)`
              }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-3"
                  style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}>
                {book.title}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <Feather className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <p className="font-serif text-2xl text-amber-800 dark:text-amber-200"
                   style={{ fontFamily: 'Crimson Text, serif' }}>
                  {book.author}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 p-4 bg-amber-100/50 dark:bg-gray-700/50 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-amber-600 text-amber-600' : 'text-amber-300'}`} />
                    ))}
                  </div>
                  <span className="font-serif text-lg font-bold text-amber-900 dark:text-amber-100">{book.rating}</span>
                  <span className="font-serif text-amber-700 dark:text-amber-300">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Calendar className="w-4 h-4" />
                  <span className="font-serif">{book.publishedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <ScrollText className="w-4 h-4" />
                  <span className="font-serif">{book.pages} pages</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.genre.map((g) => (
                  <span 
                    key={g} 
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-full font-serif text-sm shadow-md"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="mb-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg border-l-4 border-amber-600">
                <p className="font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200"
                   style={{ fontFamily: 'Crimson Text, serif', lineHeight: '1.8' }}>
                  {book.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToFavorites}
                  className={`px-6 py-3 rounded-lg font-serif flex items-center gap-2 transition-all duration-300 shadow-lg ${
                    isFavorite 
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-200 border-2 border-amber-600 hover:bg-amber-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? 'In Favorites' : 'Add to Favorites'}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToReadingHistory}
                  className={`px-6 py-3 rounded-lg font-serif flex items-center gap-2 transition-all duration-300 shadow-lg ${
                    isInReadingHistory 
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-200 border-2 border-amber-600 hover:bg-amber-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>{isInReadingHistory ? 'Reading Now' : 'Start Reading'}</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vintage Styled Tabs */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-600 dark:border-amber-800 rounded-lg p-1">
            <TabsTrigger 
              value="overview"
              className="font-serif data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="font-serif data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger 
              value="related"
              className="font-serif data-[state=active]:bg-amber-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Related Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
            >
              <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center gap-2">
                <ScrollText className="w-6 h-6" />
                Book Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200 dark:border-amber-700">
                  <h4 className="font-serif font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                    <Feather className="w-4 h-4" />
                    Author
                  </h4>
                  <p className="font-serif text-gray-700 dark:text-gray-300">{book.author}</p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200 dark:border-amber-700">
                  <h4 className="font-serif font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Published
                  </h4>
                  <p className="font-serif text-gray-700 dark:text-gray-300">{book.publishedDate}</p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200 dark:border-amber-700">
                  <h4 className="font-serif font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Pages
                  </h4>
                  <p className="font-serif text-gray-700 dark:text-gray-300">{book.pages}</p>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-amber-200 dark:border-amber-700">
                  <h4 className="font-serif font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </h4>
                  <p className="font-serif text-gray-700 dark:text-gray-300">{book.rating}/5.0</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Add Review with Vintage Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
              >
                <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center gap-2">
                  <Feather className="w-6 h-6" />
                  Write a Review
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="rating-buttons" className="block font-serif text-amber-800 dark:text-amber-200 font-bold mb-3">Your Rating</label>
                    <div id="rating-buttons" className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none transition-all duration-200"
                        >
                          <Star 
                            className={`w-8 h-8 ${
                              star <= newReview.rating 
                                ? 'fill-amber-600 text-amber-600' 
                                : 'text-amber-300 dark:text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="review-textarea" className="block font-serif text-amber-800 dark:text-amber-200 font-bold mb-3">Your Thoughts</label>
                    <textarea
                      id="review-textarea"
                      placeholder="Share your thoughts about this literary work..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full p-4 bg-white/50 dark:bg-gray-800/50 border-2 border-amber-300 dark:border-amber-700 rounded-lg font-serif text-gray-800 dark:text-gray-200 placeholder-amber-400 dark:placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      style={{ fontFamily: 'Crimson Text, serif' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitReview}
                    disabled={!newReview.comment.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg font-serif flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </motion.button>
                </div>
              </motion.div>

              {/* Reviews List with Vintage Cards */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg border-2 border-amber-200 dark:border-amber-800"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h4 className="font-serif font-bold text-amber-900 dark:text-amber-100">{review.user}</h4>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? 'fill-amber-600 text-amber-600' 
                                    : 'text-amber-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-serif text-sm text-amber-700 dark:text-amber-300">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <p className="font-serif text-gray-700 dark:text-gray-300 leading-relaxed"
                           style={{ fontFamily: 'Crimson Text, serif' }}>
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook, index) => (
                <motion.div
                  key={relatedBook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-300 dark:border-amber-700 cursor-pointer group"
                >
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600 dark:border-amber-500" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600 dark:border-amber-500" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600 dark:border-amber-500" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600 dark:border-amber-500" />
                  
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={relatedBook.cover} 
                      alt={relatedBook.title} 
                      className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-110"
                      style={{ filter: 'sepia(0.1) saturate(1.1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="font-serif font-bold text-amber-900 dark:text-amber-100 mb-2 line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {relatedBook.title}
                  </h3>
                  <p className="font-serif text-sm text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-1">
                    <Feather className="w-3 h-3" />
                    {relatedBook.author}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(relatedBook.rating) ? 'fill-amber-600 text-amber-600' : 'text-amber-300'}`} />
                      ))}
                    </div>
                    <span className="font-serif text-sm text-amber-700 dark:text-amber-300">{relatedBook.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {relatedBook.genre.slice(0, 2).map((g) => (
                      <span 
                        key={g} 
                        className="px-3 py-1 bg-amber-600 dark:bg-amber-700 text-white rounded-full font-serif text-xs"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
