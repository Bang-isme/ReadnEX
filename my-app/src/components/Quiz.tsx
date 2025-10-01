import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from './ui/vintage-card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  Trophy,
  Target,
  RefreshCw
} from 'lucide-react';
import {
  getQuizQuestionsByBookId,
  type QuizQuestion,
  type QuizAttempt
} from '@/lib/mockData';

interface QuizProps {
  bookId: string;
  bookTitle: string;
  onComplete?: (attempt: QuizAttempt) => void;
  onClose?: () => void;
}

export default function Quiz({ bookId, bookTitle, onComplete, onClose }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStartTime] = useState(Date.now());
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Load quiz questions for this book
    const quizQuestions = getQuizQuestionsByBookId(bookId);
    setQuestions(quizQuestions);
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
  }, [bookId]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return; // Prevent changing answer after submission

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    setHasAnswered(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score and show results
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHasAnswered(false);
      setShowExplanation(false);
    }
  };

  const calculateResults = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length;

    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      user_id: 'user-1', // Mock current user
      book_id: bookId,
      questions: questions,
      answers: selectedAnswers,
      score: correctAnswers,
      total_questions: questions.length,
      completed_at: new Date().toISOString(),
      time_taken_seconds: timeTaken
    };

    setShowResult(true);
    
    if (onComplete) {
      onComplete(attempt);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResult(false);
    setHasAnswered(false);
    setShowExplanation(false);
  };

  const isAnswerCorrect = (answerIndex: number) => {
    return answerIndex === currentQuestion?.correct_answer;
  };

  const getScorePercentage = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { text: "Outstanding!", color: "text-gold-leaf-600 dark:text-gold-leaf-400" };
    if (percentage >= 75) return { text: "Excellent!", color: "text-forest-600 dark:text-forest-400" };
    if (percentage >= 60) return { text: "Good Job!", color: "text-burgundy-600 dark:text-burgundy-400" };
    return { text: "Keep Practicing!", color: "text-ink-600 dark:text-parchment-400" };
  };

  if (questions.length === 0) {
    return (
      <VintageCard variant="aged" className="p-12 text-center">
        <BookOpen className="h-16 w-16 mx-auto mb-4 text-ink-400 dark:text-parchment-600" />
        <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100 mb-2">
          No Quiz Available
        </h3>
        <p className="font-serif text-ink-600 dark:text-parchment-400">
          This book doesn't have a quiz yet. Check back later!
        </p>
      </VintageCard>
    );
  }

  // Results Screen
  if (showResult) {
    const scorePercentage = getScorePercentage();
    const scoreMessage = getScoreMessage(scorePercentage);
    const correctCount = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        <VintageCard variant="manuscript" ornate className="text-center">
          <VintageCardContent className="py-12">
            {/* Trophy Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <Trophy className={`h-20 w-20 mx-auto mb-6 ${scoreMessage.color}`} />
            </motion.div>

            {/* Score Message */}
            <h2 className={`font-display text-4xl font-bold mb-2 ${scoreMessage.color}`}>
              {scoreMessage.text}
            </h2>
            <p className="font-serif text-xl text-ink-700 dark:text-parchment-300 mb-8">
              You've completed the quiz for "{bookTitle}"
            </p>

            {/* Score Circle */}
            <div className="relative inline-block mb-8">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-parchment-300 dark:text-ink-700"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - scorePercentage / 100)}`}
                  strokeLinecap="round"
                  className={scoreMessage.color}
                  transform="rotate(-90 100 100)"
                />
                {/* Center text */}
                <text
                  x="100"
                  y="100"
                  textAnchor="middle"
                  dy="0.3em"
                  className="font-display text-5xl font-bold fill-current text-ink-900 dark:text-parchment-100"
                >
                  {scorePercentage}%
                </text>
              </svg>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Target, label: 'Score', value: `${correctCount}/${questions.length}`, color: 'text-burgundy-600' },
                { icon: TrendingUp, label: 'Percentage', value: `${scorePercentage}%`, color: 'text-gold-leaf-600' },
                { icon: Clock, label: 'Time', value: `${Math.floor((Date.now() - quizStartTime) / 60000)}m`, color: 'text-forest-600' },
                { icon: Award, label: 'Status', value: scorePercentage >= 60 ? 'Passed' : 'Failed', color: scorePercentage >= 60 ? 'text-forest-600' : 'text-ink-600' }
              ].map((stat, index) => (
                <VintageCard key={index} variant="aged" className="p-4">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
                    {stat.value}
                  </div>
                  <div className="font-serif text-xs text-ink-600 dark:text-parchment-400">
                    {stat.label}
                  </div>
                </VintageCard>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRetakeQuiz}
                variant="outline"
                size="lg"
                className="border-2 border-burgundy-700 dark:border-burgundy-600 font-serif"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              {onClose && (
                <Button
                  onClick={onClose}
                  size="lg"
                  className="bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                >
                  Continue Reading
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </VintageCardContent>
        </VintageCard>
      </motion.div>
    );
  }

  // Quiz Question Screen
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <VintageCard variant="manuscript" className="mb-6">
        <VintageCardContent className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-burgundy-600 dark:text-burgundy-400" />
              <h3 className="font-serif font-semibold text-ink-900 dark:text-parchment-100">
                {bookTitle}
              </h3>
            </div>
            <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 font-serif">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </VintageCardContent>
      </VintageCard>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <VintageCard variant="aged" ornate>
            <VintageCardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-burgundy-700 text-parchment-100 font-serif">
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline" className="font-serif">
                  {currentQuestion.category}
                </Badge>
              </div>
              <VintageCardTitle className="text-2xl leading-relaxed">
                {currentQuestion.question}
              </VintageCardTitle>
            </VintageCardHeader>

            <VintageCardContent>
              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === index;
                  const isCorrect = isAnswerCorrect(index);
                  const showCorrectness = hasAnswered;

                  let borderColor = 'border-parchment-300 dark:border-ink-700';
                  let bgColor = 'bg-parchment-50 dark:bg-ink-900';
                  let icon = null;

                  if (showCorrectness) {
                    if (isSelected && isCorrect) {
                      borderColor = 'border-forest-600 dark:border-forest-500';
                      bgColor = 'bg-forest-50 dark:bg-forest-950/30';
                      icon = <CheckCircle className="h-5 w-5 text-forest-600" />;
                    } else if (isSelected && !isCorrect) {
                      borderColor = 'border-red-600 dark:border-red-500';
                      bgColor = 'bg-red-50 dark:bg-red-950/30';
                      icon = <XCircle className="h-5 w-5 text-red-600" />;
                    } else if (isCorrect) {
                      borderColor = 'border-forest-600 dark:border-forest-500';
                      bgColor = 'bg-forest-50 dark:bg-forest-950/30';
                      icon = <CheckCircle className="h-5 w-5 text-forest-600" />;
                    }
                  } else if (isSelected) {
                    borderColor = 'border-burgundy-600 dark:border-burgundy-500';
                    bgColor = 'bg-burgundy-50 dark:bg-burgundy-950/30';
                  }

                  return (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleAnswerSelect(index)}
                      disabled={hasAnswered}
                      className={`w-full p-4 border-2 rounded-sm text-left transition-all duration-200 ${borderColor} ${bgColor} ${
                        !hasAnswered && 'hover:border-burgundy-600 dark:hover:border-burgundy-500 hover:bg-burgundy-50 dark:hover:bg-burgundy-950/30'
                      } ${hasAnswered && 'cursor-default'}`}
                      whileHover={!hasAnswered ? { scale: 1.01 } : {}}
                      whileTap={!hasAnswered ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-serif font-bold ${
                            isSelected ? 'border-current' : 'border-ink-400 dark:border-parchment-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-serif text-ink-900 dark:text-parchment-100">
                            {option}
                          </span>
                        </div>
                        {icon}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <VintageCard variant="paper" className="bg-gold-leaf-50 dark:bg-gold-leaf-950/20 border-gold-leaf-300 dark:border-gold-leaf-800">
                      <VintageCardContent className="py-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-gold-leaf-700 dark:text-gold-leaf-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-serif font-semibold text-gold-leaf-900 dark:text-gold-leaf-300 mb-1">
                              Explanation
                            </h4>
                            <p className="font-serif text-sm text-gold-leaf-800 dark:text-gold-leaf-400 leading-relaxed">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </div>
                      </VintageCardContent>
                    </VintageCard>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!hasAnswered ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswers[currentQuestionIndex] === -1}
                    className="flex-1 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif"
                  >
                    {isLastQuestion ? 'View Results' : 'Next Question'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </VintageCardContent>
          </VintageCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
