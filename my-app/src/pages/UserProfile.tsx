import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  BookOpen,
  Heart,
  Star,
  Trophy,
  Quote,
  Clock,
  Target,
  Award,
  Flame,
  TrendingUp,
  BookMarked,
  Feather,
  CheckCircle,
  Eye,
  Calendar,
  BarChart3,
  Sparkles,
  FileText,
  ChevronRight
} from 'lucide-react';
import {
  getUserStats,
  getReadingHistoryByUserId,
  getFavoritesByUserId,
  getBookById,
  mockQuizAttempts,
  mockAnnotations,
  getUserCreatedBooks,
  mockUsers
} from '@/lib/mockData';

export default function UserProfile() {
  const currentUserId = 'user-1'; // Mock current user
  
  // Get data from mock data
  const userStats = getUserStats(currentUserId);
  const readingHistory = getReadingHistoryByUserId(currentUserId);
  const userFavorites = getFavoritesByUserId(currentUserId);
  const userQuizzes = mockQuizAttempts.filter(attempt => attempt.user_id === currentUserId);
  const userAnnotations = mockAnnotations.filter(anno => anno.user_id === currentUserId);
  const currentUser = mockUsers.find(u => u.id === currentUserId);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Calculate reading stats
  const currentlyReading = readingHistory.filter(h => h.progress_percentage > 0 && h.progress_percentage < 100);
  const completedBooks = readingHistory.filter(h => h.progress_percentage === 100);

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950">
      {/* Hero Header */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-b from-burgundy-700 via-burgundy-800 to-burgundy-900 dark:from-burgundy-900 dark:via-ink-900 dark:to-ink-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 right-4 text-right"
          >
            <Quote className="h-6 w-6 ml-auto text-parchment-300/50 mb-1" />
            <p className="font-serif text-sm italic text-parchment-200/70">
              "A reader lives a thousand lives before he dies"
            </p>
          </motion.div>
        </div>

        {/* Profile Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-gold-leaf-600 dark:border-gold-leaf-700 shadow-lg">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.email}`} />
                      <AvatarFallback className="bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300 font-display text-3xl">
                        {currentUser?.first_name[0]}{currentUser?.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h1 className="font-display text-3xl md:text-4xl text-ink-900 dark:text-parchment-100 mb-2">
                      {currentUser?.first_name} {currentUser?.last_name}
                    </h1>
                    <p className="font-serif text-burgundy-700 dark:text-gold-leaf-400 mb-3">
                      {currentUser?.email}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 font-serif">
                        <Trophy className="h-3 w-3 mr-1" />
                        Member since {new Date(currentUser?.joined_date || '').getFullYear()}
                      </Badge>
                      <Badge className="bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300 font-serif">
                        <Flame className="h-3 w-3 mr-1" />
                        {currentUser?.reading_streak} day streak
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                {userStats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-parchment-300 dark:border-ink-700">
                    {[
                      { icon: BookOpen, label: 'Books Read', value: userStats.books_read, color: 'text-burgundy-600' },
                      { icon: Clock, label: 'Hours Reading', value: userStats.reading_time_hours, color: 'text-forest-600' },
                      { icon: Feather, label: 'Annotations', value: userStats.annotations_made, color: 'text-gold-leaf-600' },
                      { icon: Award, label: 'Avg Quiz Score', value: `${userStats.average_quiz_score}%`, color: 'text-burgundy-600' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="text-center"
                      >
                        <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <p className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                          {stat.value}
                        </p>
                        <p className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </VintageCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 bg-parchment-200 dark:bg-ink-800">
            <TabsTrigger value="overview" className="font-serif">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="reading" className="font-serif">
              <BookOpen className="h-4 w-4 mr-2" />
              Reading
            </TabsTrigger>
            <TabsTrigger value="favorites" className="font-serif">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="annotations" className="font-serif">
              <Feather className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="font-serif">
              <Trophy className="h-4 w-4 mr-2" />
              Quizzes
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Reading Goal */}
              {userStats && (
                <motion.div {...fadeInUp}>
                  <VintageCard variant="aged" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        2025 Reading Goal
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="font-display text-3xl font-bold text-ink-900 dark:text-parchment-100">
                            {userStats.books_read}
                          </span>
                          <span className="font-serif text-ink-600 dark:text-parchment-400">
                            of 52 books
                          </span>
                        </div>
                        <Progress value={(userStats.books_read / 52) * 100} className="h-3" />
                      </div>
                      <p className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                        You're {Math.round((userStats.books_read / 52) * 100)}% of the way there! Keep going!
                      </p>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              )}

              {/* Current Streak */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <VintageCard variant="paper" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-600" />
                      Reading Streak
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <div className="flex items-center justify-center py-4">
                      <div className="text-center">
                        <div className="font-display text-5xl font-bold text-orange-600 mb-2">
                          {userStats?.reading_streak_days}
                        </div>
                        <p className="font-serif text-ink-600 dark:text-parchment-400">
                          Days in a row
                        </p>
                      </div>
                    </div>
                    <p className="font-serif text-sm text-center text-ink-600 dark:text-parchment-400 mt-4">
                      🔥 You're on fire! Don't break the streak!
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>

              {/* Favorite Genre */}
              {userStats && (
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                  <VintageCard variant="manuscript" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                        Favorite Genre
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <Badge className="text-lg px-4 py-2 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 font-serif">
                        {userStats.favorite_genre}
                      </Badge>
                      <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-4">
                        Based on your reading history and preferences
                      </p>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              )}

              {/* Quick Stats */}
              {userStats && (
                <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                  <VintageCard variant="aged" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                        Quick Stats
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="space-y-3 font-serif text-sm">
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Pages Read</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{userStats.pages_read.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Reviews Written</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{userStats.reviews_written}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Quizzes Completed</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{userStats.quizzes_completed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Books Created</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{userStats.books_created}</span>
                        </div>
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* Reading History Tab */}
          <TabsContent value="reading">
            <div className="space-y-6">
              {/* Currently Reading */}
              {currentlyReading.length > 0 && (
                <motion.div {...fadeInUp}>
                  <VintageCard variant="manuscript" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        Currently Reading ({currentlyReading.length})
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="space-y-4">
                        {currentlyReading.map((history) => {
                          const book = getBookById(history.book_id);
                          if (!book) return null;

                          return (
                            <VintageCard key={history.id} variant="aged" hoverable>
                              <VintageCardContent className="p-4">
                                <div className="flex gap-4">
                                  <img
                                    src={book.cover_image}
                                    alt={book.title}
                                    className="w-20 h-28 object-cover rounded-sm shadow-md"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-display text-lg font-bold text-ink-900 dark:text-parchment-100 mb-1">
                                      {book.title}
                                    </h4>
                                    <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-3">
                                      by {book.author}
                                    </p>
                                    <div className="mb-2">
                                      <div className="flex justify-between text-sm font-serif mb-1">
                                        <span>Progress: {history.progress_percentage}%</span>
                                        <span>Page {history.current_page} of {history.total_pages}</span>
                                      </div>
                                      <Progress value={history.progress_percentage} className="h-2" />
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-serif text-ink-600 dark:text-parchment-400">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {history.reading_time_minutes} min
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Last read {new Date(history.last_read_at).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    asChild
                                    size="sm"
                                    className="bg-burgundy-700 hover:bg-burgundy-800 text-parchment-50 font-serif"
                                  >
                                    <Link to={`/book/${book.id}`}>
                                      Continue
                                    </Link>
                                  </Button>
                                </div>
                              </VintageCardContent>
                            </VintageCard>
                          );
                        })}
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              )}

              {/* Completed Books */}
              {completedBooks.length > 0 && (
                <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                  <VintageCard variant="paper" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                        Completed Books ({completedBooks.length})
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {completedBooks.map((history) => {
                          const book = getBookById(history.book_id);
                          if (!book) return null;

                          return (
                            <VintageCard key={history.id} variant="aged" hoverable>
                              <VintageCardContent className="p-4">
                                <div className="flex gap-3">
                                  <img
                                    src={book.cover_image}
                                    alt={book.title}
                                    className="w-16 h-24 object-cover rounded-sm shadow-md"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-display text-base font-bold text-ink-900 dark:text-parchment-100 mb-1 truncate">
                                      {book.title}
                                    </h4>
                                    <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-2 truncate">
                                      {book.author}
                                    </p>
                                    <Badge className="bg-forest-100 dark:bg-forest-900/30 text-forest-800 dark:text-forest-300 text-xs font-serif">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Completed
                                    </Badge>
                                  </div>
                                </div>
                              </VintageCardContent>
                            </VintageCard>
                          );
                        })}
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-burgundy-700 dark:text-burgundy-400" />
                    My Favorite Books ({userFavorites.length})
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  {userFavorites.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      {userFavorites.map((fav) => {
                        const book = fav.book_id ? getBookById(fav.book_id) : null;
                        if (!book) return null;

                        return (
                          <VintageCard key={fav.id} variant="aged" hoverable>
                            <VintageCardContent className="p-4">
                              <div className="relative mb-4">
                                <img
                                  src={book.cover_image}
                                  alt={book.title}
                                  className="w-full h-48 object-cover rounded-sm shadow-md"
                                />
                                <Heart className="absolute top-2 right-2 h-5 w-5 text-burgundy-700 fill-current" />
                              </div>
                              <h4 className="font-display text-base font-bold text-ink-900 dark:text-parchment-100 mb-1">
                                {book.title}
                              </h4>
                              <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-3">
                                {book.author}
                              </p>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="w-full font-serif"
                              >
                                <Link to={`/book/${book.id}`}>
                                  <Eye className="h-3 w-3 mr-2" />
                                  View Book
                                </Link>
                              </Button>
                            </VintageCardContent>
                          </VintageCard>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                      <p className="font-serif text-ink-600 dark:text-parchment-400">
                        No favorite books yet. Start exploring!
                      </p>
                    </div>
                  )}
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>

          {/* Annotations Tab */}
          <TabsContent value="annotations">
            <motion.div {...fadeInUp}>
              <VintageCard variant="paper" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Feather className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    My Annotations ({userAnnotations.length})
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  {userAnnotations.length > 0 ? (
                    <div className="space-y-4">
                      {userAnnotations.map((annotation) => {
                        const book = getBookById(annotation.book_id);
                        return (
                          <VintageCard key={annotation.id} variant="aged">
                            <VintageCardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`w-1 h-full rounded-full ${
                                  annotation.color === 'yellow' ? 'bg-yellow-400' :
                                  annotation.color === 'green' ? 'bg-green-400' :
                                  annotation.color === 'blue' ? 'bg-blue-400' : 'bg-pink-400'
                                }`} />
                                <div className="flex-1">
                                  <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-2">
                                    From <span className="font-semibold">{book?.title}</span>
                                  </p>
                                  <blockquote className="font-serif italic text-ink-900 dark:text-parchment-100 mb-2 pl-4 border-l-2 border-gold-leaf-600">
                                    "{annotation.text_selection}"
                                  </blockquote>
                                  {annotation.note && (
                                    <p className="font-serif text-sm text-ink-700 dark:text-parchment-300 bg-gold-leaf-50 dark:bg-gold-leaf-950/20 p-3 rounded-sm">
                                      <FileText className="h-4 w-4 inline mr-1" />
                                      {annotation.note}
                                    </p>
                                  )}
                                  <p className="font-serif text-xs text-ink-500 dark:text-parchment-500 mt-2">
                                    {new Date(annotation.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </VintageCardContent>
                          </VintageCard>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Feather className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                      <p className="font-serif text-ink-600 dark:text-parchment-400">
                        No annotations yet. Start highlighting!
                      </p>
                    </div>
                  )}
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    Quiz History ({userQuizzes.length})
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  {userQuizzes.length > 0 ? (
                    <div className="space-y-4">
                      {userQuizzes.map((quiz) => {
                        const book = getBookById(quiz.book_id);
                        const percentage = Math.round((quiz.score / quiz.total_questions) * 100);
                        const passed = percentage >= 60;

                        return (
                          <VintageCard key={quiz.id} variant="aged" hoverable>
                            <VintageCardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${
                                  passed ? 'bg-forest-100 dark:bg-forest-900/30' : 'bg-ink-200 dark:bg-ink-800'
                                }`}>
                                  <Trophy className={`h-6 w-6 ${
                                    passed ? 'text-forest-700 dark:text-forest-400' : 'text-ink-600 dark:text-parchment-400'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-display text-lg font-bold text-ink-900 dark:text-parchment-100 mb-1">
                                    {book?.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-3 text-sm font-serif text-ink-600 dark:text-parchment-400">
                                    <span>Score: {quiz.score}/{quiz.total_questions}</span>
                                    <span>•</span>
                                    <span>{percentage}%</span>
                                    <span>•</span>
                                    <span>{Math.floor(quiz.time_taken_seconds / 60)}m {quiz.time_taken_seconds % 60}s</span>
                                    <Badge className={
                                      passed
                                        ? "bg-forest-100 dark:bg-forest-900/30 text-forest-800 dark:text-forest-300"
                                        : "bg-ink-200 dark:bg-ink-800 text-ink-800 dark:text-parchment-300"
                                    }>
                                      {passed ? 'Passed' : 'Failed'}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="font-serif"
                                >
                                  <Link to={`/quiz/${book?.id}`}>
                                    Retake
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Link>
                                </Button>
                              </div>
                            </VintageCardContent>
                          </VintageCard>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                      <p className="font-serif text-ink-600 dark:text-parchment-400 mb-4">
                        No quizzes completed yet. Test your knowledge!
                      </p>
                      <Button
                        asChild
                        className="bg-burgundy-700 hover:bg-burgundy-800 text-parchment-50 font-serif"
                      >
                        <Link to="/readnex">
                          Start Reading
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
