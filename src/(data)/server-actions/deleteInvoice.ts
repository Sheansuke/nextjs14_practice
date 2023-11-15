'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (e) {
    return {
      message: "Database error: failed to update invoice",
    };
  }

}