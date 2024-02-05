'use client'

import React, { useEffect } from 'react'
import AdminNavBar from '@/components/adminNavBar'
import { Button } from '@/components/ui/button'
import Markdown from 'react-markdown'
import { useState } from 'react'
import remarkGfm from 'remark-gfm'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

type EditPageProps = {
  params : { title: string }
}

export default function EditPost({params}: EditPageProps) {
  const router = useRouter()
  const [markdownData, setMarkdownData] = useState({
    title: '',
    description: '',
    markdown: '',
  })
  const [disabledButton, setDisabledButton] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(()=>{
    const request = async ()=>{
      const paramsName = params.title.replace(/-/g, ' ')
      const response = await axios.get(apiUrl+'/posts/'+paramsName)
      const data = response.data.message
      setMarkdownData((prev)=>{
        return{
          ...prev,
          title: data.title,
          description: data.description,
          markdown: data.markdown,
        }
      })
    }

    request()
  },[])

  useEffect(()=>{
    if(markdownData.title.length === 0 || markdownData.description.length === 0 || markdownData.markdown.length === 0 ){
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }
  },[markdownData])

  function GetMarkDown(event: React.ChangeEvent<HTMLTextAreaElement>){
    const data = event.target.value
    const inputName = event.target.name
    setMarkdownData((prev)=>{
      return{
        ...prev,
        [inputName]: data
      }
    })
  }

  async function SendPost(){
    setLoadingButton(true)
    const token = Cookies.get('token')
    const payload = markdownData
    const paramsName = params.title.replace(/-/g, ' ')
    await axios.put(apiUrl+'/posts/edit/'+paramsName, payload ,{headers: { Authorization: `Bearer ${token}`}})
    .then((res)=> {
      if(res.data.success){
        return router.push('/admin/dashboard')
      } else {
        setLoadingButton(false)
        return alert('error')
      }
     })
  }

  return (
    <div>
        <div className=''>
          <AdminNavBar />
        </div>
        <div className='pt-20 pb-10 px-10 md:px-16'>
          <div className='flex flex-row justify-between mt-2'>
            <span className='font-bold text-2xl'>Edit a Post</span>
            { loadingButton ?
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>  
              : 
              <Button disabled={disabledButton} onClick={SendPost}>Save</Button>
            }
            
          </div>
          <div className='grid grid-rows-2 gap-4 mt-8'>
            <div className='flex flex-col h-full w-auto border rounded-sm'>
              <div className='py-2 px-2 w-full h-2rem border-b-[1px]'>
                <span className='font-bold '>Title</span>
              </div>
              <div className='w-full h-full bg-neutral-100 px-4 py-4'>
                <textarea name='title' onChange={GetMarkDown} value={markdownData.title} placeholder='Type your title here' autoFocus className='outline-none resize-none bg-transparent text-neutral-600 placeholder:text-neutral-400 text-sm h-full w-full'></textarea>
              </div>
            </div>

            <div className='flex flex-col h-full w-auto border rounded-sm'>
              <div className='py-2 px-2 w-full h-2rem border-b-[1px]'>
                <span className='font-bold '>Description</span>
              </div>
              <div className='w-full h-full bg-neutral-100 px-4 py-4'>
                <textarea name='description' onChange={GetMarkDown} value={markdownData.description} placeholder='Type your title here' autoFocus className='outline-none resize-none bg-transparent text-neutral-600 placeholder:text-neutral-400 text-sm h-full w-full'></textarea>
              </div>
            </div>

      
          </div>
          <div className='grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 h-[60dvh] w-full mt-4'>
            <div className='flex flex-col h-full w-auto border rounded-sm'>
              <div className='py-2 px-2 w-full h-2rem border-b-[1px]'>
                <span className='font-bold '>Markdown</span>
              </div>
              <div className='w-full h-full bg-neutral-100 px-4 py-4'>
                <textarea name='markdown' onChange={GetMarkDown} value={markdownData.markdown} placeholder='Type your markdown here' autoFocus className='outline-none resize-none bg-transparent text-neutral-600 placeholder:text-neutral-400 text-sm h-full w-full'></textarea>
              </div>
            </div>
            <div className='h-auto w-auto border overflow-hidden'>
              <div className='py-2 px-2 w-full h-2rem border-b-[1px] '>
                <span className='font-bold '>Preview</span>
              </div>
              <div className='w-full h-full px-4 py-4 prose overflow-auto'>
                  <h1>{markdownData.title}</h1>
                  <p>{markdownData.description}</p>
                  <Markdown remarkPlugins={[remarkGfm]}>{markdownData.markdown}</Markdown>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
