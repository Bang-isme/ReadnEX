import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VintagePageHeader from '@/components/VintagePageHeader';
import Quiz from '@/components/Quiz';
import { VintageCard, VintageCardContent } from '@/components/ui/vintage-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Award,
  ChevronLeft,
  Trophy,
  CheckCircle,
  Target
} from 'lucide-react';
import {
  getBookById,
  getQuizQuestionsByBookId,
  type QuizAttempt
} from '@/lib/mockData';

export default function QuizPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  const book = bookId ? getBookById(bookId) : null;
  const quizQuestions = bookId ? getQuizQuestionsByBookId(bookId) : [];

  const handleQuizComplete = (attempt: QuizAttempt) => {
    setLastAttempt(attempt);
    setQuizCompleted(true);
    console.log('Quiz completed:', attempt);
  };

  const handleClose = () => {
    navigate(`/book/${bookId}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-parchment-50 dark:bg-ink-950 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <VintageCard variant="aged" className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
            <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
              Book Not Found
            </h3>
            <p className="font-serif text-ink-600 dark:text-parchment-400 mb-6">
              The book you're looking for doesn't exist.
            </p>
            <Button
              asChild
              className="bg-burgundy-700 hover:bg-burgundy-800 text-parchment-50 font-serif"
            >
              <Link to="/readnex">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Link>
            </Button>
          </VintageCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950">
      {/* Hero Section */}
      <VintagePageHeader
        badge="Reading Comprehension"
        title={`Quiz: ${book.title}`}
        subtitle={`Test your understanding of "${book.title}" by ${book.author}. Answer questions about the story, characters, and themes.`}
        quote={{
          text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
          author: "Dr. Seuss"
        }}
      />

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(`/book/${bookId}`)}
              className="font-serif"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Book
            </Button>
          </motion.div>

          {/* Quiz Info Card (Before Starting) */}
          {quizQuestions.length > 0 && !quizCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <VintageCard variant="manuscript" ornate>
                <VintageCardContent className="py-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-full">
                        <Target className="h-6 w-6 text-burgundy-700 dark:text-burgundy-400" />
                      </div>
                      <div>
                        <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                          {quizQuestions.length}
                        </div>
                        <div className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                          Questions
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full">
                        <Trophy className="h-6 w-6 text-gold-leaf-700 dark:text-gold-leaf-400" />
                      </div>
                      <div>
                        <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                          60%
                        </div>
                        <div className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                          Pass Score
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-forest-100 dark:bg-forest-900/30 rounded-full">
                        <CheckCircle className="h-6 w-6 text-forest-700 dark:text-forest-400" />
                      </div>
                      <div>
                        <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                          Instant
                        </div>
                        <div className="font-serif text-sm text-ink-600 dark:text-parchment-400">
                          Feedback
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-parchment-300 dark:border-ink-700">
                    <ul className="space-y-2 font-serif text-sm text-ink-700 dark:text-parchment-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>Read each question carefully before selecting your answer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>You'll receive immediate feedback with explanations after each answer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>You can retake the quiz as many times as you'd like</span>
                      </li>
                    </ul>
                  </div>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          )}

          {/* Quiz Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Quiz
              bookId={bookId!}
              bookTitle={book.title}
              onComplete={handleQuizComplete}
              onClose={handleClose}
            />
          </motion.div>

          {/* Previous Attempts (if any) */}
          {lastAttempt && quizCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <VintageCard variant="paper" ornate>
                <VintageCardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    <h3 className="font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
                      Latest Achievement
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <div className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-1">
                        Score
                      </div>
                      <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                        {lastAttempt.score}/{lastAttempt.total_questions}
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-1">
                        Percentage
                      </div>
                      <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                        {Math.round((lastAttempt.score / lastAttempt.total_questions) * 100)}%
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-1">
                        Time Taken
                      </div>
                      <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                        {Math.floor(lastAttempt.time_taken_seconds / 60)}m {lastAttempt.time_taken_seconds % 60}s
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-1">
                        Status
                      </div>
                      <Badge className={
                        (lastAttempt.score / lastAttempt.total_questions) >= 0.6
                          ? "bg-forest-100 dark:bg-forest-900/30 text-forest-800 dark:text-forest-300"
                          : "bg-ink-200 dark:bg-ink-800 text-ink-800 dark:text-parchment-300"
                      }>
                        {(lastAttempt.score / lastAttempt.total_questions) >= 0.6 ? 'Passed' : 'Failed'}
                      </Badge>
                    </div>
                  </div>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
