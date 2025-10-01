// ============================================================================
// MOCK DATA FOR ReadnEX APPLICATION
// Complete mock data structure for testing before API integration
// ============================================================================

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  role: 'user' | 'admin';
  joined_date: string;
  reading_streak: number;
  books_read: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  description: string;
  genre: string;
  published_year: number;
  pages: number;
  isbn: string;
  language: string;
  rating: number;
  total_ratings: number;
  content: string; // Full book text content
  chapters: Chapter[];
  created_by: 'system' | string; // 'system' or user_id for user-created books
  status: 'published' | 'pending_approval' | 'draft';
  created_at: string;
}

export interface Chapter {
  id: string;
  book_id: string;
  title: string;
  number: number;
  content: string;
  start_page: number;
  end_page: number;
}

export interface Annotation {
  id: string;
  book_id: string;
  user_id: string;
  chapter_id?: string;
  text_selection: string; // The highlighted text
  start_position: number;
  end_position: number;
  note: string; // User's note/comment
  color: 'yellow' | 'green' | 'blue' | 'pink';
  created_at: string;
  updated_at: string;
}

export interface AnnotatedVersion {
  id: string;
  original_book_id: string;
  user_id: string;
  title: string; // Version title
  description: string;
  cover_image?: string;
  annotations: Annotation[];
  is_public: boolean;
  is_favorite: boolean;
  rating: number;
  total_ratings: number;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  book_id?: string;
  annotated_version_id?: string;
  user_id: string;
  rating: number; // 1-5
  title: string;
  content: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReadingHistory {
  id: string;
  user_id: string;
  book_id: string;
  current_page: number;
  total_pages: number;
  progress_percentage: number;
  last_read_at: string;
  started_at: string;
  completed_at?: string;
  reading_time_minutes: number; // Total time spent reading
}

export interface Favorite {
  id: string;
  user_id: string;
  book_id?: string;
  annotated_version_id?: string;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  book_id: string;
  chapter_id?: string;
  question: string;
  options: string[];
  correct_answer: number; // Index of correct option (0-3)
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'plot', 'character', 'theme', 'detail'
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  book_id: string;
  questions: QuizQuestion[];
  answers: number[]; // User's answers (indices)
  score: number;
  total_questions: number;
  completed_at: string;
  time_taken_seconds: number;
}

export interface UserStats {
  user_id: string;
  books_read: number;
  pages_read: number;
  reading_time_hours: number;
  annotations_made: number;
  reviews_written: number;
  quizzes_completed: number;
  average_quiz_score: number;
  books_created: number;
  reading_streak_days: number;
  favorite_genre: string;
}

// ============================================================================
// MOCK DATA INSTANCES
// ============================================================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'user',
    joined_date: '2024-01-15',
    reading_streak: 7,
    books_read: 24
  },
  {
    id: 'user-2',
    email: 'jane.smith@example.com',
    first_name: 'Jane',
    last_name: 'Smith',
    role: 'user',
    joined_date: '2024-02-20',
    reading_streak: 15,
    books_read: 38
  },
  {
    id: 'admin-1',
    email: 'admin@readnex.com',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    joined_date: '2024-01-01',
    reading_streak: 30,
    books_read: 50
  }
];

export const mockBooks: Book[] = [
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover_image: '/api/placeholder/300/450',
    description: 'A classic American novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.',
    genre: 'Classic Literature',
    published_year: 1925,
    pages: 180,
    isbn: '978-0-7432-7356-5',
    language: 'English',
    rating: 4.5,
    total_ratings: 1250,
    content: 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since. "Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven\'t had the advantages that you\'ve had."',
    chapters: [
      {
        id: 'chapter-1-1',
        book_id: 'book-1',
        title: 'Chapter 1',
        number: 1,
        content: 'Full chapter content here...',
        start_page: 1,
        end_page: 20
      }
    ],
    created_by: 'system',
    status: 'published',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover_image: '/api/placeholder/300/450',
    description: 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
    genre: 'Classic Literature',
    published_year: 1960,
    pages: 324,
    isbn: '978-0-06-112008-4',
    language: 'English',
    rating: 4.8,
    total_ratings: 2100,
    content: 'When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.',
    chapters: [],
    created_by: 'system',
    status: 'published',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    cover_image: '/api/placeholder/300/450',
    description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
    genre: 'Science Fiction',
    published_year: 1949,
    pages: 328,
    isbn: '978-0-452-28423-4',
    language: 'English',
    rating: 4.7,
    total_ratings: 1800,
    content: 'It was a bright cold day in April, and the clocks were striking thirteen.',
    chapters: [],
    created_by: 'system',
    status: 'published',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'book-4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover_image: '/api/placeholder/300/450',
    description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.',
    genre: 'Romance',
    published_year: 1813,
    pages: 432,
    isbn: '978-0-14-143951-8',
    language: 'English',
    rating: 4.6,
    total_ratings: 1950,
    content: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    chapters: [],
    created_by: 'system',
    status: 'published',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'book-5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    cover_image: '/api/placeholder/300/450',
    description: 'A story about teenage rebellion and alienation that has resonated with generations of readers.',
    genre: 'Coming of Age',
    published_year: 1951,
    pages: 277,
    isbn: '978-0-316-76948-0',
    language: 'English',
    rating: 4.3,
    total_ratings: 1600,
    content: 'If you really want to hear about it, the first thing you\'ll probably want to know is where I was born...',
    chapters: [],
    created_by: 'system',
    status: 'published',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'book-user-1',
    title: 'Modern Philosophy Essays',
    author: 'John Doe',
    cover_image: '/api/placeholder/300/450',
    description: 'A collection of philosophical essays exploring modern thought and contemporary issues.',
    genre: 'Philosophy',
    published_year: 2024,
    pages: 156,
    isbn: '',
    language: 'English',
    rating: 4.2,
    total_ratings: 45,
    content: 'Philosophy begins in wonder...',
    chapters: [],
    created_by: 'user-1',
    status: 'published',
    created_at: '2024-03-15T00:00:00Z'
  }
];

