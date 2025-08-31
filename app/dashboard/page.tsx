import { auth } from "@/auth";
import NewPostButton from "@/components/NewPostButton";
import ArticlePrevCard from "@/components/ArticlePrevCard";

// Define the Post type and its properties
type Post = {
  id: string;
  title: string;
  author: string;
  slug:string;
  created_at: string; // or Date
  image?: string;     // optional if images might be missing
};


export const revalidate = 60; // ISR: regenerate page every 60s this is to make sure that if any new post is added it will be reflected on the dashboard page without needing to restart the server. and the overall performance will not be affected as it will only regenerate the page once in 60 seconds.

const DashboardPage = async () => {
  const session = await auth();
  const url = process.env.NEXTAUTH_URL || "https://nextjs-blog-app-sooty.vercel.app" || window.location.origin
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Fetch posts directly from DB
  const res = await fetch(`${url}/api/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();

  return (
    <div className="px-4 md:px-30 py-6">
      <h1 className="text-center text-3xl font-extrabold">
        Welcome to the repository of Equity Researches
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {posts.map((post: Post) => (
          <ArticlePrevCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            author={post.author}
            createdAt={post.created_at}
            image={post.image}
          />
        ))}
      </div>

      <NewPostButton />
    </div>
  );
};

export default DashboardPage;
