import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VintagePageHeader from '@/components/VintagePageHeader';
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '@/components/ui/vintage-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Heart,
  Star,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Clock,
  User,
  BookMarked,
  Feather,
  Sparkles
} from 'lucide-react';
import { 
  mockAnnotatedVersions, 
  mockBooks, 
  mockUsers,
  getUserCreatedBooks,
  getPublicAnnotatedVersions,
  getUserById,
  getBookById,
  type AnnotatedVersion,
  type Book
} from '@/lib/mockData';

export default function NoteShare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating'>('popular');
  const [activeTab, setActiveTab] = useState<'annotated' | 'userCreated'>('annotated');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Get annotated versions and user-created books
  const annotatedVersions = getPublicAnnotatedVersions();
  const userCreatedBooks = getUserCreatedBooks();

  // Filter and sort logic
  const filterAndSort = <T extends AnnotatedVersion | Book>(items: T[]): T[] => {
    let filtered = [...items];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ('author' in item && item.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => {
        const aValue = 'downloads' in a ? a.downloads : ('total_ratings' in a ? a.total_ratings : 0);
        const bValue = 'downloads' in b ? b.downloads : ('total_ratings' in b ? b.total_ratings : 0);
        return bValue - aValue;
      });
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredAnnotatedVersions = filterAndSort(annotatedVersions);
  const filteredUserBooks = filterAndSort(userCreatedBooks);

  const AnnotatedVersionCard = ({ version }: { version: AnnotatedVersion }) => {
    const originalBook = getBookById(version.original_book_id);
    const author = getUserById(version.user_id);

    return (
      <motion.div {...fadeInUp}>
        <VintageCard variant="aged" ornate hoverable className="h-full">
          <div className="relative">
            {/* Cover Image */}
            <div className="relative h-64 overflow-hidden bg-parchment-200 dark:bg-ink-800 rounded-t">
              <img
                src={version.cover_image || originalBook?.cover_image}
                alt={version.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge className="bg-burgundy-700 text-parchment-100 font-serif">
                  Annotated
                </Badge>
                {version.is_favorite && (
                  <Badge className="bg-gold-leaf-600 text-ink-900 font-serif">
                    <Heart className="h-3 w-3 mr-1 fill-current" />
                    Favorite
                  </Badge>
                )}
              </div>
            </div>

            <VintageCardHeader>
              <VintageCardTitle className="text-lg line-clamp-2">
                {version.title}
              </VintageCardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author?.email}`} />
                  <AvatarFallback className="text-xs bg-burgundy-100 dark:bg-burgundy-900/30">
                    {author?.first_name[0]}{author?.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-serif text-ink-600 dark:text-parchment-400">
                  by {author?.first_name} {author?.last_name}
                </span>
              </div>
              {originalBook && (
                <p className="text-xs font-serif text-ink-500 dark:text-parchment-500 mt-1 italic">
                  Based on "{originalBook.title}" by {originalBook.author}
                </p>
              )}
            </VintageCardHeader>

            <VintageCardContent>
              <p className="text-sm font-serif text-ink-700 dark:text-parchment-300 line-clamp-3 mb-4">
                {version.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-parchment-300 dark:border-ink-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-gold-leaf-600 fill-current" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
                      {version.rating}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    {version.total_ratings} reviews
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Download className="h-4 w-4 text-burgundy-600 dark:text-burgundy-400" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
                      {version.downloads}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    downloads
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Feather className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
                      {version.annotations.length}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    annotations
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                >
                  <Link to={`/annotated-version/${version.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-burgundy-700 dark:border-burgundy-600"
                >
                  <Heart className={`h-4 w-4 ${version.is_favorite ? 'fill-current text-burgundy-700' : ''}`} />
                </Button>
              </div>
            </VintageCardContent>
          </div>
        </VintageCard>
      </motion.div>
    );
  };

  const UserCreatedBookCard = ({ book }: { book: Book }) => {
    const author = book.created_by !== 'system' ? getUserById(book.created_by) : null;

    return (
      <motion.div {...fadeInUp}>
        <VintageCard variant="paper" ornate hoverable className="h-full">
          <div className="relative">
            {/* Cover Image */}
            <div className="relative h-64 overflow-hidden bg-parchment-200 dark:bg-ink-800 rounded-t">
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-forest-700 text-parchment-100 font-serif">
                  <Sparkles className="h-3 w-3 mr-1" />
                  User Created
                </Badge>
              </div>
            </div>

            <VintageCardHeader>
              <VintageCardTitle className="text-lg line-clamp-2">
                {book.title}
              </VintageCardTitle>
              <div className="flex items-center gap-2 mt-2">
                {author && (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.email}`} />
                      <AvatarFallback className="text-xs bg-forest-100 dark:bg-forest-900/30">
                        {author.first_name[0]}{author.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-serif text-ink-600 dark:text-parchment-400">
                      by {author.first_name} {author.last_name}
                    </span>
                  </>
                )}
              </div>
              <Badge variant="outline" className="mt-2 w-fit font-serif">
                {book.genre}
              </Badge>
            </VintageCardHeader>

            <VintageCardContent>
              <p className="text-sm font-serif text-ink-700 dark:text-parchment-300 line-clamp-3 mb-4">
                {book.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-parchment-300 dark:border-ink-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-gold-leaf-600 fill-current" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
                      {book.rating}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    {book.total_ratings} reviews
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-4 w-4 text-burgundy-600 dark:text-burgundy-400" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
                      {book.pages}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-ink-600 dark:text-parchment-400">
                    pages
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                    <span className="font-serif font-bold text-ink-900 dark:text-parchment-100">
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
                  className="flex-1 bg-forest-700 hover:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-700 text-parchment-50 font-serif"
                >
                  <Link to={`/book/${book.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-forest-700 dark:border-forest-600"
                >
                  <Heart className="h-4 w-4" />
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
      {/* Hero Section */}
      <VintagePageHeader
        badge="Community Library"
        title="NoteShare"
        subtitle="Discover annotated editions curated by fellow readers and explore original works from our creative community."
        quote={{
          text: "We read to know we're not alone.",
          author: "William Nicholson"
        }}
      />

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <motion.div {...fadeInUp} className="mb-12">
            <VintageCard variant="manuscript" ornate className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ink-500 dark:text-parchment-500" />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 font-serif bg-parchment-50 dark:bg-ink-950 border-2 border-ink-300 dark:border-ink-700 rounded-sm focus:outline-none focus:border-burgundy-600 dark:focus:border-gold-leaf-600"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-ink-600 dark:text-parchment-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'rating')}
                    className="px-4 py-3 font-serif bg-parchment-50 dark:bg-ink-950 border-2 border-ink-300 dark:border-ink-700 rounded-sm focus:outline-none focus:border-burgundy-600 dark:focus:border-gold-leaf-600"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </VintageCard>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'annotated' | 'userCreated')}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-parchment-200 dark:bg-ink-800">
              <TabsTrigger value="annotated" className="font-serif">
                <BookMarked className="h-4 w-4 mr-2" />
                Annotated Versions ({filteredAnnotatedVersions.length})
              </TabsTrigger>
              <TabsTrigger value="userCreated" className="font-serif">
                <Sparkles className="h-4 w-4 mr-2" />
                User Created ({filteredUserBooks.length})
              </TabsTrigger>
            </TabsList>

            {/* Annotated Versions Tab */}
            <TabsContent value="annotated">
              {filteredAnnotatedVersions.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAnnotatedVersions.map((version) => (
                    <AnnotatedVersionCard key={version.id} version={version} />
                  ))}
                </div>
              ) : (
                <VintageCard variant="aged" className="p-12 text-center">
                  <BookMarked className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                  <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
                    No Annotated Versions Found
                  </h3>
                  <p className="font-serif text-ink-600 dark:text-parchment-400">
                    Try adjusting your search or filters
                  </p>
                </VintageCard>
              )}
            </TabsContent>

            {/* User Created Books Tab */}
            <TabsContent value="userCreated">
              {filteredUserBooks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredUserBooks.map((book) => (
                    <UserCreatedBookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <VintageCard variant="aged" className="p-12 text-center">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
                  <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
                    No User-Created Books Found
                  </h3>
                  <p className="font-serif text-ink-600 dark:text-parchment-400">
                    Try adjusting your search or filters
                  </p>
                </VintageCard>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp}>
            <VintageCard variant="manuscript" ornate className="p-12 text-center">
              <Feather className="h-12 w-12 mx-auto mb-6 text-gold-leaf-600 dark:text-gold-leaf-500" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-parchment-100">
                Share Your Literary Insights
              </h2>
              <p className="font-serif text-lg text-ink-700 dark:text-parchment-300 mb-8 max-w-2xl mx-auto">
                Create annotated versions of your favorite books or publish your original works to inspire other readers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                >
                  <Link to="/readnex">
                    <BookMarked className="h-5 w-5 mr-2" />
                    Start Annotating
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-burgundy-700 dark:border-burgundy-600 font-serif"
                >
                  <Link to="/create-book">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Create Your Book
                  </Link>
                </Button>
              </div>
            </VintageCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
