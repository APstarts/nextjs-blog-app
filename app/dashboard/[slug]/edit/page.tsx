import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import EditForm from './EditForm'

const EditPage = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();
  const url = process.env.NEXTAUTH_URL || "https://nextjs-blog-app-sooty.vercel.app" || window.location.origin
  if (!session) redirect('/login')

  const res = await fetch(`${url}/api/posts/${params.slug}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch post')

  const post = await res.json()
  if (post.userid !== session.user?.id) redirect('/dashboard')

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <EditForm post={post} />
    </div>
  )
}

export default EditPage
