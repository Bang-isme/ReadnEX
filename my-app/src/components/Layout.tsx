import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';
import {
  BookOpen,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Heart,
  Clock,
  MessageCircle,
  Home,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  Library,
  Plus,
  Sparkles,
  Info
} from 'lucide-react';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleLogout = async () => {
    await logout();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navItems = isAuthenticated ? [
    { path: '/', label: 'Home', icon: Home },
    { path: '/readnex', label: 'ReadnEX', icon: Library },
    { path: '/noteshare', label: 'NoteShare', icon: BookOpen },
    { path: '/create-book', label: 'Create', icon: Plus },
    { path: '/about', label: 'About', icon: Info },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: Shield }] : [])
  ] : [
    { path: '/', label: 'Home', icon: Home },
    { path: '/readnex', label: 'ReadnEX', icon: Library },
    { path: '/noteshare', label: 'NoteShare', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand - Left */}
            <Link to="/" className="group flex items-center space-x-2 transition-all duration-300 z-10">
              {/* Vintage Literary Logo */}
              <div className="relative">
                <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-burgundy-700 dark:text-gold-leaf-500 transition-colors group-hover:text-burgundy-800 dark:group-hover:text-gold-leaf-400" strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-xl sm:text-2xl font-bold text-ink-900 dark:text-parchment-100 tracking-tight">
                  MyNextBook
                </span>
                <span className="hidden sm:inline text-xs font-serif italic text-ink-600 dark:text-parchment-400">
                  Literary Sanctuary
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 font-serif text-sm rounded-sm transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-burgundy-700 dark:bg-burgundy-600 text-parchment-100 shadow-md'
                        : 'text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <>
                  {/* Theme Toggle - Desktop & Mobile */}
                  <div className="z-10">
                    <ThemeToggle />
                  </div>
                  
                  {/* User Menu - Desktop Only */}
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` : undefined} />
                            <AvatarFallback>
                              {user?.first_name?.[0]}{user?.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hidden lg:inline-block max-w-[120px] truncate">
                            {user?.first_name}
                          </span>
                          {isAdmin && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              Admin
                            </Badge>
                          )}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user?.first_name} {user?.last_name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user?.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/settings')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Mobile Hamburger Menu Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </>
              ) : (
                <>
                  {/* Theme Toggle for non-authenticated users */}
                  <div className="z-10">
                    <ThemeToggle />
                  </div>
                  
                  {/* Desktop Auth Buttons */}
                  <div className="hidden md:flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      className="font-serif text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100" 
                      asChild
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button 
                      className="bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif px-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800" 
                      asChild
                    >
                      <Link to="/register">
                        Begin Your Journey
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Mobile Hamburger Menu Button for non-authenticated */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu - Authenticated Users */}
          {isAuthenticated && isMobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 border-t">
              {/* User Profile Section */}
              <div className="px-3 py-3 border-b mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}` : undefined} />
                    <AvatarFallback>
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  {isAdmin && (
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 text-sm font-serif rounded-md transition-colors ${
                        isActivePath(item.path)
                          ? 'bg-burgundy-700 dark:bg-burgundy-600 text-parchment-100'
                          : 'text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Profile & Settings */}
                <div className="pt-2 border-t mt-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-serif text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800 rounded-md transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-serif text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800 rounded-md transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-serif text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors mt-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Navigation Menu - Non-Authenticated Users */}
          {!isAuthenticated && isMobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 border-t">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 text-sm font-serif rounded-md transition-colors ${
                        isActivePath(item.path)
                          ? 'bg-burgundy-700 dark:bg-burgundy-600 text-parchment-100'
                          : 'text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Auth Buttons */}
                <div className="pt-2 border-t mt-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-serif text-ink-700 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 hover:bg-parchment-100 dark:hover:bg-ink-800 rounded-md transition-colors border border-parchment-300 dark:border-ink-700"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </Link>
                  
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-serif bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 rounded-md transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800 shadow-md"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>Begin Your Journey</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}