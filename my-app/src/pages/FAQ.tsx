import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import {
  BookOpen,
  HelpCircle,
  MessageSquare,
  Shield,
  Zap,
  Feather,
  ScrollText
} from "lucide-react"
import { motion } from "framer-motion"
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from "../components/ui/vintage-card"
import VintagePageHeader from "../components/VintagePageHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      questions: [
        {
          question: "What is BookQuest?",
          answer: "BookQuest is an AI-powered book discovery platform that helps you find your next favorite book through intelligent recommendations, personalized chatbot conversations, and community-driven reviews. We combine advanced AI technology with the joy of reading to create a unique book discovery experience."
        },
        {
          question: "How do I get started with BookQuest?",
          answer: "Getting started is easy! Simply click the 'Get Started' button, create your free account, and tell us about your reading preferences. Our AI will immediately begin suggesting books tailored to your interests. You can also start chatting with our AI assistant right away for personalized recommendations."
        },
        {
          question: "Do I need to pay to use BookQuest?",
          answer: "BookQuest offers a generous free tier that includes basic AI recommendations, reading history tracking, and access to our community features. We also offer premium plans with advanced features like unlimited AI conversations, priority support, and exclusive early access to new features."
        }
      ]
    },
    {
      title: "AI & Recommendations",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      questions: [
        {
          question: "How does the AI recommendation system work?",
          answer: "Our AI analyzes your reading history, preferences, ratings, and even the content of your conversations with our chatbot to understand your unique taste in books. We use advanced machine learning algorithms to suggest books that match your interests, often discovering hidden gems you might not find through traditional search methods."
        },
        {
          question: "Can I chat with the AI about books?",
          answer: "Absolutely! Our AI chatbot is designed for natural conversations about books. You can ask for recommendations based on mood, genre preferences, specific themes, or even describe a book you enjoyed and ask for similar suggestions. The AI remembers your conversation history to provide increasingly personalized recommendations."
        },
        {
          question: "How accurate are the recommendations?",
          answer: "Our users consistently rate our recommendations as highly accurate, with an average satisfaction score of 4.8/5. The AI learns from your feedback and gets better over time. Many users discover new favorite authors and genres they never would have explored otherwise."
        }
      ]
    },
    {
      title: "Features & Usage",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      questions: [
        {
          question: "What features are included in the free plan?",
          answer: "The free plan includes: AI-powered book recommendations, basic reading history tracking, community reviews access, favorites management, and limited chatbot conversations. It's perfect for casual readers who want to discover new books without any commitment."
        },
        {
          question: "How do I track my reading progress?",
          answer: "BookQuest offers comprehensive reading tracking features. You can mark books as 'Currently Reading', 'Completed', or 'Want to Read'. Track pages read, set reading goals, and get insights into your reading patterns. Our progress tracking helps motivate you to read more consistently."
        },
        {
          question: "Can I share books with friends?",
          answer: "Yes! You can create and share reading lists, recommend books to friends, and see what your friends are reading. Our social features help you discover books through trusted recommendations from people you know."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      questions: [
        {
          question: "How do you protect my privacy?",
          answer: "We take your privacy seriously. Your reading data is encrypted and stored securely. We never sell your personal information to third parties. You have full control over your data and can delete your account at any time. Our privacy policy is transparent about how we use your data to improve recommendations."
        },
        {
          question: "What data do you collect?",
          answer: "We collect information about the books you read, your ratings and reviews, your interactions with our AI chatbot, and basic account information. This data is used solely to improve your reading experience and provide better recommendations. We do not track your reading across other websites or apps."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you have complete control over your data. You can export your reading history, delete specific data, or delete your entire account at any time. We provide tools to manage your privacy preferences and data retention settings."
        }
      ]
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment-50 dark:bg-ink-950">
      {/* Hero Section */}
      <VintagePageHeader
        badge="Frequently Asked Questions"
        title="Got Questions? We've Got Answers"
        subtitle="Find quick answers to common questions about ReadnEX, our features, and how to get the most out of your reading experience."
        quote={{
          text: "The only thing that you absolutely have to know, is the location of the library.",
          author: "Albert Einstein"
        }}
      />

      {/* FAQ Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-4xl mx-auto">
          <motion.div {...stagger} className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div key={categoryIndex} {...fadeInUp}>
                <VintageCard variant="aged" ornate className="overflow-hidden">
                  <VintageCardHeader>
                    <VintageCardTitle className="flex items-center gap-3">
                      <div className="p-3 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full">
                        <category.icon className="h-6 w-6 text-burgundy-700 dark:text-gold-leaf-500" />
                      </div>
                      {category.title}
                    </VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border-parchment-300 dark:border-ink-700">
                          <AccordionTrigger className="px-6 py-4 text-left hover:bg-parchment-50 dark:hover:bg-ink-800 font-serif">
                            <span className="font-semibold text-ink-900 dark:text-parchment-100">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-ink-700 dark:text-parchment-300 font-serif leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp}>
            <VintageCard variant="manuscript" ornate className="p-6 sm:p-10 md:p-16 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-10">
                <ScrollText className="w-full h-full text-gold-leaf-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-10">
                <HelpCircle className="w-full h-full text-gold-leaf-600" />
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-ink-900 dark:text-parchment-100 px-2">
                Still Need Help?
              </h2>
              <p className="font-serif text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-ink-700 dark:text-parchment-300 max-w-3xl mx-auto leading-relaxed px-2">
                Can't find the answer you're looking for? Our friendly support team is here to help.
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-block">
                <Link 
                  to="/contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800 rounded-sm"
                >
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="whitespace-nowrap">Contact Our Support Team</span>
                </Link>
              </motion.div>
            </VintageCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
