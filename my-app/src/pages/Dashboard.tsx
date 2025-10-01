import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  
  // Redirect to ReadnEX page
  useEffect(() => {
    navigate('/readnex', { replace: true })
  }, [navigate])
  
  return null
  
  const [userData] = useState({
    name: 'Jane Austen',
    email: 'jane.austen@literature.com',
    avatar: '',
    memberSince: '2024',
    level: 'Avid Reader'
  })

  const [stats] = useState<ReadingStats>({
    booksRead: 234,
    currentStreak: 15,
    pagesRead: 42350,
    averageRating: 4.2,
    favoriteGenre: 'Classic Literature',
    readingGoal: 52,
    goalProgress: 38
  })

  const [currentlyReading] = useState<Book[]>([
    {
      id: '1',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      cover: '/api/placeholder/150/200',
      rating: 4.8,
      genre: 'Classic',
      progress: 65,
      lastRead: '2 hours ago'
    },
    {
      id: '2',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: '/api/placeholder/150/200',
      rating: 4.5,
      genre: 'Classic',
      progress: 30,
      lastRead: 'Yesterday'
    }
  ])

  const [recommendations] = useState<Book[]>([
    {
      id: '3',
      title: 'Sense and Sensibility',
      author: 'Jane Austen',
      cover: '/api/placeholder/150/200',
      rating: 4.6,
      genre: 'Romance',
      reviews: 1234
    },
    {
      id: '4',
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
      cover: '/api/placeholder/150/200',
      rating: 4.4,
      genre: 'Gothic',
      reviews: 892
    },
    {
      id: '5',
      title: 'Jane Eyre',
      author: 'Charlotte Brontë',
      cover: '/api/placeholder/150/200',
      rating: 4.7,
      genre: 'Romance',
      reviews: 2103
    },
    {
      id: '6',
      title: 'Emma',
      author: 'Jane Austen',
      cover: '/api/placeholder/150/200',
      rating: 4.5,
      genre: 'Classic',
      reviews: 756
    }
  ])

  const quickActions = [
    { icon: BookOpen, label: 'Continue Reading', action: () => navigate('/reading-history'), color: 'text-burgundy-600 dark:text-burgundy-400' },
    { icon: Heart, label: 'My Favorites', action: () => navigate('/favorites'), color: 'text-burgundy-600 dark:text-burgundy-400' },
    { icon: MessageCircle, label: 'AI Chat', action: () => navigate('/chatbot'), color: 'text-gold-leaf-600 dark:text-gold-leaf-400' },
    { icon: PenTool, label: 'Write Book', action: () => navigate('/create-book'), color: 'text-forest-600 dark:text-forest-400' }
  ]

  const achievements = [
    { name: 'Bookworm', description: 'Read 100+ books', icon: '📚', unlocked: true },
    { name: 'Speed Reader', description: '5 books this month', icon: '⚡', unlocked: true },
    { name: 'Reviewer', description: 'Write 50 reviews', icon: '✍️', unlocked: false },
    { name: 'Explorer', description: '10 different genres', icon: '🗺️', unlocked: false }
  ]

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950">
      {/* Welcome Header */}
      <div className="bg-gradient-to-b from-burgundy-700 via-burgundy-800 to-burgundy-900 dark:from-burgundy-900 dark:via-ink-900 dark:to-ink-950 text-parchment-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Feather className="h-8 w-8 text-gold-leaf-400" />
              <h1 className="font-display text-4xl md:text-5xl text-parchment-100">
                Welcome Back, {userData.name.split(' ')[0]}
              </h1>
              <Feather className="h-8 w-8 text-gold-leaf-400 scale-x-[-1]" />
            </div>
            <p className="font-serif text-lg text-parchment-200/90 mb-2">
              Your literary sanctuary awaits
            </p>
            
            {/* Quote of the Day */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-block"
            >
              <div className="flex items-start gap-2">
                <Quote className="h-5 w-5 text-gold-leaf-400/70 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-parchment-200/80 italic">
                    "A room without books is like a body without a soul."
                  </p>
                  <p className="font-serif text-sm text-parchment-300/60 mt-1">
                    — Marcus Tullius Cicero
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-16 relative z-10"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <VintageCard 
                variant="paper" 
                hoverable 
                className="cursor-pointer"
                onClick={action.action}
              >
                <VintageCardContent className="py-6 text-center">
                  <action.icon className={`h-8 w-8 mx-auto mb-2 ${action.color}`} />
                  <p className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                    {action.label}
                  </p>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-parchment-100 dark:bg-ink-900 border border-parchment-300 dark:border-ink-700">
            <TabsTrigger value="overview" className="font-serif">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="currently-reading" className="font-serif">
              <BookOpen className="h-4 w-4 mr-2" />
              Reading Now
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="font-serif">
              <Sparkles className="h-4 w-4 mr-2" />
              For You
            </TabsTrigger>
            <TabsTrigger value="achievements" className="font-serif">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Reading Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <VintageCard variant="aged" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                      Reading Statistics
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-sm text-ink-700 dark:text-parchment-300">Books Read</span>
                      <span className="font-display text-lg text-burgundy-700 dark:text-gold-leaf-400">{stats.booksRead}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-sm text-ink-700 dark:text-parchment-300">Pages Read</span>
                      <span className="font-display text-lg text-burgundy-700 dark:text-gold-leaf-400">{stats.pagesRead.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-sm text-ink-700 dark:text-parchment-300">Avg Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-gold-leaf-500 text-gold-leaf-500" />
                        <span className="font-display text-lg text-burgundy-700 dark:text-gold-leaf-400">{stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-sm text-ink-700 dark:text-parchment-300">Favorite Genre</span>
                      <Badge className="bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300 font-serif">
                        {stats.favoriteGenre}
                      </Badge>
                    </div>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>

              {/* Reading Goal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <VintageCard variant="aged" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                      2024 Reading Goal
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="font-display text-3xl text-burgundy-700 dark:text-gold-leaf-400">
                        {stats.goalProgress} / {stats.readingGoal}
                      </p>
                      <p className="font-serif text-sm text-ink-600 dark:text-parchment-400">books this year</p>
                    </div>
                    <Progress value={(stats.goalProgress / stats.readingGoal) * 100} className="h-2" />
                    <p className="font-serif text-xs text-center text-ink-600 dark:text-parchment-400">
                      {Math.round((stats.goalProgress / stats.readingGoal) * 100)}% complete
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>

              {/* Current Streak Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <VintageCard variant="aged" ornate>
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                      Reading Streak
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent className="space-y-4">
                    <div className="text-center">
                      <p className="font-display text-4xl text-burgundy-700 dark:text-gold-leaf-400 mb-2">
                        {stats.currentStreak}
                      </p>
                      <p className="font-serif text-sm text-ink-600 dark:text-parchment-400">days in a row</p>
                    </div>
                    <div className="flex justify-center gap-1 mt-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-sm ${
                            i < 5
                              ? 'bg-forest-600 dark:bg-forest-500'
                              : 'bg-parchment-300 dark:bg-ink-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-serif text-xs text-center text-ink-600 dark:text-parchment-400">
                      Keep it up! 🔥
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <VintageCard variant="manuscript" ornate>
              <VintageCardHeader>
                <VintageCardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                  Recent Activity
                </VintageCardTitle>
              </VintageCardHeader>
              <VintageCardContent>
                <div className="space-y-4">
                  {[
                    { icon: BookOpen, text: 'Started reading "Pride and Prejudice"', time: '2 hours ago' },
                    { icon: Star, text: 'Rated "The Great Gatsby" 4.5 stars', time: 'Yesterday' },
                    { icon: Heart, text: 'Added "Emma" to favorites', time: '2 days ago' },
                    { icon: MessageCircle, text: 'Wrote a review for "1984"', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-parchment-200 dark:border-ink-800 last:border-0">
                      <activity.icon className="h-4 w-4 text-burgundy-600 dark:text-burgundy-400 mt-1" />
                      <div className="flex-1">
                        <p className="font-serif text-sm text-ink-700 dark:text-parchment-300">
                          {activity.text}
                        </p>
                        <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </VintageCardContent>
            </VintageCard>
          </TabsContent>

          {/* Currently Reading Tab */}
          <TabsContent value="currently-reading" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {currentlyReading.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VintageCard variant="aged" ornate>
                    <VintageCardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-24 h-32 object-cover rounded-sm shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-ink-900 dark:text-parchment-100 mb-1">
                            {book.title}
                          </h3>
                          <p className="font-serif text-sm text-burgundy-700 dark:text-gold-leaf-400 mb-3">
                            by {book.author}
                          </p>
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between font-serif text-xs text-ink-600 dark:text-parchment-400">
                              <span>Progress</span>
                              <span>{book.progress}%</span>
                            </div>
                            <Progress value={book.progress} className="h-2" />
                          </div>
                          
                          <p className="font-serif text-xs text-ink-600 dark:text-parchment-400 mb-3">
                            Last read: {book.lastRead}
                          </p>
                          
                          <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Continue Reading
                          </Button>
                        </div>
                      </div>
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <VintageCard variant="manuscript" ornate>
              <VintageCardHeader>
                <VintageCardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                  Curated Just for You
                </VintageCardTitle>
              </VintageCardHeader>
              <VintageCardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendations.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link to={`/book/${book.id}`} className="block group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-burgundy-700/90 text-parchment-100 font-serif">
                              {book.genre}
                            </Badge>
                          </div>
                        </div>
                        <h4 className="font-display text-sm text-ink-900 dark:text-parchment-100 mb-1 line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="font-serif text-xs text-burgundy-700 dark:text-gold-leaf-400 mb-2">
                          {book.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-gold-leaf-500 text-gold-leaf-500" />
                            <span className="font-serif text-xs text-ink-700 dark:text-parchment-300">
                              {book.rating}
                            </span>
                          </div>
                          <span className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                            {book.reviews} reviews
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </VintageCardContent>
            </VintageCard>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VintageCard 
                    variant={achievement.unlocked ? "paper" : "aged"} 
                    ornate={achievement.unlocked}
                    className={!achievement.unlocked ? "opacity-60" : ""}
                  >
                    <VintageCardContent className="text-center py-6">
                      <div className="text-3xl mb-3">{achievement.icon}</div>
                      <h4 className="font-display text-lg text-burgundy-700 dark:text-gold-leaf-400 mb-1">
                        {achievement.name}
                      </h4>
                      <p className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <Badge className="mt-3 bg-gold-leaf-500 text-ink-900 font-serif">
                          Unlocked
                        </Badge>
                      )}
                    </VintageCardContent>
                  </VintageCard>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}