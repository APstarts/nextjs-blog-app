import Link from 'next/link';
import React from 'react'

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    console.log(id);
    const post = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/myposts/${id}`, {cache: 'no-store'});
    if(!post.ok) throw new Error("Failed to fetch posts");
    const posts = await post.json();
  return (
    <div>
        <h1 className='text-3xl font-extrabold text-center mt-10'>Your Posts</h1>
        {posts.map((post: { title: string; content: string; id: string; created_at:string; slug: string }) => (
            <Link key={post.id} href={`/dashboard/${post.slug}`}>
            <div className='max-w-3xl mx-auto px-4 py-2 mb-4 flex justify-between items-center border border-gray-300 rounded-lg hover:shadow-lg duration-300'>
                <p className='text-xl'>{post.title}</p><p>{new Date(post.created_at).toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"})}</p>
            </div>
            </Link>
        ))}
    </div>
  )
}

export default page