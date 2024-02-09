import axios from "axios";
import { use } from "react";
import PostItem from "@/components/postItem";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";


type PostTypes = {
  id: string
  title: string,
  description: string,
  markdown: string,
  date: string,
  tags: string[]
}

export default function Posts() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const postsData: PostTypes[] = use(axios.get(apiUrl+'/posts').then((res)=> { return res.data.message }))

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted={'posts'} />
      <div className="flex flex-col gap-8 mt-10 w-full">
        {
          postsData.map((prop, index)=>{
            return (
              <div key={index}>
                <PostItem 
                  id={prop.id}
                  title={prop.title}
                  description={prop.description}
                  markdown={prop.markdown}
                  date={prop.date}
                  tags={prop.tags}
                  showTags={true}
                />
              </div>
            )
          }).reverse()
        }
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
