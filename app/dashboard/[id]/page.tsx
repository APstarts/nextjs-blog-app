

export const revalidate = 60; // regenerate page every 60s


const PostPage = async ({ params }: {params: Promise<{id: string}>}) => {
  const baseUrl = process.env.NEXTAUTH_URL || window.location.origin;
  const {id} = await params;
  const res = await fetch(`${baseUrl}/api/posts/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch post");
  const post = await res.json();

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
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
        <p className="text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostPage;
