"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Please put a number greater than $0",
  }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select a status",
  }),
  date: z.string(),
});

const UpdateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message: string | null;
};

export const updateInvoice = async (id: string, prevState: State, formData?: FormData) => {
  const validateFields = UpdateInvoiceSchema.safeParse({
    customerId: formData?.get("customerId"),
    amount: formData?.get("amount"),
    status: formData?.get("status"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Error trying update invoice",
    };
  }

  const { amount, customerId, status } = validateFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (e) {
    return {
      message: "Database error: failed to update invoice",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};
