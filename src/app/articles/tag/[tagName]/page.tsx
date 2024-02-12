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

type ArticleTagParamTypes = {
    params:{
        tagName: string
    }
}

async function getData(url:string){
  const res = await fetch(url,{
    next:{
      revalidate: 30
    }
  })
  return res.json()
} 

export default async function ArticleTag({params}: ArticleTagParamTypes) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const tagName = params.tagName
  const postsData = await getData(apiUrl+'/posts/tag/'+tagName)
  const data = postsData.message

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted={''} />
      <div className="flex flex-col gap-8 mt-10 w-full">
        {
          data.map((prop: PostTypes, index: number)=>{
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
