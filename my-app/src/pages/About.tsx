import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import {
  Users,
  Lightbulb,
  Target,
  Heart,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Feather,
  ScrollText,
  Library
} from "lucide-react"
import { motion } from "framer-motion"
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from "../components/ui/vintage-card"
import VintagePageHeader from "../components/VintagePageHeader"

export default function About() {
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment-50 dark:bg-ink-950">
      {/* Hero Section */}
      <VintagePageHeader
        badge="Our Story"
        title="A Literary Sanctuary for the Modern Reader"
        subtitle="Born from a passion for books and timeless wisdom, ReadnEX combines the elegance of traditional libraries with innovative technology to create a haven for book lovers."
        quote={{
          text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
          author: "George R.R. Martin"
        }}
      />

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold-leaf-600" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100">
                Our Mission
              </h2>
              <div className="h-px w-16 bg-gold-leaf-600" />
            </div>
            <p className="font-serif text-xl text-ink-700 dark:text-parchment-300 max-w-3xl mx-auto italic">
              To cultivate a love of reading and foster a global community of literary enthusiasts
              through thoughtful curation, intelligent recommendations, and timeless design.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Empower Readers",
                description: "Give every reader the tools they need to discover books they'll love and connect with stories that matter."
              },
              {
                icon: Lightbulb,
                title: "Innovate Reading",
                description: "Blend timeless literary traditions with modern technology to enhance the reading experience."
              },
              {
                icon: Heart,
                title: "Build Community",
                description: "Create a welcoming sanctuary where book lovers can share wisdom and grow together."
              }
            ].map((item, index) => (
              <motion.div key={index} {...fadeInUp}>
                <VintageCard variant="aged" ornate hoverable className="h-full text-center">
                  <VintageCardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full w-20 h-20 flex items-center justify-center">
                      <item.icon className="h-10 w-10 text-burgundy-700 dark:text-gold-leaf-500" />
                    </div>
                    <VintageCardTitle className="text-2xl">{item.title}</VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <p className="font-serif text-ink-700 dark:text-parchment-300 leading-relaxed">
                      {item.description}
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <ScrollText className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100">
                Our Journey
              </h2>
              <ScrollText className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500 scale-x-[-1]" />
            </div>
            <p className="font-serif text-xl text-ink-700 dark:text-parchment-300 italic">
              From a simple idea to a literary sanctuary - our story unfolds.
            </p>
          </motion.div>

          <motion.div {...stagger} className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold-leaf-400 dark:bg-gold-leaf-700 hidden md:block" />
            
            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  title: "The Beginning",
                  description: "ReadnEX was born from a love of classic libraries and a vision to preserve the timeless joy of reading in the digital age.",
                  icon: Lightbulb,
                  side: "left"
                },
                {
                  year: "2024",
                  title: "Building the Foundation",
                  description: "Our team of bibliophiles and developers crafted a platform that honors literary tradition while embracing modern innovation.",
                  icon: Library,
                  side: "right"
                },
                {
                  year: "2025",
                  title: "Community Growth",
                  description: "We opened our doors to passionate readers who helped shape ReadnEX into a true literary sanctuary.",
                  icon: Users,
                  side: "left"
                },
                {
                  year: "2025",
                  title: "A New Chapter",
                  description: "ReadnEX stands as a bridge between past and future, welcoming readers from all walks of life. The story continues...",
                  icon: BookOpen,
                  side: "right"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  {...fadeInUp} 
                  className={`flex items-center ${item.side === 'left' ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className={`w-full md:w-5/12 ${item.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                    <VintageCard variant="manuscript" ornate hoverable>
                      <VintageCardHeader>
                        <div className="flex items-center mb-2 gap-3">
                          <Badge className="bg-burgundy-700 text-parchment-100 font-serif">{item.year}</Badge>
                          <div className="p-2 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full">
                            <item.icon className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />
                          </div>
                        </div>
                        <VintageCardTitle className="text-xl">{item.title}</VintageCardTitle>
                      </VintageCardHeader>
                      <VintageCardContent>
                        <p className="font-serif text-ink-700 dark:text-parchment-300 leading-relaxed">
                          {item.description}
                        </p>
                      </VintageCardContent>
                    </VintageCard>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gold-leaf-500 border-4 border-parchment-50 dark:border-ink-950 rounded-full" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Feather className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100">
                Meet the Curators
              </h2>
              <Feather className="h-8 w-8 text-gold-leaf-600 dark:text-gold-leaf-500 scale-x-[-1]" />
            </div>
            <p className="font-serif text-xl text-ink-700 dark:text-parchment-300 italic">
              The devoted bibliophiles and craftsmen behind ReadnEX.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alexandra Chen",
                role: "CEO & Co-Founder",
                bio: "Former librarian and tech entrepreneur with a passion for connecting readers with books.",
                avatar: "/api/placeholder/150/150"
              },
              {
                name: "Marcus Rodriguez",
                role: "CTO & Co-Founder",
                bio: "AI researcher and engineer dedicated to building technology that enhances human experiences.",
                avatar: "/api/placeholder/150/150"
              },
              {
                name: "Sarah Kim",
                role: "Head of Product",
                bio: "Product designer focused on creating intuitive and delightful user experiences for readers.",
                avatar: "/api/placeholder/150/150"
              },
              {
                name: "David Thompson",
                role: "Lead Engineer",
                bio: "Full-stack developer who loves books and believes technology should make reading more accessible.",
                avatar: "/api/placeholder/150/150"
              }
            ].map((member, index) => (
              <motion.div key={index} {...fadeInUp}>
                <VintageCard variant="aged" ornate hoverable className="h-full text-center">
                  <VintageCardHeader>
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-gold-leaf-400 dark:border-gold-leaf-700 shadow-lg">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-800 dark:text-burgundy-300 font-serif">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <VintageCardTitle className="text-xl">{member.name}</VintageCardTitle>
                    <Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 text-gold-leaf-800 dark:text-gold-leaf-300 font-serif mt-2">
                      {member.role}
                    </Badge>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <p className="font-serif text-sm text-ink-700 dark:text-parchment-300 leading-relaxed italic">
                      {member.bio}
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold-leaf-600" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100">
                Our Values
              </h2>
              <div className="h-px w-16 bg-gold-leaf-600" />
            </div>
            <p className="font-serif text-xl text-ink-700 dark:text-parchment-300 italic">
              The guiding principles that shape our literary sanctuary.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Reader-First",
                description: "Every decision we make prioritizes the needs and experiences of our readers."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for the highest quality in everything we build and every interaction we have."
              },
              {
                icon: Users,
                title: "Community",
                description: "We believe in the power of shared stories and the connections they create between people."
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We're constantly exploring new ways to enhance the reading experience through technology."
              },
              {
                icon: Globe,
                title: "Accessibility",
                description: "Great books should be accessible to everyone, regardless of background or ability."
              },
              {
                icon: TrendingUp,
                title: "Growth",
                description: "We believe in continuous learning, both for ourselves and for our community of readers."
              }
            ].map((value, index) => (
              <motion.div key={index} {...fadeInUp}>
                <VintageCard variant="paper" ornate hoverable className="h-full">
                  <VintageCardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full w-16 h-16 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-burgundy-700 dark:text-gold-leaf-500" />
                    </div>
                    <VintageCardTitle className="text-xl">{value.title}</VintageCardTitle>
                  </VintageCardHeader>
                  <VintageCardContent>
                    <p className="font-serif text-center text-ink-700 dark:text-parchment-300 leading-relaxed">
                      {value.description}
                    </p>
                  </VintageCardContent>
                </VintageCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp}>
            <VintageCard variant="manuscript" ornate className="p-6 sm:p-12 md:p-16 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
                <BookOpen className="w-full h-full text-gold-leaf-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <Library className="w-full h-full text-gold-leaf-600" />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ink-900 dark:text-parchment-100">
                Begin Your Literary Journey
              </h2>
              <p className="font-serif text-xl mb-8 text-ink-700 dark:text-parchment-300 max-w-3xl mx-auto leading-relaxed">
                Join our community of passionate readers and experience the timeless joy of discovering your next great book.
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link 
                  to="/register"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800 rounded-sm"
                >
                  <Feather className="h-5 w-5" />
                  Begin Your Journey Today
                </Link>
              </motion.div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 font-serif text-xs sm:text-sm text-ink-600 dark:text-parchment-400">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 bg-forest-600 rounded-full animate-pulse" />
                  Free to join
                </span>
                <span className="hidden sm:inline text-gold-leaf-600">•</span>
                <span className="whitespace-nowrap">Curated recommendations</span>
                <span className="hidden sm:inline text-gold-leaf-600">•</span>
                <span className="whitespace-nowrap">Timeless experience</span>
              </div>
            </VintageCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
