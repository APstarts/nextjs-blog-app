import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "@/auth";

export async function POST(req: Request){
    const session = await auth();
        if(!session?.user?.id){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        };

    try {
        const {title, content} = await req.json();
        console.log(title, content);
        if(!title || !content){
            return NextResponse.json({error: "Title and content are required"}, {status: 400})
        }

        const slug = slugify(title, {lower: true, strict: true});

        //insert into db
        const [newPost] = await sql`INSERT INTO posts (title, content, slug, user_id) VALUES(${title}, ${content}, ${slug}, ${session?.user?.id}) returning *`;
        return NextResponse.json(newPost, {status: 201});
    } catch (error) {
        console.error("Error creating post");
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

//get all posts
export async function GET(req: Request){
    try {
        const posts = await sql`SELECT posts.id AS id, posts.title AS title, posts.content AS content, posts.created_at AS created_at, posts.slug AS slug, users.name AS author, users.image AS image FROM posts JOIN users ON posts.user_id = users.id`;
        if(!posts) return NextResponse.json({error: "No posts found"});
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.error("Error fetching posts");
        return NextResponse.json({error: "Failed to fetch posts"}, {status: 500});
    }
};