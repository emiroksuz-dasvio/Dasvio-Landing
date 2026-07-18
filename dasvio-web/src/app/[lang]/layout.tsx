import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--ff-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dasvio — Restoran Yönetiminin Yeni Standardı",
  description:
    "QR menü, POS, çok şube yönetimi, platform entegrasyonları ve analitik. Restoran operasyonunuzun tamamı tek panelden.",
  metadataBase: new URL("https://dasvio.com"),
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <Navbar t={t.nav} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer t={t.footer} locale={locale} />
      </body>
    </html>
  );
}
