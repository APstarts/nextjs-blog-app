import { auth } from "@/auth";
import { sql } from "@/lib/db";


//get all posts for a particular user
export async function GET(req: Request, {params}: {params: Promise<{id: string}>}){
  const {id} = await params;
  const [post] = await sql`SELECT posts.id AS id, posts.title AS title, posts.content AS content, posts.created_at AS created, posts.slug AS slug, users.name AS author WHERE posts.user_id = users.id`
};