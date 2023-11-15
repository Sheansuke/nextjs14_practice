"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export const createInvoice = async (FormData: FormData) => {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: FormData.get("customerId"),
    amount: FormData.get("amount"),
    status: FormData.get("status"),
  });

  const amountInCents = amount * 100;

  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;

  } catch (e) {
    return {
      message: "Database error: failed to create invoice",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};
