import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Star,
  MoreVertical,
  PenTool,
  FileText,
  Calendar,
  Send
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

interface Book {
  id: string
  title: string
  author: string
  genre: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  coverImage: string
  createdAt: string
  views: number
  rating: number
  reviews: number
}

export default function MyBooks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  
  // Sample data - replace with API call
  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'The Enchanted Garden',
      author: 'Jane Austen',
      genre: 'Fantasy',
      status: 'approved',
      coverImage: '/api/placeholder/200/300',
      createdAt: '2024-01-15',
      views: 1250,
      rating: 4.5,
      reviews: 23
    },
    {
      id: '2',
      title: 'Mysteries of the Old Library',
      author: 'Jane Austen',
      genre: 'Mystery',
      status: 'pending',
      coverImage: '/api/placeholder/200/300',
      createdAt: '2024-02-20',
      views: 450,
      rating: 0,
      reviews: 0
    },
    {
      id: '3',
      title: 'Love in Victorian Times',
      author: 'Jane Austen',
      genre: 'Romance',
      status: 'draft',
      coverImage: '/api/placeholder/200/300',
      createdAt: '2024-03-01',
      views: 0,
      rating: 0,
      reviews: 0
    },
    {
      id: '4',
      title: 'The Rejected Manuscript',
      author: 'Jane Austen',
      genre: 'Drama',
      status: 'rejected',
      coverImage: '/api/placeholder/200/300',
      createdAt: '2024-01-10',
      views: 120,
      rating: 0,
      reviews: 0
    }
  ])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-parchment-400 text-ink-700 dark:bg-ink-600 dark:text-parchment-300', icon: FileText },
      pending: { color: 'bg-gold-leaf-500 text-ink-900 dark:bg-gold-leaf-600 dark:text-parchment-100', icon: Clock },
      approved: { color: 'bg-forest-600 text-parchment-100 dark:bg-forest-500', icon: CheckCircle },
      rejected: { color: 'bg-burgundy-600 text-parchment-100 dark:bg-burgundy-500', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} font-serif flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: books.length,
    approved: books.filter(b => b.status === 'approved').length,
    pending: books.filter(b => b.status === 'pending').length,
    drafts: books.filter(b => b.status === 'draft').length,
    totalViews: books.reduce((sum, b) => sum + b.views, 0),
    avgRating: books.filter(b => b.rating > 0).reduce((sum, b, _, arr) => sum + b.rating / arr.length, 0) || 0
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl text-ink-900 dark:text-parchment-100 mb-2">
                My Literary Works
              </h1>
              <p className="font-serif text-ink-700 dark:text-parchment-300">
                Manage your manuscripts and track their journey
              </p>
            </div>
            <Link to="/create-book">
              <Button className="bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Create New Book
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <VintageCard variant="paper" className="p-4 text-center">
              <BookOpen className="h-6 w-6 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.total}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">Total Books</p>
            </VintageCard>
            
            <VintageCard variant="paper" className="p-4 text-center">
              <CheckCircle className="h-6 w-6 mx-auto text-forest-600 dark:text-forest-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.approved}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">Published</p>
            </VintageCard>
            
            <VintageCard variant="paper" className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.pending}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">In Review</p>
            </VintageCard>
            
            <VintageCard variant="paper" className="p-4 text-center">
              <FileText className="h-6 w-6 mx-auto text-parchment-600 dark:text-parchment-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.drafts}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">Drafts</p>
            </VintageCard>
            
            <VintageCard variant="paper" className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto text-burgundy-600 dark:text-burgundy-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.totalViews}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">Total Views</p>
            </VintageCard>
            
            <VintageCard variant="paper" className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto text-gold-leaf-600 dark:text-gold-leaf-500 mb-2" />
              <p className="font-display text-2xl text-ink-900 dark:text-parchment-100">{stats.avgRating.toFixed(1)}</p>
              <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">Avg Rating</p>
            </VintageCard>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <VintageCard variant="aged" ornate>
            <VintageCardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <VintageCardTitle>Your Books</VintageCardTitle>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-500 dark:text-parchment-500" />
                    <Input
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-parchment-100 dark:bg-ink-800 w-full sm:w-64"
                    />
                  </div>
                  
                  <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-full sm:w-auto">
                    <TabsList className="bg-parchment-100 dark:bg-ink-800">
                      <TabsTrigger value="all" className="font-serif">All</TabsTrigger>
                      <TabsTrigger value="draft" className="font-serif">Drafts</TabsTrigger>
                      <TabsTrigger value="pending" className="font-serif">Pending</TabsTrigger>
                      <TabsTrigger value="approved" className="font-serif">Published</TabsTrigger>
                      <TabsTrigger value="rejected" className="font-serif">Rejected</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </VintageCardHeader>
            
            <VintageCardContent>
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-parchment-400 dark:text-ink-600 mb-4" />
                  <p className="font-serif text-ink-600 dark:text-parchment-400">
                    No books found matching your criteria
                  </p>
                  <Link to="/create-book">
                    <Button variant="outline" className="mt-4">
                      <PenTool className="h-4 w-4 mr-2" />
                      Create Your First Book
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="group relative bg-parchment-100 dark:bg-ink-800 rounded-lg overflow-hidden border border-parchment-300 dark:border-ink-700 hover:shadow-lg transition-all">
                        {/* Book Cover */}
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            {getStatusBadge(book.status)}
                          </div>
                          
                          {/* Overlay with actions */}
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-parchment-100/90 hover:bg-parchment-100">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 bg-parchment-100/90 hover:bg-parchment-100">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Book Info */}
                        <div className="p-4">
                          <h3 className="font-display text-lg text-ink-900 dark:text-parchment-100 mb-1 line-clamp-1">
                            {book.title}
                          </h3>
                          <p className="font-serif text-sm text-burgundy-700 dark:text-gold-leaf-400 mb-2">
                            {book.genre}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs font-serif text-ink-600 dark:text-parchment-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(book.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {book.views} views
                            </span>
                          </div>
                          
                          {book.rating > 0 && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-gold-leaf-500 text-gold-leaf-500" />
                                <span className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                                  {book.rating}
                                </span>
                              </div>
                              <span className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                                ({book.reviews} reviews)
                              </span>
                            </div>
                          )}
                          
                          {/* Action Menu */}
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              {book.status === 'approved' && (
                                <Button size="sm" variant="ghost" className="text-forest-700 dark:text-forest-400">
                                  <TrendingUp className="h-4 w-4" />
                                </Button>
                              )}
                              {book.status === 'rejected' && (
                                <Button size="sm" variant="ghost" className="text-burgundy-700 dark:text-burgundy-400">
                                  <AlertCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-parchment-50 dark:bg-ink-900">
                                <DropdownMenuItem className="font-serif">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-serif">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Book
                                </DropdownMenuItem>
                                {book.status === 'draft' && (
                                  <DropdownMenuItem className="font-serif">
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit for Review
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="font-serif text-burgundy-700 dark:text-burgundy-400">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </VintageCardContent>
          </VintageCard>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <VintageCard variant="manuscript" ornate>
            <VintageCardContent className="py-6">
              <h3 className="font-display text-lg text-burgundy-700 dark:text-burgundy-400 mb-3">
                Author Tips
              </h3>
              <div className="grid md:grid-cols-3 gap-4 font-serif text-sm text-ink-700 dark:text-parchment-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-forest-600 dark:text-forest-500 flex-shrink-0 mt-0.5" />
                  <p>Keep your drafts updated regularly to prevent data loss</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-gold-leaf-600 dark:text-gold-leaf-500 flex-shrink-0 mt-0.5" />
                  <p>Engage with reader reviews to build your author reputation</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-burgundy-600 dark:text-burgundy-500 flex-shrink-0 mt-0.5" />
                  <p>Promote your approved books to increase visibility</p>
                </div>
              </div>
            </VintageCardContent>
          </VintageCard>
        </motion.div>
      </div>
    </div>
  )
}
