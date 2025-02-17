"use client"

import { motion } from "framer-motion"
import { AuthForm } from "./login-form"
import { SliderSection } from "./slider-section"
import { Logo } from "@/components/global/logo"

export function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 transform blur-[120px] rounded-full bg-purple-500 md:h-96 md:w-96" />
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-2 md:gap-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col justify-center space-y-8"
        >
          <div className="space-y-6">
            <Logo />
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-text-shady md:text-5xl lg:text-6xl">
                Think it
                <br />
                We prompt it
              </h1>
              <p className="text-lg text-gray-400">Privacy-first AI that speaks your mind.</p>
            </div>
          </div>
          <AuthForm type="login" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 hidden md:block"
        >
          <SliderSection />
        </motion.div>
      </div>
    </div>
  )
}

