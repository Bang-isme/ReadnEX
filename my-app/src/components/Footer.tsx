import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink-900 dark:bg-ink-950 border-t border-ink-700 dark:border-ink-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <BookOpen className="h-7 w-7 text-gold-leaf-500" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-2xl font-bold text-parchment-100">
                  MyNextBook
                </h3>
                <p className="font-serif text-xs text-parchment-400 italic">
                  Online library with smart book suggestions
                </p>
              </div>
            </div>
            
            <p className="font-serif text-sm text-parchment-300 leading-relaxed">
              © 2025 MyNextBook. Built with{' '}
              <Heart className="inline h-3 w-3 text-burgundy-500 fill-burgundy-500" />{' '}
              for book lovers.
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-parchment-100 mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 inline-block text-left md:inline-block md:text-left">
              <a href="mailto:support@mynextbook.com" className="flex items-center gap-3 text-parchment-300 hover:text-parchment-100 transition-colors group">
                <Mail className="h-4 w-4 text-gold-leaf-500 flex-shrink-0" />
                <span className="font-serif text-sm">support@mynextbook.com</span>
              </a>
              <div className="flex items-center gap-3 text-parchment-300">
                <Phone className="h-4 w-4 text-gold-leaf-500 flex-shrink-0" />
                <span className="font-serif text-sm">+84 (028) 1234-5678</span>
              </div>
              <div className="flex items-start gap-3 text-parchment-300">
                <MapPin className="h-4 w-4 text-gold-leaf-500 flex-shrink-0 mt-0.5" />
                <span className="font-serif text-sm">123 Book Street, Reading City</span>
              </div>
              <div className="flex items-center gap-3 text-parchment-300">
                <Clock className="h-4 w-4 text-gold-leaf-500 flex-shrink-0" />
                <span className="font-serif text-sm">Mon-Fri 9AM-6PM (GMT+7)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-parchment-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 list-none pl-0 inline-block text-left md:block">
              <li>
                <Link 
                  to="/about" 
                  className="font-serif text-sm text-parchment-300 hover:text-gold-leaf-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="font-serif text-sm text-parchment-300 hover:text-gold-leaf-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="font-serif text-sm text-parchment-300 hover:text-gold-leaf-500 transition-colors"
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="font-serif text-sm text-parchment-300 hover:text-gold-leaf-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="font-serif text-sm text-parchment-300 hover:text-gold-leaf-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-semibold text-parchment-100 mb-4">
              Literary Newsletter
            </h4>
            <p className="font-serif text-sm text-parchment-300 mb-4 max-w-xs mx-auto md:mx-0">
              Subscribe for book recommendations and literary insights
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="your.email@library.com"
                  className="w-full px-4 py-2 bg-ink-800 dark:bg-ink-900 border border-ink-600 dark:border-ink-700 rounded-sm text-parchment-100 placeholder:text-ink-500 font-serif text-sm focus:outline-none focus:border-gold-leaf-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gold-leaf-500 hover:text-gold-leaf-400 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6 px-3 md:px-0 justify-center md:justify-start">
              <a
                href="#"
                className="text-parchment-400 hover:text-gold-leaf-500 transition-colors p-2 -m-2"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-parchment-400 hover:text-gold-leaf-500 transition-colors p-2 -m-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-parchment-400 hover:text-gold-leaf-500 transition-colors p-2 -m-2"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ink-700 dark:border-ink-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-serif text-sm text-parchment-400 text-center md:text-left">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </p>
            <div className="flex items-center gap-4 text-sm text-parchment-400">
              <Link to="/sitemap" className="hover:text-gold-leaf-500 transition-colors font-serif">
                Sitemap
              </Link>
              <span className="text-gold-leaf-600">•</span>
              <Link to="/accessibility" className="hover:text-gold-leaf-500 transition-colors font-serif">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}