'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichEditor from '@/components/RichEditor'

const EditForm = ({ post }: { post: any }) => {
  const [content, setContent] = useState(post.content)
  const [title, setTitle] = useState(post.title)
  const router = useRouter()
  const url = process.env.NEXTAUTH_URL || "https://nextjs-blog-app-sooty.vercel.app" || window.location.origin;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${url}/api/posts/${post.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    const updatedPost = await res.json()
    if (!res.ok) {
      alert(updatedPost.error || 'Failed to update post')
      return
    }
    router.push(`/dashboard/${updatedPost.slug}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSave}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />
      <RichEditor content={content} onChange={setContent} />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  )
}

export default EditForm
