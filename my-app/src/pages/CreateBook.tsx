import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from '../components/ui/vintage-card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../components/ui/use-toast'
import { Badge } from '../components/ui/badge'
import {
  BookPlus,
  Feather,
  Save,
  Send,
  Image,
  Type,
  User,
  Tag,
  FileText,
  Quote,
  Sparkles,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Info
} from 'lucide-react'
import { mockBooks, type Book } from '@/lib/mockData'

export default function CreateBook() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    content: '',
    coverImage: '',
    isbn: '',
    publicationYear: new Date().getFullYear().toString(),
    language: 'English',
    tags: ''
  })

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Thriller', 'Biography', 'History', 'Poetry',
    'Self-Help', 'Young Adult', 'Children', 'Horror', 'Adventure'
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
        setBookData({ ...bookData, coverImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate saving as draft
      const newBook: Book = {
        id: `book-user-${Date.now()}`,
        title: bookData.title,
        author: bookData.author,
        cover_image: bookData.coverImage || '/api/placeholder/300/450',
        description: bookData.description,
        genre: bookData.genre,
        published_year: parseInt(bookData.publicationYear),
        pages: Math.ceil(bookData.content.length / 2000), // Estimate pages
        isbn: bookData.isbn,
        language: bookData.language,
        rating: 0,
        total_ratings: 0,
        content: bookData.content,
        chapters: [],
        created_by: 'user-1', // Mock current user
        status: 'draft',
        created_at: new Date().toISOString()
      }
      
      console.log('Saving draft:', newBook)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Draft Saved!",
        description: "Your book has been saved as a draft."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create new book with pending_approval status
      const newBook: Book = {
        id: `book-user-${Date.now()}`,
        title: bookData.title,
        author: bookData.author,
        cover_image: bookData.coverImage || '/api/placeholder/300/450',
        description: bookData.description,
        genre: bookData.genre,
        published_year: parseInt(bookData.publicationYear),
        pages: Math.ceil(bookData.content.length / 2000),
        isbn: bookData.isbn,
        language: bookData.language,
        rating: 0,
        total_ratings: 0,
        content: bookData.content,
        chapters: [],
        created_by: 'user-1', // Mock current user
        status: 'pending_approval',
        created_at: new Date().toISOString()
      }
      
      console.log('Submitting book for review:', newBook)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add to mock data (in real app, this would be done by API)
      mockBooks.push(newBook)
      
      toast({
        title: "📚 Book Submitted Successfully!",
        description: "Your manuscript is now awaiting admin review. You'll be notified once it's approved."
      })
      
      // Navigate to My Books page
      navigate('/my-books')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit book. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Feather className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500" />
            <h1 className="font-display text-4xl text-ink-900 dark:text-parchment-100">
              Pen Your Masterpiece
            </h1>
            <Feather className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500 scale-x-[-1]" />
          </div>
          <p className="font-serif text-lg text-ink-700 dark:text-parchment-300 italic">
            "There is no greater agony than bearing an untold story inside you."
          </p>
          <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mt-1">
            — Maya Angelou
          </p>
        </motion.div>

        {/* Admin Review Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <VintageCard variant="manuscript" className="bg-gold-leaf-50 dark:bg-gold-leaf-950/20 border-gold-leaf-300 dark:border-gold-leaf-800">
            <VintageCardContent className="py-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-gold-leaf-700 dark:text-gold-leaf-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-gold-leaf-900 dark:text-gold-leaf-300 mb-1">
                    Submission Process
                  </h3>
                  <p className="font-serif text-sm text-gold-leaf-800 dark:text-gold-leaf-400 leading-relaxed">
                    Your book will be reviewed by our curators before being published to NoteShare. 
                    This typically takes 1-3 business days. You can save as draft and return later.
                  </p>
                </div>
              </div>
            </VintageCardContent>
          </VintageCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <VintageCard variant="aged" ornate className="mb-8">
            <VintageCardHeader>
              <VintageCardTitle className="flex items-center gap-2">
                <BookPlus className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                Create Your Book
              </VintageCardTitle>
            </VintageCardHeader>
            <VintageCardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-serif text-ink-700 dark:text-parchment-300">
                        <Type className="inline h-4 w-4 mr-1" />
                        Book Title
                      </Label>
                      <Input
                        id="title"
                        value={bookData.title}
                        onChange={(e) => setBookData({...bookData, title: e.target.value})}
                        placeholder="Enter your book's title"
                        required
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="author" className="font-serif text-ink-700 dark:text-parchment-300">
                        <User className="inline h-4 w-4 mr-1" />
                        Author Name
                      </Label>
                      <Input
                        id="author"
                        value={bookData.author}
                        onChange={(e) => setBookData({...bookData, author: e.target.value})}
                        placeholder="Your pen name or real name"
                        required
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre" className="font-serif text-ink-700 dark:text-parchment-300">
                        <Tag className="inline h-4 w-4 mr-1" />
                        Genre
                      </Label>
                      <select
                        id="genre"
                        value={bookData.genre}
                        onChange={(e) => setBookData({...bookData, genre: e.target.value})}
                        required
                        className="w-full px-3 py-2 bg-parchment-100 dark:bg-ink-800 border border-parchment-300 dark:border-ink-600 rounded-md font-serif"
                      >
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="font-serif text-ink-700 dark:text-parchment-300">
                        Language
                      </Label>
                      <Input
                        id="language"
                        value={bookData.language}
                        onChange={(e) => setBookData({...bookData, language: e.target.value})}
                        placeholder="Language of the book"
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="font-serif text-ink-700 dark:text-parchment-300">
                        Publication Year
                      </Label>
                      <Input
                        id="year"
                        type="number"
                        value={bookData.publicationYear}
                        onChange={(e) => setBookData({...bookData, publicationYear: e.target.value})}
                        placeholder="Year"
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>
                  </div>

                  {/* Right Column - Cover Image */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-serif text-ink-700 dark:text-parchment-300">
                        <Image className="inline h-4 w-4 mr-1" />
                        Book Cover
                      </Label>
                      <div className="border-2 border-dashed border-parchment-400 dark:border-ink-600 rounded-lg p-6 text-center">
                        {coverPreview ? (
                          <div className="relative">
                            <img
                              src={coverPreview}
                              alt="Cover preview"
                              className="mx-auto max-h-64 rounded-md shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCoverPreview('')
                                setBookData({ ...bookData, coverImage: '' })
                              }}
                              className="absolute top-2 right-2 p-1 bg-burgundy-700 text-parchment-100 rounded-full hover:bg-burgundy-800"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <BookOpen className="h-12 w-12 mx-auto text-parchment-400 dark:text-ink-600 mb-3" />
                            <label htmlFor="cover-upload" className="cursor-pointer">
                              <span className="font-serif text-burgundy-700 dark:text-burgundy-400 hover:underline">
                                Upload Cover Image
                              </span>
                              <input
                                id="cover-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                            <p className="font-serif text-xs text-ink-600 dark:text-parchment-500 mt-2">
                              Recommended: 400x600px
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="isbn" className="font-serif text-ink-700 dark:text-parchment-300">
                        ISBN (Optional)
                      </Label>
                      <Input
                        id="isbn"
                        value={bookData.isbn}
                        onChange={(e) => setBookData({...bookData, isbn: e.target.value})}
                        placeholder="ISBN-13 or ISBN-10"
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags" className="font-serif text-ink-700 dark:text-parchment-300">
                        Tags (comma-separated)
                      </Label>
                      <Input
                        id="tags"
                        value={bookData.tags}
                        onChange={(e) => setBookData({...bookData, tags: e.target.value})}
                        placeholder="e.g., adventure, magic, friendship"
                        className="bg-parchment-100 dark:bg-ink-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-serif text-ink-700 dark:text-parchment-300">
                    <Quote className="inline h-4 w-4 mr-1" />
                    Book Description *
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={bookData.description}
                    onChange={(e) => setBookData({...bookData, description: e.target.value})}
                    placeholder="Write a compelling description of your book that will captivate readers..."
                    required
                    className="bg-parchment-100 dark:bg-ink-800 font-serif"
                  />
                </div>

                {/* Content/Sample */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="font-serif text-ink-700 dark:text-parchment-300">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Book Content / Sample Chapter *
                  </Label>
                  <Textarea
                    id="content"
                    rows={12}
                    value={bookData.content}
                    onChange={(e) => setBookData({...bookData, content: e.target.value})}
                    placeholder="Begin your story here or paste your manuscript...&#10;&#10;Once upon a time, in a world filled with stories waiting to be told..."
                    required
                    className="bg-parchment-100 dark:bg-ink-800 font-serif text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xs text-ink-600 dark:text-parchment-500">
                      Write or paste your book content. Approximately {Math.ceil(bookData.content.length / 2000)} pages.
                    </p>
                    <p className="font-serif text-xs text-ink-600 dark:text-parchment-500">
                      {bookData.content.length} characters
                    </p>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-parchment-300 dark:border-ink-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting || !bookData.title}
                    className="flex-1 border-parchment-400 dark:border-ink-600 font-serif"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-parchment-200 border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Submission Info */}
                <div className="pt-4 border-t border-parchment-300 dark:border-ink-700">
                  <div className="flex items-start gap-2 text-xs">
                    <Clock className="h-4 w-4 text-ink-500 dark:text-parchment-500 flex-shrink-0 mt-0.5" />
                    <p className="font-serif text-ink-600 dark:text-parchment-400">
                      After submission, your book will be reviewed by our curators. 
                      You'll receive a notification when it's approved and published to NoteShare.
                    </p>
                  </div>
                </div>
              </form>
            </VintageCardContent>
          </VintageCard>

          {/* Tips and Guidelines */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Writing Tips */}
            <VintageCard variant="manuscript" ornate>
              <VintageCardContent className="py-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-gold-leaf-600 dark:text-gold-leaf-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg text-burgundy-700 dark:text-burgundy-400 mb-3">
                      Writing Tips
                    </h3>
                    <ul className="space-y-2 font-serif text-sm text-ink-700 dark:text-parchment-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>Craft a captivating title that reflects your book's essence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>Write a description that hooks readers from the first line</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>Choose the most fitting genre to reach your target audience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>Your first chapter should leave readers wanting more</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </VintageCardContent>
            </VintageCard>

            {/* Review Process */}
            <VintageCard variant="paper" ornate>
              <VintageCardContent className="py-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-burgundy-600 dark:text-burgundy-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg text-burgundy-700 dark:text-burgundy-400 mb-3">
                      Review Process
                    </h3>
                    <div className="space-y-3 font-serif text-sm text-ink-700 dark:text-parchment-300">
                      <div className="flex items-start gap-2">
                        <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 text-xs font-serif">
                          Step 1
                        </Badge>
                        <span>Submit your manuscript for review</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 text-xs font-serif">
                          Step 2
                        </Badge>
                        <span>Our curators review within 1-3 business days</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 text-xs font-serif">
                          Step 3
                        </Badge>
                        <span>Once approved, your book appears in NoteShare</span>
                      </div>
                    </div>
                  </div>
                </div>
              </VintageCardContent>
            </VintageCard>
          </div>
        </motion.div>
      </div>
    </div>
  )
}