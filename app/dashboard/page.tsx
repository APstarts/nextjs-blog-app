import { auth } from "@/auth";
import NewPostButton from "@/components/NewPostButton";
import ArticlePrevCard from "@/components/ArticlePrevCard";

export const revalidate = 60; // ISR: regenerate page every 60s

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Fetch posts directly from DB
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();

  return (
    <div className="px-4 md:px-10 py-6">
      <h1 className="text-center text-3xl font-extrabold">
        Welcome to the repository of Equity Researches
      </h1>

      <div className="flex flex-wrap gap-4 mt-6">
        {posts.map((post: any) => (
          <ArticlePrevCard
            key={post.id}
            id={post.id}
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
