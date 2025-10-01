import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { ScrollArea } from '../components/ui/scroll-area'
import { 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  BookOpen, 
  Star,
  Sparkles,
  Feather,
  ScrollText,
  Library,
  MessageCircle
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  bookRecommendations?: Book[]
}

interface Book {
  id: string
  title: string
  author: string
  cover: string
  rating: number
  genre: string[]
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your BookQuest AI assistant. I can help you discover amazing books, provide recommendations, and answer questions about literature. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'book advisor' | 'literary expert' | 'book enthusiast'>('book advisor')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage, selectedRole),
        timestamp: new Date(),
        bookRecommendations: generateBookRecommendations(inputMessage)
      }

      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string, role: string): string => {
    const responses = {
      'book advisor': [
        "Based on your interests, I'd recommend checking out some contemporary fiction. Have you read anything by Haruki Murakami?",
        "That's a great question! For someone with your reading history, I'd suggest exploring the mystery genre. Agatha Christie is always a safe bet.",
        "I can definitely help you find your next read! What genres are you in the mood for today?"
      ],
      'literary expert': [
        "From a literary perspective, your question touches on some fascinating themes. Let me break this down for you...",
        "That's an excellent observation! This reminds me of similar themes in classical literature. Would you like me to elaborate?",
        "Your analysis shows real insight. In literary criticism, this is often discussed in the context of postmodernism."
      ],
      'book enthusiast': [
        "Oh man, I LOVE talking about books! That reminds me so much of this one series I just finished...",
        "You have to read this book I just discovered! It's absolutely amazing and I couldn't put it down.",
        "That's such a cool take! I've been thinking about that book too. Let me share some of my thoughts!"
      ]
    }

    const roleResponses = responses[role as keyof typeof responses] || responses['book advisor']
    return roleResponses[Math.floor(Math.random() * roleResponses.length)]
  }

  const generateBookRecommendations = (userInput: string): Book[] | undefined => {
    // Only generate recommendations for certain keywords
    if (userInput.toLowerCase().includes('recommend') || userInput.toLowerCase().includes('suggest')) {
      return [
        {
          id: '1',
          title: 'The Seven Husbands of Evelyn Hugo',
          author: 'Taylor Jenkins Reid',
          cover: 'https://via.placeholder.com/120x180',
          rating: 4.6,
          genre: ['Historical Fiction', 'Romance']
        },
        {
          id: '2',
          title: 'Project Hail Mary',
          author: 'Andy Weir',
          cover: 'https://via.placeholder.com/120x180',
          rating: 4.7,
          genre: ['Sci-Fi', 'Adventure']
        }
      ]
    }
    return undefined
  }

  const BookRecommendation = ({ book }: { book: Book }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-amber-300 dark:border-amber-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="flex gap-3">
        <div className="relative">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-12 h-16 object-cover rounded shadow-md"
            style={{ filter: 'sepia(0.1) saturate(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif font-bold text-sm text-amber-900 dark:text-amber-100">{book.title}</h4>
          <p className="font-serif text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1">
            <Feather className="w-2 h-2" />
            {book.author}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
            <span className="font-serif text-xs text-amber-700 dark:text-amber-300">{book.rating}</span>
          </div>
          <div className="flex gap-1 mt-1">
            {book.genre.slice(0, 2).map((g) => (
              <span key={g} className="px-2 py-0.5 bg-amber-600 dark:bg-amber-700 text-white rounded-full font-serif text-xs">
                {g}
              </span>
            ))}
          </div>
        </div>
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
            className="flex flex-wrap items-center justify-between gap-4"
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
                <span className="font-serif text-xl">Literary AI Companion</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-serif text-amber-700 dark:text-amber-300">Speaking as:</span>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'book advisor' | 'literary expert' | 'book enthusiast')}
                className="font-serif text-sm bg-white/80 dark:bg-gray-800/80 border-2 border-amber-600 dark:border-amber-700 rounded-lg px-3 py-2 text-amber-800 dark:text-amber-200 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="book advisor">📚 Book Advisor</option>
                <option value="literary expert">🎓 Literary Expert</option>
                <option value="book enthusiast">❤️ Book Enthusiast</option>
              </select>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-6 h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full"
        >
          {/* Chat Area with Vintage Parchment Style */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl border-3 border-amber-600 dark:border-amber-800"
                 style={{
                   backgroundImage: `linear-gradient(45deg, transparent 98%, rgba(139, 69, 19, 0.03) 0),
                                    linear-gradient(-45deg, transparent 98%, rgba(139, 69, 19, 0.03) 0)`,
                   borderWidth: '3px'
                 }}>
              <div className="p-4 sm:p-6 border-b-2 border-amber-200 dark:border-amber-700 bg-gradient-to-r from-amber-100/30 to-orange-100/30 dark:from-gray-800/30 dark:to-gray-900/30">
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2 sm:gap-3 mb-2">
                  <Sparkles className="h-6 w-6 text-amber-600" />
                  {selectedRole === 'book advisor' ? 'Your Book Advisor' : 
                   selectedRole === 'literary expert' ? 'Your Literary Expert' : 'Your Book Enthusiast'}
                </h2>
                <p className="font-serif text-amber-700 dark:text-amber-300">
                  Converse with me about the literary world - recommendations, analysis, and bookish delights await!
                </p>
              </div>
              
              <div className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-4 pb-4">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.type === 'bot' && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                          )}
                          
                          <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                            <div 
                              className={`rounded-lg px-5 py-3 shadow-lg ${
                                message.type === 'user' 
                                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white ml-auto' 
                                  : 'bg-white/80 dark:bg-gray-800/80 border-2 border-amber-200 dark:border-amber-700'
                              }`}
                              style={{
                                boxShadow: message.type === 'bot' ? 'inset 0 0 10px rgba(139, 69, 19, 0.05)' : undefined
                              }}
                            >
                              <p className={`font-serif leading-relaxed ${
                                message.type === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                              }`}>
                                {message.content}
                              </p>
                            </div>
                            
                            {message.bookRecommendations && (
                              <div className="mt-3 space-y-2">
                                <p className="font-serif text-sm text-amber-700 dark:text-amber-300 font-bold">📚 Recommended treasures:</p>
                                {message.bookRecommendations.map((book) => (
                                  <BookRecommendation key={book.id} book={book} />
                                ))}
                              </div>
                            )}
                            
                            <p className="font-serif text-xs text-amber-600 dark:text-amber-400 mt-2 px-2">
                              {message.timestamp.toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })}
                            </p>
                          </div>
                          
                          {message.type === 'user' && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 border-2 border-amber-200 dark:border-amber-700 rounded-lg px-5 py-3 shadow-lg">
                          <div className="flex gap-2 items-center">
                            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <span className="font-serif text-sm text-amber-700 dark:text-amber-300 ml-2">Pondering...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Vintage Input Area */}
                <div className="border-t-2 border-amber-200 dark:border-amber-700 p-3 sm:p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      placeholder={`Compose your literary inquiry...`}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-white/70 dark:bg-gray-800/70 border-2 border-amber-300 dark:border-amber-600 rounded-lg font-serif text-gray-800 dark:text-gray-200 placeholder-amber-500 dark:placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                      style={{ fontFamily: 'Crimson Text, serif' }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage} 
                      disabled={isLoading || !inputMessage.trim()}
                      className="px-5 py-3 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg font-serif shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      <span className="hidden sm:inline">Send</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vintage Sidebar */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
            >
              <h3 className="font-serif text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Quick Inquiries
              </h3>
              <div className="space-y-2">
                {[
                  "📖 Recommend a mystery novel",
                  "✨ Best books of 2024",
                  "📚 Classic literature suggestions",
                  "🚀 Sci-fi recommendations"
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-amber-300 dark:border-amber-600 rounded-lg font-serif text-sm text-amber-800 dark:text-amber-200 hover:bg-amber-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 shadow-sm"
                    onClick={() => setInputMessage(suggestion.replace(/^[^\s]+ /, ''))}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border-2 border-amber-600 dark:border-amber-800"
            >
              <h3 className="font-serif text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                <Library className="w-5 h-5" />
                My Abilities
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-amber-200 dark:border-amber-700">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span className="font-serif text-sm text-amber-800 dark:text-amber-200">Curated book recommendations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-amber-200 dark:border-amber-700">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span className="font-serif text-sm text-amber-800 dark:text-amber-200">Deep literary analysis</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-amber-200 dark:border-amber-700">
                  <Feather className="w-4 h-4 text-amber-600" />
                  <span className="font-serif text-sm text-amber-800 dark:text-amber-200">Engaging book discussions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
