import React from 'react'
import { signIn, signOut, auth } from "@/auth"
import Link from 'next/link';
import NavbarClient from './NavbarClient';

const Navbar = async () => {
    const session = await auth();
    const id = session?.user?.id;
  return (
    <div className='flex justify-between bg-amber-100 dark:bg-gray-900 dark:text-white py-5'>
        <div className='flex items-center'>
          <NavbarClient sessionId={id} />
            <Link href="/dashboard"><p className='text-2xl font-extrabold pl-5'>The Equity Research Repository</p></Link>
        </div>
        <div className='flex  justify-center items-center pr-5 space-x-4'>
            {session && session?.user ? (
                <>
                    <span>Welcome, {session?.user?.name}</span>
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/" })
                    }}>
                        <button className=' bg-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white cursor-pointer text-black p-2 rounded-md' type="submit">Sign Out</button>
                    </form>
                </>
            ) : (
            <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
            }}>
                <button className=' bg-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white cursor-pointer text-black p-2 rounded-md' type="submit">Sign in with Google</button>
            </form>

            )}
        </div>
    </div>
  )
}

export default Navbar