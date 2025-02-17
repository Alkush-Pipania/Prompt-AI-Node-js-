"use client"
import React, { useEffect, useState } from 'react'
import { Section2 } from '@/components/global/Section'
import { LoginPage } from './_components/LoginSection'



const Login = () => {
  const [loading , setLoading] = useState<boolean>(true)
  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
      window.location.href = '/chat/new'
    }
    setLoading(false)
  },[])
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <section className='flex-col items-center justify-center'>
       {/* slider..  */}
      <LoginPage/>
      <Section2/>
    </section>
  )
}

export default Login