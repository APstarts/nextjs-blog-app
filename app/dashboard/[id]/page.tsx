import React from 'react'

interface PageProps {
  params: {id: string}
};

const page = async ({params}: PageProps ) => {
    const res = await fetch(`http://localhost:3000/api/posts/${params.id}`, {cache: "no-store"});
    if(!res.ok) throw new Error("Failed to fetch post");
    const post = await res.json();
    console.log(post);
  return (
    <div>
      <div className='flex flex-col gap-4 max-w-3xl mx-auto mt-10'>
        <h1 className='text-3xl font-extrabold'>{post.title}</h1>
        <div className='flex gap-3 items-center'>
        <p className='text-gray-400'>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
        <p><span className='text-gray-400'>Author:</span> {post.author}</p>
        {post.image && <img src={post.image} alt={post.author} className='w-10 h-10 rounded-full'/>}
        </div>
        <div dangerouslySetInnerHTML={{__html: post.content}}></div>
      </div>
    </div>
  )
}

export default page