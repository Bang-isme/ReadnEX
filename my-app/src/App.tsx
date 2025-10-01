import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import BookDetails from './pages/BookDetails'
import Chatbot from './pages/Chatbot'
import Favorites from './pages/Favorites'
import ReadingHistory from './pages/ReadingHistory'
import UserProfile from './pages/UserProfile'
import CreateBook from './pages/CreateBook'
import MyBooks from './pages/MyBooks'
import AdminDashboard from './pages/AdminDashboard'
import NoteShare from './pages/NoteShare'
import ReadnEX from './pages/ReadnEX'
import QuizPage from './pages/QuizPage'
import './App.css'
import './styles/responsive.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="bookquest-theme">
      <Router>
        <AuthProvider>
          <Layout>
            <div className="min-h-screen font-sans antialiased">
              <a href="#main-content" className="sr-only focus:not-sr-only fixed top-2 left-2 bg-primary text-primary-foreground px-3 py-2 rounded z-50">Skip to content</a>
              <main id="main-content">
              <Routes>
                {/* Public Marketing Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Authentication Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected User Pages */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/book/:id" element={
                  <ProtectedRoute>
                    <BookDetails />
                  </ProtectedRoute>
                } />
                <Route path="/chatbot" element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                } />
                <Route path="/favorites" element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } />
                <Route path="/reading-history" element={
                  <ProtectedRoute>
                    <ReadingHistory />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="/create-book" element={
                  <ProtectedRoute>
                    <CreateBook />
                  </ProtectedRoute>
                } />
                <Route path="/my-books" element={
                  <ProtectedRoute>
                    <MyBooks />
                  </ProtectedRoute>
                } />
                <Route path="/noteshare" element={
                  <ProtectedRoute>
                    <NoteShare />
                  </ProtectedRoute>
                } />
                <Route path="/readnex" element={
                  <ProtectedRoute>
                    <ReadnEX />
                  </ProtectedRoute>
                } />
                <Route path="/quiz/:bookId" element={
                  <ProtectedRoute>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                
                {/* Protected Admin Pages */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
              </main>
            </div>
          </Layout>
          <Toaster />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
