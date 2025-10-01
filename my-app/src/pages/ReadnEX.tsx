import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import VintagePageHeader from '@/components/VintagePageHeader';
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '@/components/ui/vintage-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  Heart,
  Star,
  Clock,
  Search,
  Filter,
  TrendingUp,
  Feather,
  BookMarked,
  Award,
  Target,
  Calendar,
  History,
  Flame,
  Library,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  Eye
} from 'lucide-react';
import {
  mockBooks,
  mockReadingHistory,
  mockFavorites,
  mockUserStats,
  getReadingHistoryByUserId,
  getFavoritesByUserId,
  getUserStats,
  getBookById,
  type Book,
  type ReadingHistory
} from '@/lib/mockData';

export default function ReadnEX() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'completed' | 'favorites'>('reading');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState<string>('all');

  const currentUserId = 'user-1'; // Mock current user

  // Get user data
  const userStats = getUserStats(currentUserId);
  const readingHistory = getReadingHistoryByUserId(currentUserId);
  const userFavorites = getFavoritesByUserId(currentUserId);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Get books with reading progress
  const booksWithProgress = readingHistory.map(history => {
    const book = getBookById(history.book_id);
    return book ? { ...book, history } : null;
  }).filter(Boolean) as (Book & { history: ReadingHistory })[];

  // Filter books
  const currentlyReading = booksWithProgress.filter(
    b => b.history.progress_percentage > 0 && b.history.progress_percentage < 100
  );

  const completedBooks = booksWithProgress.filter(
    b => b.history.progress_percentage === 100
  );

  const favoriteBooks = userFavorites
    .map(fav => fav.book_id ? getBookById(fav.book_id) : null)
    .filter(Boolean) as Book[];

  // All available books
  const allBooks = mockBooks.filter(book => book.status === 'published');

  // Get unique genres
  const genres = ['all', ...Array.from(new Set(allBooks.map(book => book.genre)))];

  // Filter and search logic
  const filterBooks = (books: Book[]) => {
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === filterGenre);
    }

    return filtered;
  };

  const getDisplayBooks = () => {
    switch (activeTab) {
      case 'reading':
        return filterBooks(currentlyReading);
      case 'completed':
        return filterBooks(completedBooks);
      case 'favorites':
        return filterBooks(favoriteBooks);
      default:
        return filterBooks(allBooks);
    }
  };

  const displayBooks = getDisplayBooks();

  const BookCard = ({ book, history }: { book: Book; history?: ReadingHistory }) => {
    const isFavorite = userFavorites.some(fav => fav.book_id === book.id);
    const progress = history?.progress_percentage || 0;

    return (
      <motion.div {...fadeInUp}>
        <VintageCard variant="aged" ornate hoverable className="h-full">
          <div className="relative">
            {/* Cover Image */}
            <div className="relative h-64 overflow-hidden bg-parchment-200 dark:bg-ink-800 rounded-t">
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className="bg-burgundy-700 text-parchment-100 font-serif">
                  {book.genre}
                </Badge>
                {isFavorite && (
                  <Badge className="bg-gold-leaf-600 text-ink-900 font-serif">
                    <Heart className="h-3 w-3 fill-current" />
                  </Badge>
                )}
              </div>
              
              {/* Progress Overlay */}
              {progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-ink-900/80 backdrop-blur-sm p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-serif text-parchment-100">
                      {progress}% Complete
                    </span>
                    {progress === 100 && (
                      <CheckCircle2 className="h-4 w-4 text-forest-400" />
                    )}
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}
            </div>

            <VintageCardHeader>
              <VintageCardTitle className="text-lg line-clamp-2">
                {book.title}
              </VintageCardTitle>
              <p className="text-sm font-serif text-ink-600 dark:text-parchment-400 mt-1">
                by {book.author}
              </p>
            </VintageCardHeader>

            <VintageCardContent>
              <p className="text-sm font-serif text-ink-700 dark:text-parchment-300 line-clamp-2 mb-4">
                {book.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-parchment-300 dark:border-ink-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-3 w-3 text-gold-leaf-600 fill-current" />
                    <span className="font-serif text-sm font-bold text-ink-900 dark:text-parchment-100">
                      {book.rating}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    rating
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-3 w-3 text-burgundy-600 dark:text-burgundy-400" />
                    <span className="font-serif text-sm font-bold text-ink-900 dark:text-parchment-100">
                      {book.pages}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    pages
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-3 w-3 text-forest-600 dark:text-forest-400" />
                    <span className="font-serif text-sm font-bold text-ink-900 dark:text-parchment-100">
                      {book.published_year}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    year
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                >
                  <Link to={`/book/${book.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    {progress > 0 && progress < 100 ? 'Continue' : progress === 100 ? 'Read Again' : 'Start Reading'}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-burgundy-700 dark:border-burgundy-600"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-burgundy-700' : ''}`} />
                </Button>
              </div>
            </VintageCardContent>
          </div>
        </VintageCard>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment-50 dark:bg-ink-950">
      {/* Hero Section with Stats */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-burgundy-800 to-burgundy-900 dark:from-burgundy-900 dark:to-ink-950 text-parchment-100">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Library className="h-10 w-10 text-gold-leaf-400" />
              <h1 className="font-display text-4xl md:text-6xl font-bold">
                ReadnEX Library
              </h1>
            </div>
            <p className="font-serif text-xl text-parchment-200/90">
              Your personal literary sanctuary
            </p>
          </motion.div>

          {/* Stats Cards */}
          {userStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: BookOpen, label: 'Books Read', value: userStats.books_read, color: 'text-burgundy-400' },
                { icon: Flame, label: 'Day Streak', value: userStats.reading_streak_days, color: 'text-orange-400' },
                { icon: Clock, label: 'Hours Read', value: userStats.reading_time_hours, color: 'text-forest-400' },
                { icon: Award, label: 'Avg Quiz Score', value: `${userStats.average_quiz_score}%`, color: 'text-gold-leaf-400' }
              ].map((stat, index) => (
                <VintageCard key={index} variant="manuscript" className="p-4 text-center bg-parchment-50/10 backdrop-blur-sm border-parchment-200/20">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="font-display text-2xl font-bold text-parchment-100">
                    {stat.value}
                  </div>
                  <div className="font-serif text-sm text-parchment-200/80">
                    {stat.label}
                  </div>
                </VintageCard>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Library Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <motion.div {...fadeInUp} className="mb-8">
            <VintageCard variant="paper" ornate className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ink-500 dark:text-parchment-500" />
                  <input
                    type="text"
                    placeholder="Search books or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 font-serif bg-parchment-50 dark:bg-ink-950 border-2 border-ink-300 dark:border-ink-700 rounded-sm focus:outline-none focus:border-burgundy-600 dark:focus:border-gold-leaf-600"
                  />
                </div>

                {/* Genre Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-ink-600 dark:text-parchment-400" />
                  <select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="px-4 py-3 font-serif bg-parchment-50 dark:bg-ink-950 border-2 border-ink-300 dark:border-ink-700 rounded-sm focus:outline-none focus:border-burgundy-600 dark:focus:border-gold-leaf-600"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre === 'all' ? 'All Genres' : genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </VintageCard>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-parchment-200 dark:bg-ink-800">
              <TabsTrigger value="all" className="font-serif">
                <Library className="h-4 w-4 mr-2" />
                All ({allBooks.length})
              </TabsTrigger>
              <TabsTrigger value="reading" className="font-serif">
                <BookOpen className="h-4 w-4 mr-2" />
                Reading ({currentlyReading.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="font-serif">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed ({completedBooks.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="font-serif">
                <Heart className="h-4 w-4 mr-2" />
                Favorites ({favoriteBooks.length})
              </TabsTrigger>
            </TabsList>

            {/* Books Grid */}
            <TabsContent value={activeTab}>
              {displayBooks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayBooks.map((book) => {
                    const history = 'history' in book ? book.history : undefined;
                    return (
                      <BookCard
                        key={book.id}
                        book={book}
                        history={history}
                      />
                    );
                  })}
                </div>
              ) : (
                <VintageCard variant="aged" className="p-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                  <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
                    No Books Found
                  </h3>
                  <p className="font-serif text-ink-600 dark:text-parchment-400 mb-6">
                    {searchQuery || filterGenre !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Start your reading journey by selecting a book'}
                  </p>
                  {activeTab === 'all' && (
                    <Button
                      asChild
                      className="bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                    >
                      <Link to="/noteshare">
                        Explore NoteShare
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </VintageCard>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reading Goal Section */}
      {userStats && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="h-8 w-8 text-burgundy-700 dark:text-gold-leaf-500" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                      2025 Reading Goal
                    </h3>
                    <p className="font-serif text-ink-600 dark:text-parchment-400">
                      {userStats.books_read} of 52 books completed
                    </p>
                  </div>
                </div>
                <Progress value={(userStats.books_read / 52) * 100} className="h-3 mb-4" />
                <div className="flex justify-between font-serif text-sm text-ink-600 dark:text-parchment-400">
                  <span>Keep going! You're {Math.round((userStats.books_read / 52) * 100)}% there</span>
                  <span>{52 - userStats.books_read} books to go</span>
                </div>
              </VintageCard>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
