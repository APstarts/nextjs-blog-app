import { auth } from '@/auth'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();

    if(!session || !session.user) {
        redirect("/"); //redirect to home page if not logged in
    }
  return (
    <div>Welcome to the dashboard
        <Link href="/dashboard/first-article">Go to first article</Link>
    </div>
  )
}

export default page