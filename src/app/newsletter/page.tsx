import Header from "@/components/header";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function NewsletterPage() {

  return (
    <div className="flex flex-col py-[4rem] px-4 max-w-prose m-auto relative font-sans">
        <Header IsHighLighted={'posts'} />
        <Newsletter />
        <Footer />
    </div>
  );
}
