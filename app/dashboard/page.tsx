import { auth } from '@/auth'
import ArticlePrevCard from '@/components/ArticlePrevCard';
import NewPostButton from '@/components/NewPostButton';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();
    if(!session || !session.user) {
        redirect("/"); //redirect to home page if not logged in
    }
    const res = await fetch("http://localhost:3000/api/posts", {cache: "no-store"});
    if(!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();
  return (
    <>
    <div className='px-50 flex flex-col'>
      <h1 className='text-center text-3xl font-extrabold'>Welcome to the repository of Equity Researches</h1>
      <div className='flex flex-wrap gap-4 mt-5'>
        {posts.map((post: any) => (
          <ArticlePrevCard key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            createdAt={post.created_at}
            image={post.image}/>

        ))}
      </div>
        
    </div>
    <NewPostButton />
    </>
  )
}

export default page