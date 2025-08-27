import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";


//get a particular post
export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    const {id} = await params;
    const [post] = await sql`SELECT posts.id AS id, posts.title AS title, posts.content AS content, posts.created_at AS created_at, users.name AS author, users.image FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ${id}`;
    if(!post) return NextResponse.json({error: "Post not found"}, {status: 404});
    return NextResponse.json(post);
};

//updating post
export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    const {id} = await params;
    const session = await auth();
    if(!session?.user?.id){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    };

    const {title, content} = await req.json();
    const [updated] = await sql`UPDATE posts set title = ${title}, content = ${content} WHERE id = ${id}, user_id = ${session?.user?.id} returning *`;
    if(!updated) return NextResponse.json({error: "Post not found"}, {status: 404});
    return NextResponse.json(updated);
};


//delete post
export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    const {id} = await params;
    const session = await auth();
    if(!session?.user?.id){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    };
    const [deleted] = await sql`DELETE * FROM posts where id = ${id}, user_id = ${session?.user?.id} RETURNING id`;
    if(!deleted) return NextResponse.json({error: "Post not found"}, {status: 404});
    return NextResponse.json({message: "Post deleted"});
}