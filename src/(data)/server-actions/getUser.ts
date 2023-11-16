"use server";

import { User } from "@/src/lib/definitions";
import { sql } from "@vercel/postgres";

export const getUser = async (email: string) => {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};
