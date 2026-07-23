import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { themeInitScript } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--ff-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "tr";
  const { meta } = await getDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL("https://dasvio.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en" },
    },
  };
}

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
    // suppressHydrationWarning: themeInitScript stamps `data-theme` onto
    // <html> before hydration, so the attribute is expected to differ from
    // the server-rendered markup. Only attribute diffs on THIS element are
    // suppressed — children still hydrate strictly.
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        {/* Must stay the first child of <body> — it applies the stored theme
            before any content paints. See themeInitScript. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Navbar t={t.nav} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer t={t.footer} locale={locale} />
        <ScrollToTop label={t.nav.backToTop} />
      </body>
    </html>
  );
}
