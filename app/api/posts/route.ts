import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request){
    try {
        const {title, content} = await req.json();
        if(!title || !content){
            return NextResponse.json({error: "Title and content are required"}, {status: 400})
        }

        const slug = slugify(title, {lower: true, strict: true});

        //insert into db
        const [newPost] = await sql`INSERT INTO posts (title, content, slug) VALUES(${title}, ${content}, ${slug}) returning *`;
        return NextResponse.json(newPost, {status: 201});
    } catch (error) {
        console.error("Error creating post");
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}