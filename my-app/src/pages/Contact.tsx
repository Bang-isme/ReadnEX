import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Feather,
  ScrollText
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { VintageCard, VintageCardContent, VintageCardHeader, VintageCardTitle } from "../components/ui/vintage-card"
import VintagePageHeader from "../components/VintagePageHeader"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-parchment-50 dark:bg-ink-950">
      {/* Hero Section */}
      <VintagePageHeader
        badge="Get In Touch"
        title="We'd Love to Hear From You"
        subtitle="Have questions about ReadnEX? Want to share feedback? Or just want to say hello? We're here to help and would love to connect with you."
        quote={{
          text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
          author: "George R.R. Martin"
        }}
      />

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <VintageCard variant="aged" ornate className="h-full">
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    Send us a Message
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your question, feedback, or how we can help..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif" 
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </VintageCardContent>
              </VintageCard>
            </motion.div>

            {/* Contact Information */}
            <motion.div {...fadeInUp} className="space-y-8">
              <VintageCard variant="aged" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Feather className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    Get in Touch
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      description: "Drop us an email anytime",
                      contact: "hello@bookquest.com",
                      color: "text-blue-600"
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      description: "Speak with our team",
                      contact: "+1 (555) 123-4567",
                      color: "text-green-600"
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      description: "Come say hello",
                      contact: "123 Book Street, Reading City, RC 12345",
                      color: "text-red-600"
                    },
                    {
                      icon: Clock,
                      title: "Business Hours",
                      description: "When we're available",
                      contact: "Mon-Fri: 9AM-6PM EST",
                      color: "text-purple-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-parchment-50 dark:bg-ink-800 rounded-lg border border-parchment-300 dark:border-ink-700">
                      <div className="p-3 rounded-full bg-gold-leaf-100 dark:bg-gold-leaf-900/30">
                        <item.icon className="h-6 w-6 text-burgundy-700 dark:text-gold-leaf-500" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-ink-900 dark:text-parchment-100">{item.title}</h3>
                        <p className="font-serif text-sm text-ink-600 dark:text-parchment-400 mb-1">{item.description}</p>
                        <p className="font-serif text-ink-900 dark:text-parchment-100 font-medium">{item.contact}</p>
                      </div>
                    </div>
                  ))}
                </VintageCardContent>
              </VintageCard>

              {/* Office Hours */}
              <VintageCard variant="manuscript" ornate>
                <VintageCardHeader>
                  <VintageCardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gold-leaf-600 dark:text-gold-leaf-500" />
                    Office Hours
                  </VintageCardTitle>
                </VintageCardHeader>
                <VintageCardContent>
                  <p className="font-serif text-ink-700 dark:text-parchment-300 leading-relaxed">
                    We respond to all inquiries within 24 hours during business days. For urgent matters, please indicate "URGENT" in your message subject.
                  </p>
                </VintageCardContent>
              </VintageCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-parchment-50 dark:bg-ink-950">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp}>
            <VintageCard variant="manuscript" ornate className="p-16 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
                <ScrollText className="w-full h-full text-gold-leaf-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
                <MessageSquare className="w-full h-full text-gold-leaf-600" />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-ink-900 dark:text-parchment-100">
                Need Answers Quickly?
              </h2>
              <p className="font-serif text-xl mb-8 text-ink-700 dark:text-parchment-300 max-w-3xl mx-auto">
                Can't find what you're looking for? Check out our FAQ page for quick answers to common questions.
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/faq"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-burgundy-700 hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 text-parchment-50 font-serif text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-burgundy-900 dark:border-burgundy-800 rounded-sm"
                >
                  <MessageSquare className="h-5 w-5" />
                  View Frequently Asked Questions
                </Link>
              </motion.div>
            </VintageCard>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
