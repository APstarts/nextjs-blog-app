import React from 'react'

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    console.log(id);
    const post = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/myposts/${id}`, {cache: 'no-store'});
    if(!post.ok) throw new Error("Failed to fetch posts");
    const posts = await post.json();
    console.log(posts);
  return (
    <div>
        <h1 className='text-3xl font-extrabold text-center mt-10'>Your Posts</h1>
        {posts.map((post: { title: string; content: string; id: string; created_at:string }) => (
            <div key={post.id} className='max-w-3xl h-20 mx-auto mt-10 px-4 flex justify-between items-center border border-gray-300'>
                <p className='text-2xl font-bold mb-5'>{post.title}</p><p>{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
        ))}
    </div>
  )
}

export default page