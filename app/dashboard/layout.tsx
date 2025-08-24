import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';

const layout = async ({children}:{children: React.ReactNode}) => {
    const session = await auth();
    if(!session || !session.user) {
        redirect("/"); //redirect to home page if not logged in
    }
  return (
    <>
    {children}
    </>
  )
}

export default layout