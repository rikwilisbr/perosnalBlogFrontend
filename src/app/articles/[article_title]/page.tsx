import axios from "axios";
import { use } from "react";
import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Markdown from "react-markdown";




type EditPageProps = {
    params : { article_title: string }
  }

export default function ArticlePage({params}: EditPageProps) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const titleName = params.article_title.replace(/-/g, " ")
  const postData = use(axios.get(apiUrl+'/posts/'+titleName).then((res)=> { return res.data.message }))

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted=""/>
      <div className="flex flex-col gap-8 mt-10 w-full">
        <div className="prose">
            <div className="flex flex-col justify-between">
                <h1>{postData.title}</h1>
                <span className="mt-3 font-semibold text-sm pr-2">{postData.date}</span>
            </div>
            <p>{postData.description}</p>
            <Markdown>{postData.markdown}</Markdown>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
