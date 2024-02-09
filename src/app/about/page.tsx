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

export default function Home() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted={'about'} />
      <div className="flex flex-col mt-8 w-full prose">
        <h1>About</h1>
        <span>Hello! I'm Henrique William, a developer from Brazil.</span>
        <span className="mt-4">Most of the code I write runs in a browser, but I also have a lot code running API's.</span>
        <span className="mt-4">This website was designed to document my journey as developer. It was built using <a href="https://nextjs.org/" target="blank">Next</a> and <a href="https://nestjs.com/" target="blank">Nest</a>.
        Posts are written in Markdown, and the site is hosted on Vercel.
        </span>

        <span className="mt-4">If you wanna talk to me, feel free to <a href="mailto:henriquewilliamstos@gmail.com">send an email</a>.</span>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
