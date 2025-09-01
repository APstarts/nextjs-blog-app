import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 60; // regenerate page every 60s

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const session = await auth();
  const url = process.env.NEXTAUTH_URL;
  const res = await fetch(`${url}/api/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  const post = await res.json();

  return (
    <div className="relative max-w-3xl mx-auto mt-10 px-4">
      {post.userid === session?.user?.id &&(
        <form
        action={async () => {
          "use server";
          const cookieStore = cookies();
          await fetch(`${url}/api/posts/${post.slug}`, {
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
      {post.userid === session?.user?.id && (
        <form action={async () => {
        "use server";
        redirect(`/dashboard/${post.slug}/edit`);
      }}>
        <button
          className="absolute top-20 right-20 bg-gray-700 hover:bg-blue-400 cursor-pointer hover:shadow-lg text-white p-2 rounded-md"
          type="submit"
        >
          Edit
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
      <div className="prose max-w-none
    [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:pl-6
    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
    [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto
    [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
