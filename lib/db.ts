// lib/db.ts
import { sql, type QueryResultRow } from "@vercel/postgres";

/**
 * Run parameterized queries with type inference.
 * Example:
 *   const users = await query<{ id: string; email: string }>`
 *     SELECT id, email FROM users;
 *   `;
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  strings: TemplateStringsArray,
  ...params: any[]
) {
  const { rows } = await sql<T>(strings, ...params);
  return rows;
}
