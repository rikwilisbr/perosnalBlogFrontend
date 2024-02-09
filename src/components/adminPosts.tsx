import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Suspense, use } from "react"
import axios from "axios"
import Link from "next/link"
import AdminDeleteDialog from "./adminDeleteDialog"

type PostTypes = {
  id: string
  title: string,
  description: string,
  markdown: string
  date: string
}

export function AdminPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const postsData: PostTypes[] = use(axios.get(apiUrl+'/posts').then((res)=> { return res.data.message }))
  
  function FormatName(name: string) {
    const result = name.replace(/ /g, "-");
    return result
  }

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
