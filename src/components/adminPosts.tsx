import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Suspense, use } from "react"
import { cookies } from "next/headers"
import axios from "axios"

type PostTypes = {
  id: string
  title: string,
  description: string,
  markdown: string
  date: string
}

export function AdminPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const token = cookies().get('token')
  console.log(token)
  const postsData: PostTypes[] = use(axios.get(apiUrl+'/posts', {headers: { Authorization: `Bearer ${token?.value}`}}).then((res)=> { return res.data.message }))

  return (
    <div className="gap-8 justify-center border rounded-md ">
    
      <Suspense fallback={<div>loading...</div>} >
        {
          postsData.map((prop, index)=>{
              return(
                <div key={index}>
                  <Card className="w-full rounded-none border-[0px]">
                      <CardHeader>
                          <CardTitle>{prop.title}</CardTitle>
                          <CardDescription>{prop.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <span className="text-sm text-neutral-500">{prop.description}</span>
                      </CardContent>
                      <CardFooter className="flex">
                          <Button>Edit</Button>
                      </CardFooter>
                  </Card>
                  <div className="w-full h-[1px] bg-neutral-200"></div>
                </div>
              )
          })
        } 
      </Suspense>
      
      
       
    </div>
  )
}
