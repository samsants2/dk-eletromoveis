import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { getProducts } from "@/lib/store";
import { sellers } from "@/data/sellers";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Área Administrativa",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthed()) {
    return <AdminLogin />;
  }

  const products = await getProducts();
  return <AdminDashboard initialProducts={products} sellers={sellers} />;
}
