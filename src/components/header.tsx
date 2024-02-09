import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({IsHighLighted}: {IsHighLighted: string}) {
  return (
    <header className="flex flex-row gap-4 h-auto pb-10 border-b-[1px] border-neutral-300">
        <div className="w-[120px]">
          <Link href='/'>
            <AspectRatio ratio={4 / 4}>
              <Image className="h-full w-full object-cover border border-neutral-500"
                src='/images/image.png'
                width={200}
                height={200}
                alt='logo'
                priority={true}
                quality={100}
              />
            </AspectRatio>
          </Link>
          
          
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="font-jetbrains-mono font-bold text-2xl">Interlude</span>
            <span>A blog by Henrique William.</span>
          </div>
          <nav>
            <ul className="flex flex-row gap-4 text-sm font-jetbrains-mono">
              <Link href={'/'}>
                <li className={IsHighLighted === 'home' ? "cursor-pointer font-bold" : "cursor-pointer text-neutral-500 hover:text-neutral-800 duration-200"}>Home</li>
              </Link>
              <Link href={'/articles'}>
                <li className={IsHighLighted === 'posts' ? "cursor-pointer font-bold" : "cursor-pointer text-neutral-500 hover:text-neutral-800 duration-200"} >Posts</li>
              </Link>
              <Link href={'/about'}>
                <li className={IsHighLighted === 'about' ? "cursor-pointer font-bold" : "cursor-pointer text-neutral-500 hover:text-neutral-800 duration-200"}>About</li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
  )
}
