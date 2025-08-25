import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from "./lib/db"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
 async signIn({ profile }) {
  
  try {
    await sql`INSERT INTO users (email, name, image) VALUES (${profile?.email ?? ""}, ${profile?.name ?? ""}, ${profile?.picture ?? null}) 
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image`
  } catch (error) {
    console.error("Error inserting user: ", error);
  }
  return true;
 },
 async session({session}){
  if(session?.user?.email){
    try{
      const rows = await sql`SELECT id FROM users WHERE email = ${session?.user?.email}`;
      if(rows.length > 0){
        (session.user as any).id = rows[0].id;
      }
    } catch (err) {
      console.error("Error fetching user id: ", err);
    }
  }
  return session;
 }
}
})