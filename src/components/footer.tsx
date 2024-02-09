import React from 'react'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='flex flex-row justify-between text-[0.75rem] mt-20'>
        <div>
            <span>© 2024 - Henrique William</span>
        </div>
        <div className='flex gap-2'>
          <Link href='https://henriquewilliam.me' target='_blank'>
            <span className='flex flex-row items-center'>Me<ExternalLinkIcon className='h-3'/></span>
          </Link>
          <Link href='https://github.com/rikwilisbr' target='_blank'>
            <span className='flex flex-row items-center'>GitHub <ExternalLinkIcon className='h-3'/></span>
          </Link>
          <Link href='/newsletter'>
            <span>Newsletter</span>
          </Link>
        </div>
    </div>
  )
}
