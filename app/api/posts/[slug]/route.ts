import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";




//get a particular post
export async function GET(req: NextRequest, {params}: {params: Promise<{slug: string}>}){
    const {slug} = await params;
    const [post] = await sql`SELECT posts.id AS id, posts.title AS title, posts.content AS content, posts.created_at AS created_at,posts.slug AS slug, users.name AS author, users.image, users.id AS userId FROM posts JOIN users ON posts.user_id = users.id WHERE posts.slug = ${slug}`;
    if(!post) return NextResponse.json({error: "Post not found"}, {status: 404});
    return NextResponse.json(post);
};

//updating post
export async function PUT(req: NextRequest, {params}: {params: Promise<{slug: string}>}){
    const {slug} = await params;
    const session = await auth();
    if(!session?.user?.id){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    };

    const {title, content} = await req.json();
    const [updated] = await sql`UPDATE posts set title = ${title}, content = ${content} WHERE slug = ${slug} AND user_id = ${session?.user?.id} returning *`;
    if(!updated) return NextResponse.json({error: "Post not found"}, {status: 404});
    return NextResponse.json(updated);
};


//delete post
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  console.log(slug);
  const session = await auth();
  console.log(`user id is: ${session?.user?.id}`)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Correct SQL delete syntax
  const [deleted] =
    await sql`DELETE FROM posts WHERE slug = ${slug} AND user_id = ${session.user.id} RETURNING *`;

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Post deleted" });
}
