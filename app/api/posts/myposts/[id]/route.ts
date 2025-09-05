import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    try {
        const posts = await sql`SELECT * FROM posts WHERE posts.user_id = ${id}`;
        if(!posts) return NextResponse.json({message: "No posts found"}, {status: 401});
        return NextResponse.json(posts)
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "error fetching posts"}, {status: 500})
    }
}