'use client'

import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator,  DropdownMenuItem} from './ui/dropdown-menu'
import axios from 'axios'


export default function AdminAvatarDropdown() {
  async function Logout() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    await axios.get(apiUrl+'/auth/logout', {withCredentials: true})
    .then(()=> window.location.reload())
    .catch(()=> alert('logout error'))
  }

  return (
        <DropdownMenu >
            <DropdownMenuTrigger className='outline-none flex flex-row gap-2 items-center'>
                <Avatar className='select-none' >
                    <AvatarFallback>HW</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-16'>
                <DropdownMenuLabel>henriquewilliamstos@gmail.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={Logout}>
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}
