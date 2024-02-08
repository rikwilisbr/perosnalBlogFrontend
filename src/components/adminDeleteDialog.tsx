'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import Cookies from "js-cookie"


type DeleteDialogPropTypes = {
    postId: string
}

export default function AdminDeleteDialog({ postId } : DeleteDialogPropTypes) {
    const [isLoading, setIsLoading] = useState(false)

    async function DeletePost(){
        setIsLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const token = Cookies.get('token')
        const response = await axios.delete(apiUrl+'/posts/delete/'+postId, {withCredentials: true})
        if(response.data.success){
            window.location.reload()
        } else {
            alert('bad request, or post not found')
            setIsLoading(false)
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant='destructive'>Delete</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your post
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 md:gap-0">
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                {
                    isLoading ?
                    <Button variant='destructive' disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </Button> 
                    :
                    <Button onClick={DeletePost} variant='destructive'>Delete</Button>
                }
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
