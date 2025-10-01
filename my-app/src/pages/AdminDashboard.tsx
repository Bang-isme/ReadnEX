import { useState } from 'react';
import { motion } from 'framer-motion';
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';
import {
  Shield,
  Users,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  Star,
  Feather,
  Target
} from 'lucide-react';
import {
  mockUsers,
  mockBooks,
  mockAnnotatedVersions,
  mockQuizQuestions,
  mockReadingHistory,
  getPendingBooks,
  getUserCreatedBooks,
  type Book,
  type User as MockUser
} from '@/lib/mockData';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Calculate statistics
  const totalUsers = mockUsers.length;
  const totalBooks = mockBooks.filter(b => b.status === 'published').length;
  const pendingBooks = mockBooks.filter(b => b.status === 'pending_approval').length;
  const userCreatedBooks = getUserCreatedBooks().length;
  const totalAnnotatedVersions = mockAnnotatedVersions.length;
  const totalQuizQuestions = mockQuizQuestions.length;

  // User stats
  const adminUsers = mockUsers.filter(u => u.role === 'admin').length;
  const regularUsers = mockUsers.filter(u => u.role === 'user').length;

  // Book stats by genre
  const genreStats = mockBooks.reduce((acc: Record<string, number>, book) => {
    if (book.status === 'published') {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
    }
    return acc;
  }, {});

  // Reading activity
  const activeReaders = new Set(mockReadingHistory.map(h => h.user_id)).size;
  const totalReadingTime = mockReadingHistory.reduce((sum, h) => sum + h.reading_time_minutes, 0);

  // Handle actions
  const handleApproveBook = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    toast({
      title: "Book Approved",
      description: `"${book?.title}" has been approved and published to the library.`
    });
  };

  const handleRejectBook = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    toast({
      title: "Book Rejected",
      description: `"${book?.title}" has been rejected.`,
      variant: "destructive"
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    toast({
      title: "User Deleted",
      description: `${user?.first_name} ${user?.last_name} has been removed from the system.`,
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-burgundy-800 to-burgundy-900 dark:from-burgundy-900 dark:to-ink-950 text-parchment-100 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeInUp} className="flex items-center gap-4 mb-6">
            <Shield className="h-12 w-12 text-gold-leaf-400" />
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Admin Dashboard</h1>
              <p className="font-serif text-parchment-200/90 mt-2">
                Manage users, books, and content across ReadnEX
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Users, label: 'Total Users', value: totalUsers, color: 'text-blue-400' },
              { icon: BookOpen, label: 'Published Books', value: totalBooks, color: 'text-green-400' },
              { icon: Clock, label: 'Pending Approval', value: pendingBooks, color: 'text-orange-400' },
              { icon: Activity, label: 'Active Readers', value: activeReaders, color: 'text-purple-400' }
            ].map((stat, index) => (
              <VintageCard key={index} variant="manuscript" className="bg-parchment-50/10 backdrop-blur-sm border-parchment-200/20">
                <VintageCardContent className="p-4 text-center">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="font-display text-2xl font-bold text-parchment-100">
                    {stat.value}
                  </div>
                  <div className="font-serif text-xs text-parchment-200/80">
                    {stat.label}
                  </div>
                </VintageCardContent>
              </VintageCard>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 bg-parchment-200 dark:bg-ink-800">
            <TabsTrigger value="overview" className="font-serif">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="font-serif">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="books" className="font-serif">
              <BookOpen className="h-4 w-4 mr-2" />
              Books
            </TabsTrigger>
            <TabsTrigger value="approvals" className="font-serif">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approvals
            </TabsTrigger>
            <TabsTrigger value="content" className="font-serif">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Charts Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* User Statistics */}
                <motion.div {...fadeInUp}>
                  <VintageCard variant="aged" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        User Statistics
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm font-serif mb-2">
                            <span className="text-ink-600 dark:text-parchment-400">Regular Users</span>
                            <span className="font-bold text-ink-900 dark:text-parchment-100">{regularUsers}</span>
                          </div>
                          <div className="h-3 bg-parchment-200 dark:bg-ink-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-burgundy-600"
                              style={{ width: `${(regularUsers / totalUsers) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm font-serif mb-2">
                            <span className="text-ink-600 dark:text-parchment-400">Administrators</span>
                            <span className="font-bold text-ink-900 dark:text-parchment-100">{adminUsers}</span>
                          </div>
                          <div className="h-3 bg-parchment-200 dark:bg-ink-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold-leaf-600"
                              style={{ width: `${(adminUsers / totalUsers) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="pt-4 border-t border-parchment-300 dark:border-ink-700">
                          <div className="text-center">
                            <div className="font-display text-3xl font-bold text-ink-900 dark:text-parchment-100">
                              {totalUsers}
                            </div>
                            <p className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                              Total Users
                            </p>
                          </div>
                        </div>
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>

                {/* Genre Distribution */}
                <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                  <VintageCard variant="paper" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        Books by Genre
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="space-y-3">
                        {Object.entries(genreStats).slice(0, 5).map(([genre, count]) => (
                          <div key={genre}>
                            <div className="flex justify-between text-sm font-serif mb-1">
                              <span className="text-ink-600 dark:text-parchment-400">{genre}</span>
                              <span className="font-bold text-ink-900 dark:text-parchment-100">{count}</span>
                            </div>
                            <div className="h-2 bg-parchment-200 dark:bg-ink-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-forest-600"
                                style={{ width: `${(count / totalBooks) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>

                {/* Activity Stats */}
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                  <VintageCard variant="manuscript" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        Reading Activity
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                            {activeReaders}
                          </div>
                          <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                            Active Readers
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                            {Math.round(totalReadingTime / 60)}h
                          </div>
                          <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                            Total Hours
                          </p>
                        </div>
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>

                {/* Content Stats */}
                <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                  <VintageCard variant="aged" ornate>
                    <VintageCardHeader>
                      <VintageCardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                        Content Overview
                      </VintageCardTitle>
                    </VintageCardHeader>
                    <VintageCardContent>
                      <div className="space-y-3 font-serif text-sm">
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Annotated Versions</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{totalAnnotatedVersions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">User Created Books</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{userCreatedBooks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ink-600 dark:text-parchment-400">Quiz Questions</span>
                          <span className="font-bold text-ink-900 dark:text-parchment-100">{totalQuizQuestions}</span>
                        </div>
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate>
                <VintageCardHeader>
                  <div className="flex items-center justify-between">
                    <VintageCardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                      User Management ({totalUsers})
                    </VintageCardTitle>
                    <Button size="sm" className="bg-burgundy-700 hover:bg-burgundy-800 text-parchment-50 font-serif">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </VintageCardHeader>
                <VintageCardContent>
                  {/* Search */}
                  <div className="mb-6 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-500" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 font-serif bg-parchment-50 dark:bg-ink-900"
                    />
                  </div>

                  {/* Users Table */}
                  <div className="space-y-3">
                    {mockUsers.map((user) => (
                      <VintageCard key={user.id} variant="aged" hoverable>
                        <VintageCardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-display text-lg font-bold text-ink-900 dark:text-parchment-100">
                                  {user.first_name} {user.last_name}
                                </h4>
                                <Badge className={
                                  user.role === 'admin'
                                    ? "bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300"
                                    : "bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300"
                                }>
                                  {user.role}
                                </Badge>
                              </div>
                              <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-2">
                                {user.email}
                              </p>
                              <div className="flex gap-4 text-xs font-serif text-ink-600 dark:text-parchment-400">
                                <span>Joined: {new Date(user.joined_date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{user.books_read} books read</span>
                                <span>•</span>
                                <span>{user.reading_streak} day streak</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="font-serif">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="font-serif">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="font-serif text-red-600 border-red-600"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </VintageCardContent>
                      </VintageCard>
                    ))}
                  </div>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books">
            <motion.div {...fadeInUp}>
              <VintageCard variant="paper" ornate>
                <VintageCardHeader>
                  <div className="flex items-center justify-between">
                    <VintageCardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                      Book Library ({mockBooks.length})
                    </VintageCardTitle>
                    <Button size="sm" className="bg-burgundy-700 hover:bg-burgundy-800 text-parchment-50 font-serif">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Book
                    </Button>
                  </div>
                </VintageCardHeader>
                <VintageCardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockBooks.slice(0, 6).map((book) => (
                      <VintageCard key={book.id} variant="aged" hoverable>
                        <VintageCardContent className="p-4">
                          <div className="flex gap-3 mb-3">
                            <img
                              src={book.cover_image}
                              alt={book.title}
                              className="w-16 h-24 object-cover rounded-sm shadow-md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-sm font-bold text-ink-900 dark:text-parchment-100 mb-1 truncate">
                                {book.title}
                              </h4>
                              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400 mb-2 truncate">
                                {book.author}
                              </p>
                              <Badge className="text-xs font-serif">
                                {book.genre}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 font-serif text-xs">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="font-serif text-xs text-red-600 border-red-600">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </VintageCardContent>
                      </VintageCard>
                    ))}
                  </div>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <motion.div {...fadeInUp}>
              <VintageCard variant="manuscript" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Pending Approvals ({pendingBooks})
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  {pendingBooks > 0 ? (
                    <div className="space-y-4">
                      {mockBooks
                        .filter(b => b.status === 'pending_approval')
                        .map((book) => (
                          <VintageCard key={book.id} variant="aged" className="border-l-4 border-orange-600">
                            <VintageCardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={book.cover_image}
                                  alt={book.title}
                                  className="w-24 h-32 object-cover rounded-sm shadow-md"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h4 className="font-display text-xl font-bold text-ink-900 dark:text-parchment-100 mb-1">
                                        {book.title}
                                      </h4>
                                      <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-2">
                                        by {book.author}
                                      </p>
                                    </div>
                                    <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 font-serif">
                                      Pending Review
                                    </Badge>
                                  </div>
                                  <p className="font-serif text-sm text-ink-700 dark:text-parchment-300 mb-3 line-clamp-2">
                                    {book.description}
                                  </p>
                                  <div className="flex gap-4 text-xs font-serif text-ink-600 dark:text-parchment-400 mb-4">
                                    <span>Genre: {book.genre}</span>
                                    <span>•</span>
                                    <span>{book.pages} pages</span>
                                    <span>•</span>
                                    <span>Submitted: {new Date(book.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-forest-700 hover:bg-forest-800 text-parchment-50 font-serif"
                                      onClick={() => handleApproveBook(book.id)}
                                    >
                                      <CheckCircle className="h-3 w-3 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="font-serif text-red-600 border-red-600"
                                      onClick={() => handleRejectBook(book.id)}
                                    >
                                      <XCircle className="h-3 w-3 mr-2" />
                                      Reject
                                    </Button>
                                    <Button size="sm" variant="outline" className="font-serif">
                                      <Eye className="h-3 w-3 mr-2" />
                                      Preview
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </VintageCardContent>
                          </VintageCard>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-forest-600" />
                      <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
                        All Caught Up!
                      </h3>
                      <p className="font-serif text-ink-600 dark:text-parchment-400">
                        No books pending approval at the moment.
                      </p>
                    </div>
                  )}
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Annotated Versions */}
              <motion.div {...fadeInUp}>
                <VintageCard variant="aged" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <Feather className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                      Annotated Versions ({totalAnnotatedVersions})
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <div className="space-y-3">
                      {mockAnnotatedVersions.slice(0, 3).map((version) => (
                        <div key={version.id} className="p-3 bg-parchment-100 dark:bg-ink-900 rounded-sm">
                          <h5 className="font-serif font-semibold text-ink-900 dark:text-parchment-100 mb-1 text-sm">
                            {version.title}
                          </h5>
                          <div className="flex items-center gap-3 text-xs font-serif text-ink-600 dark:text-parchment-400">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-gold-leaf-600" />
                              {version.rating}
                            </span>
                            <span>•</span>
                            <span>{version.downloads} downloads</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>

              {/* Quiz Questions */}
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <VintageCard variant="paper" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                      Quiz Questions ({totalQuizQuestions})
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <div className="space-y-3">
                      {mockQuizQuestions.slice(0, 3).map((quiz) => (
                        <div key={quiz.id} className="p-3 bg-parchment-100 dark:bg-ink-900 rounded-sm">
                          <p className="font-serif text-sm text-ink-900 dark:text-parchment-100 mb-2">
                            {quiz.question}
                          </p>
                          <div className="flex gap-2">
                            <Badge className="text-xs font-serif">
                              {quiz.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-serif">
                              {quiz.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
