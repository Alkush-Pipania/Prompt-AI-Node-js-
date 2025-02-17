"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Customer Insights Report",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          This report provides an analysis of customer feedback across various segments and time periods. The data
          presented offers insights into our current performance and customer satisfaction levels.
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Users</p>
            <p className="text-2xl font-bold">23,000</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">NPS score</p>
            <p className="text-2xl font-bold">80</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Projects</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Notes</p>
            <p className="text-2xl font-bold">465</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Usage Analytics",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Track your team&apos;s usage patterns and optimize your workflow with detailed analytics and insights.
        </p>
        <div className="h-40 rounded-lg bg-gray-100"></div>
      </div>
    ),
  },
  {
    title: "Performance Metrics",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Monitor key performance indicators and measure the impact of AI assistance on your team&apos;s productivity.
        </p>
        <div className="h-40 rounded-lg bg-gray-100"></div>
      </div>
    ),
  },
]

export function SliderSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide]) // Added nextSlide to dependencies

  return (
    <div className="relative h-full rounded-xl bg-gray-50 p-8">
      <div className="absolute left-4 right-4 top-4 flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <p className="rounded-lg bg-gray-200 px-4 py-2 text-sm">
          Claude, create a report to analyze product usage and user feedback.
        </p>
      </div>
      <div className="mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 text-xl font-semibold">{slides[currentSlide].title}</h3>
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <div className="absolute bottom-8 right-8 flex gap-2">
        <Button size="icon" variant="outline" onClick={prevSlide}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={nextSlide}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

