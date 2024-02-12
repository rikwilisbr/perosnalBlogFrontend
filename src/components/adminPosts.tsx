import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Suspense } from "react"
import Link from "next/link"
import AdminDeleteDialog from "./adminDeleteDialog"

type PostTypes = {
  id: string
  title: string,
  description: string,
  markdown: string
  tags: string[]
  date: string
}

async function getData(){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(apiUrl+'/posts',{
    next:{
      revalidate: 1
    }
  })
  return res.json()
} 

export default async function AdminPosts() {
  
  const postsData = await getData()
  const data = postsData.message
  function FormatName(name: string) {
    const result = name.replace(/ /g, "-");
    return result
  }

  return (
    <div className="gap-8 justify-center border rounded-md ">
    
      <Suspense fallback={<div>loading...</div>} >
        {
           data.map((prop: PostTypes, index: number)=>{
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
                      <CardFooter className="flex gap-2">
                        <Link href={`/admin/dashboard/edit/${FormatName(prop.title)}`}>
                          <Button>Edit</Button>
                        </Link>
                        <AdminDeleteDialog postId={prop.id} />
                      </CardFooter>
                  </Card>
                  <div className="w-full h-[1px] bg-neutral-200"></div>
                </div>
              )
          }).reverse()
        } 
      </Suspense>
    </div>
  )
}
