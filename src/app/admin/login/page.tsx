'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState, useEffect, ChangeEvent } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { IsEmailValid } from "@/lib/utils"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

type FormTypes = {
    email: string,
    password: string
}

export default function AdminAuth() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()

  useEffect(()=>{
    if(form.email.length !== 0 && form.password.length !== 0 && form.password.length >=3){
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  },[form])
  
  async function SendLogin(){
    setIsLoading(true)
    setErrorMessage('')
    if(!IsEmailValid(form.email)){
        setErrorMessage("Email don't have a valid format")
        setIsLoading(false)
        return
    }
    const payload: FormTypes = {
        email: form.email,
        password: form.password
    }

    await axios.post(apiUrl+'/auth/login', payload, { withCredentials: true })
    .then((response) => {
        const setCookieHeader = response.headers['set-cookie']
        if (setCookieHeader) {
            setCookieHeader.forEach(cookie => {
                const [name, value] = cookie.split(';')[0].split('=');
                Cookies.set(name.trim(), value.trim(), { expires: 7, path: '/' });
            });
        }
        router.push('/admin/dashboard');
    })
    .catch((error) => {
        if(error.response.data){
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
        }
    })
  
  }

  function handleInputs(event: ChangeEvent<HTMLInputElement>){
    const {id, value} = event.target
    setForm((prev)=>{
        return {
            ...prev,
            [id]: value
        }
    })
  }

  return (
    <div className="w-[100dvw] h-[100dvh] px-[25vw]  md:px-[30dvw] lg:px-[35dvw] py-60">
        <div className="flex flex-col gap-2 text-center">
            <span className="text-3xl font-bold">Admin Login</span>
            <span className="text-neutral-500">Enter your credentials to login as admin</span>
            <span className="text-red-500 text-sm">{errorMessage}</span>
            <div className="mt-4">
                <form className="flex flex-col gap-2 text-start" onSubmit={(e)=> e.preventDefault()}>
                    <div className="space-y-1">
                    <Input onChange={handleInputs} id="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-1">
                    <Input type="password" onChange={handleInputs} id="password" placeholder="password"/>
                    </div>
                    {
                    isLoading ?
                    <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </Button>  
                    : 
                    <Button type="submit" disabled={isDisabled} onClick={SendLogin} className="mt-8">Login</Button> 
                    }
                </form>
                
            </div>
        </div>
    </div>
  )
}
