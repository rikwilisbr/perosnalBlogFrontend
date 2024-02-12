import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Markdown from "react-markdown";

type EditPageProps = {
    params : { article_title: string }
  }

async function getData(url:string){
  const res = await fetch(url,{
    next:{
      revalidate: 30
    }
  })
  return res.json()
}

export default async function ArticlePage({params}: EditPageProps) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const titleName = params.article_title.replace(/-/g, " ")
  const postsData = await getData(apiUrl+'/posts/'+titleName)
  const data = postsData.message

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted=""/>
      <div className="flex flex-col gap-8 mt-10 w-full">
        <div className="prose">
            <div className="flex flex-col justify-between">
                <h1>{data.title}</h1>
                <span className="mt-3 font-semibold text-sm pr-2">{data.date}</span>
            </div>
            <p>{data.description}</p>
            <Markdown>{data.markdown}</Markdown>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
