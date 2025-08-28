import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 60; // regenerate page every 60s

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const session = await auth();
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  const post = await res.json();
  console.log(`post user id is: ${post.userid} and type is ${typeof post.userid}`);
  console.log(`session user id is: ${session?.user?.id} and type is ${typeof session?.user?.id}`);

  return (
    <div className="relative max-w-3xl mx-auto mt-10 px-4">
      {post.userid === session?.user?.id &&(
        <form
        action={async () => {
          "use server";
          const cookieStore = cookies();
          await fetch(`http://localhost:3000/api/posts/${post.slug}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              Cookie: cookieStore.toString(),
            }
          });

          redirect("/dashboard");
          
        }}
      >
        <button
          className="absolute top-20 right-2 bg-gray-700 hover:bg-red-400 cursor-pointer hover:shadow-lg text-white p-2 rounded-md"
          type="submit"
        >
          Delete
        </button>
      </form>
      )}
      
      <h1 className="text-3xl font-extrabold">{post.title}</h1>
      <div className="flex items-center gap-3 mt-2 mb-6">
        {post.image ? (
          <img
            src={post.image}
            alt={post.author}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {post.author[0]}
          </div>
        )}
        <p className="text-gray-400">By {post.author}</p>
        <p className="text-gray-400">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
