import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex flex-row gap-4 h-auto pb-10 border-b-[1px] border-neutral-300">
        <div className="w-[120px]">
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
          
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="font-jetbrains-mono font-bold text-2xl">Interlude</span>
            <span>A blog by Henrique William.</span>
          </div>
          <nav>
            <ul className="flex flex-row gap-4 text-sm font-jetbrains-mono">
              <li className="cursor-pointer font-bold">Home</li>
              <li className="cursor-pointer text-neutral-500 hover:text-neutral-800 duration-200">Posts</li>
              <li className="cursor-pointer text-neutral-500 hover:text-neutral-800 duration-200">About</li>
            </ul>
          </nav>
        </div>
      </header>
  )
}
