import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'

type PostTypes = {
    id: string
    title: string,
    description: string,
    markdown: string
    date: string,
    tags: string[]
    showTags: boolean
  }

export default function PostItem({id, title, description, markdown, date, tags, showTags}: PostTypes) {
  return (
    <div className="flex flex-col ">
        <div className='flex flex-row gap-1'>
          {
            showTags ?
            tags.map((prop, index)=>{
                return (
                  <Link className=' w-[fit-content] text-sm font-semibold hover:border-b-[1px] border-black' href={'/articles/tag/'+prop}>
                    <span key={index}>{prop === 'homepage' ? null : '#'+prop}</span>
                  </Link>
                )
            })
            :
            null
          }
        </div>
        <div className='flex flex-col gap-2'>
          <Link className='w-[fit-content]' href={`/articles/${title.replace(/ /g, "-")}`}>
              <span className="text-2xl w-[fit-content] font-bold hover:border-b border-black cursor-pointer">{title}</span>
          </Link>
          <span className="text text-neutral-500">{description}</span>
          <Link href={`/articles/${title.replace(/ /g, "-")}`} className="flex flex-row items-center gap-2 text-blue-600 hover:text-blue-400 duration-200 mt-2 cursor-pointer w-[fit-content]">
              <span className=" font-semibold">Read this article</span>
              <ArrowRightIcon />
          </Link>
        </div>
        
   </div>                                                                                 
  )
}
