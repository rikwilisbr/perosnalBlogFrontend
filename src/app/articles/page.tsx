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

async function getData(){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(apiUrl+'/posts',{
    next:{
      revalidate: 30
    }
  })
  return res.json()
} 

export default async function Posts() {

  const postsData = await getData()
  const data = postsData.message

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted={'posts'} />
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