export const mockAnnotations: Annotation[] = [
  {
    id: 'anno-1',
    book_id: 'book-1',
    user_id: 'user-1',
    chapter_id: 'chapter-1-1',
    text_selection: 'all the people in this world haven\'t had the advantages that you\'ve had',
    start_position: 150,
    end_position: 220,
    note: 'This sets the theme of privilege and perspective that runs throughout the novel.',
    color: 'yellow',
    created_at: '2024-03-20T10:30:00Z',
    updated_at: '2024-03-20T10:30:00Z'
  },
  {
    id: 'anno-2',
    book_id: 'book-1',
    user_id: 'user-2',
    text_selection: 'the green light',
    start_position: 500,
    end_position: 520,
    note: 'Symbol of Gatsby\'s hopes and dreams for the future.',
    color: 'green',
    created_at: '2024-03-21T14:20:00Z',
    updated_at: '2024-03-21T14:20:00Z'
  }
];

export const mockAnnotatedVersions: AnnotatedVersion[] = [
  {
    id: 'version-1',
    original_book_id: 'book-1',
    user_id: 'user-2',
    title: 'The Great Gatsby - Literary Analysis Edition',
    description: 'Comprehensive annotations focusing on symbolism, themes, and literary devices.',
    cover_image: '/api/placeholder/300/450',
    annotations: [mockAnnotations[1]],
    is_public: true,
    is_favorite: false,
    rating: 4.7,
    total_ratings: 89,
    downloads: 234,
    created_at: '2024-03-15T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z'
  },
  {
    id: 'version-2',
    original_book_id: 'book-2',
    user_id: 'user-1',
    title: 'To Kill a Mockingbird - Social Justice Perspective',
    description: 'Annotations highlighting themes of justice, morality, and racial inequality.',
    is_public: true,
    is_favorite: true,
    rating: 4.9,
    total_ratings: 156,
    downloads: 567,
    annotations: [],
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    book_id: 'book-1',
    user_id: 'user-1',
    rating: 5,
    title: 'A Timeless Masterpiece',
    content: 'Fitzgerald\'s prose is simply magnificent. The way he captures the essence of the Jazz Age and the tragedy of the American Dream is unparalleled.',
    helpful_count: 45,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z'
  },
  {
    id: 'review-2',
    annotated_version_id: 'version-1',
    user_id: 'user-1',
    rating: 5,
    title: 'Excellent Annotations',
    content: 'This annotated version really enhanced my understanding of the symbolism. Highly recommended for students and book clubs!',
    helpful_count: 23,
    created_at: '2024-03-18T00:00:00Z',
    updated_at: '2024-03-18T00:00:00Z'
  }
];

export const mockReadingHistory: ReadingHistory[] = [
  {
    id: 'history-1',
    user_id: 'user-1',
    book_id: 'book-1',
    current_page: 120,
    total_pages: 180,
    progress_percentage: 67,
    last_read_at: '2024-03-25T20:15:00Z',
    started_at: '2024-03-20T10:00:00Z',
    reading_time_minutes: 180
  },
  {
    id: 'history-2',
    user_id: 'user-1',
    book_id: 'book-2',
    current_page: 324,
    total_pages: 324,
    progress_percentage: 100,
    last_read_at: '2024-03-15T18:30:00Z',
    started_at: '2024-03-01T09:00:00Z',
    completed_at: '2024-03-15T18:30:00Z',
    reading_time_minutes: 420
  },
  {
    id: 'history-3',
    user_id: 'user-1',
    book_id: 'book-3',
    current_page: 45,
    total_pages: 328,
    progress_percentage: 14,
    last_read_at: '2024-03-24T15:00:00Z',
    started_at: '2024-03-23T20:00:00Z',
    reading_time_minutes: 60
  }
];

