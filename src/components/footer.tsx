import React from 'react'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

export default function Footer() {
  return (
    <div className='flex flex-row justify-between text-[0.75rem] mt-20'>
        <div>
            <span>© 2024 - Henrique William</span>
        </div>
        <div className='flex gap-2'>
            <span className='flex flex-row items-center'>Me<ExternalLinkIcon className='h-3'/></span>
            <span className='flex flex-row items-center'>GitHub <ExternalLinkIcon className='h-3'/></span>
            <span>Newsletter</span>
        </div>
    </div>
  )
}
