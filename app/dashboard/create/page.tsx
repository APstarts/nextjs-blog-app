"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Tiptap from "@/components/Tiptap";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // editor output
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    console.log(title, content)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }), // now sending HTML as we are taking the content with html tags from the tiptap editor
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json(); // Assuming the API returns the created post with its ID
      router.push(`/dashboard/${newPost.id}`); // Redirect to the new post's page using its ID in the parameter.
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating the post!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        {/* Tiptap editor */}
        <Tiptap onChange={setContent}/>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
