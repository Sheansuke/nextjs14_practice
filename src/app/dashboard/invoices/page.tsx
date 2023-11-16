import { CreateInvoice } from "@/src/ui/invoices/buttons";
import Search from "@/src/ui/search";
import { lusitana } from "@/src/ui/fonts";
import { Suspense } from "react";
import InvoicesTable from "@/src/ui/invoices/table";
import { InvoicesTableSkeleton } from "@/src/ui/skeletons";
import Pagination from "@/src/ui/invoices/pagination";
import { fetchInvoicesPages } from "@/src/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function  InvoicesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages  = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center"><Pagination totalPages={totalPages} /></div>
    </div>
  );
}
