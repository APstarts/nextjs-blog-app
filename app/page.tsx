import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  return (
    <>
    <main>
      <div className="flex flex-col md:grid md:grid-cols-2">
        <div className=" h-screen flex flex-col justify-center items-center">
          <div className="space-y-5 px-20">
            <h1 className="text-3xl font-extrabold uppercase">My equity research report repository</h1>
            <p className="text-gray-600">Every research report is being personally prepared by me. The reports may not be in the industry standard format. Just the rough notes on my research of companies. I write what I find important in perspective.</p>
          </div>
        </div>
        <div className=" h-screen">
          <Image src={`/generated-image-removebg-preview.png`} alt="research-report-photo" width={500} height={500} className="mx-auto my-20"/>
        </div>
      </div>
    </main>
    </>
  );
}
