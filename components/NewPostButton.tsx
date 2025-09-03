import Link from 'next/link'
import React from 'react'

const NewPostButton = () => {
  return (
    <Link href="/dashboard/create">
        <button className="fixed bottom-4 right-4 hover:bg-gray-700 hover:text-white text-black cursor-pointer p-4 border border-black duration-300 rounded-full shadow-lg z-50">
            + New Post
        </button>
    </Link>


  )
}

export default NewPostButton