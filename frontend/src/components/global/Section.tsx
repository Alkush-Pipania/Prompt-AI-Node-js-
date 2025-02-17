"use client"
import React from 'react'
import TitleSection from './Titlesection'
import { FeaturesSection } from './Feature'


export function Section2() {
  return (
    <div className='h-screen my-4 px-4 gap-y-4 flex flex-col items-center'>
      <div className="absolute -z-10 sm:left-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transform blur-[120px] rounded-full bg-primary-blue-400 w-52 h-32 sm:w-48 sm:h-96" />

      <TitleSection
        pill='Ai Powered'
        title='Transform Your Thoughts into REality'
        subheading='We are a team of talented designers making websites with Bootstrap'
      />
      <FeaturesSection/>
    </div>
  )
}

