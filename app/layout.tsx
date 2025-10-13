import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jewelry Product Page | Next.js Assignment",
  description:
    "Dynamic product detail page built with Next.js 14, TypeScript & Tailwind CSS",
  keywords: ["jewelry", "product page", "nextjs", "ecommerce"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