export const mockFavorites: Favorite[] = [
  {
    id: 'fav-1',
    user_id: 'user-1',
    book_id: 'book-2',
    created_at: '2024-03-16T00:00:00Z'
  },
  {
    id: 'fav-2',
    user_id: 'user-1',
    annotated_version_id: 'version-2',
    created_at: '2024-02-20T00:00:00Z'
  }
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    book_id: 'book-1',
    question: 'What does the green light symbolize in The Great Gatsby?',
    options: [
      'Gatsby\'s wealth and success',
      'Gatsby\'s hope and dreams for the future with Daisy',
      'The American Dream of prosperity',
      'Environmental concerns of the 1920s'
    ],
    correct_answer: 1,
    explanation: 'The green light represents Gatsby\'s hopes and dreams for a future with Daisy, symbolizing his longing and the elusive nature of the American Dream.',
    difficulty: 'medium',
    category: 'symbolism'
  },
  {
    id: 'quiz-2',
    book_id: 'book-1',
    question: 'Who is the narrator of The Great Gatsby?',
    options: [
      'Jay Gatsby',
      'Tom Buchanan',
      'Nick Carraway',
      'Daisy Buchanan'
    ],
    correct_answer: 2,
    explanation: 'Nick Carraway is the narrator and provides an outsider\'s perspective on the events of the story.',
    difficulty: 'easy',
    category: 'character'
  },
  {
    id: 'quiz-3',
    book_id: 'book-2',
    question: 'What is Atticus Finch\'s profession in To Kill a Mockingbird?',
    options: [
      'Doctor',
      'Teacher',
      'Lawyer',
      'Judge'
    ],
    correct_answer: 2,
    explanation: 'Atticus Finch is a lawyer who defends Tom Robinson in the trial that forms the central conflict of the novel.',
    difficulty: 'easy',
    category: 'character'
  }
];

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: 'attempt-1',
    user_id: 'user-1',
    book_id: 'book-1',
    questions: [mockQuizQuestions[0], mockQuizQuestions[1]],
    answers: [1, 2],
    score: 2,
    total_questions: 2,
    completed_at: '2024-03-16T00:00:00Z',
    time_taken_seconds: 120
  }
];

export const mockUserStats: UserStats[] = [
  {
    user_id: 'user-1',
    books_read: 24,
    pages_read: 5840,
    reading_time_hours: 87,
    annotations_made: 156,
    reviews_written: 18,
    quizzes_completed: 15,
    average_quiz_score: 85,
    books_created: 1,
    reading_streak_days: 7,
    favorite_genre: 'Classic Literature'
  },
  {
    user_id: 'user-2',
    books_read: 38,
    pages_read: 9200,
    reading_time_hours: 142,
    annotations_made: 287,
    reviews_written: 32,
    quizzes_completed: 28,
    average_quiz_score: 92,
    books_created: 0,
    reading_streak_days: 15,
    favorite_genre: 'Science Fiction'
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getBookById = (id: string): Book | undefined => {
  return mockBooks.find(book => book.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getAnnotatedVersionById = (id: string): AnnotatedVersion | undefined => {
  return mockAnnotatedVersions.find(version => version.id === id);
};

export const getReadingHistoryByUserId = (userId: string): ReadingHistory[] => {
  return mockReadingHistory.filter(history => history.user_id === userId);
};

export const getFavoritesByUserId = (userId: string): Favorite[] => {
  return mockFavorites.filter(fav => fav.user_id === userId);
};

export const getAnnotationsByBookId = (bookId: string): Annotation[] => {
  return mockAnnotations.filter(anno => anno.book_id === bookId);
};

export const getQuizQuestionsByBookId = (bookId: string): QuizQuestion[] => {
  return mockQuizQuestions.filter(quiz => quiz.book_id === bookId);
};

export const getReviewsByBookId = (bookId: string): Review[] => {
  return mockReviews.filter(review => review.book_id === bookId);
};

export const getReviewsByAnnotatedVersionId = (versionId: string): Review[] => {
  return mockReviews.filter(review => review.annotated_version_id === versionId);
};

export const getUserStats = (userId: string): UserStats | undefined => {
  return mockUserStats.find(stats => stats.user_id === userId);
};

export const getPublicAnnotatedVersions = (): AnnotatedVersion[] => {
  return mockAnnotatedVersions.filter(version => version.is_public);
};

export const getUserCreatedBooks = (): Book[] => {
  return mockBooks.filter(book => book.created_by !== 'system');
};

export const getPendingBooks = (): Book[] => {
  return mockBooks.filter(book => book.status === 'pending_approval');
};
