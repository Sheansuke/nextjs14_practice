"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export const updateInvoice = async (id: string, formData?: FormData) => {
  const { amount, customerId, status } = UpdateInvoiceSchema.parse({
    customerId: formData?.get("customerId"),
    amount: formData?.get("amount"),
    status: formData?.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};
