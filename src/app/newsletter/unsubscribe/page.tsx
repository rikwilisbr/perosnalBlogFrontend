'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setIsSuccessMessage] = useState('')
  const [error, setError] = useState(false)

  async function Unsubscribe(){
   setIsLoading(true)
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   const response = await axios.delete(`${apiUrl}/newsletter/unsubscribe/${email}`)
   
   if(response.data.success){
    setIsLoading(false)
    setIsSuccessMessage(response.data.message)
    setError(false)
   } else {
    setIsLoading(false)
    setIsSuccessMessage(response.data.message)
    setError(true)
   }
  } 

  function GetEmail(e: React.ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value)
  }

  return (
    <center>
     <div className='flex flex-col gap-4 border border-gray-300 rounded-sm mt-52 bg-gray-200 text-center py-6 px-20 max-w-prose'>
        <span className={error ? 'text-sm text-red-600' : 'text-sm text-green-600'}>{successMessage}</span>
        <span className='font-bold text-lg'>Newsletter Unsubscribe</span>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className='flex flex-col md:flex-row gap-1'>
              <Input onChange={GetEmail} placeholder='Email address' className='bg-white outline-none border border-neutral-300'/>
              {
                isLoading ?
                <Button disabled>
                    <ReloadIcon className="mr-2 animate-spin" /> Please wait
                </Button>
                :
                <Button onClick={Unsubscribe}>Unsubscribe</Button>
              }
              
          </div>
        </form>
        <span className='text-sm opacity-60'>I'm sorry to see you go. If there's anything I could have done better, I'd love to hear your feedback. Thank you for being a part of my history.</span>
     </div>
    </center>
  )
}