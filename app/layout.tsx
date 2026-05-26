import type { Metadata } from "next";
import Script from "next/script";

import MotionProvider from "@/components/providers/MotionProvider";
import { garamond, jost } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Art of Paradise — Салон красоты | Москва",
  description:
    "Премиальный салон красоты Art of Paradise на Духовском переулке в Москве. Рейтинг 5.0. Работаем до 23:00. Стрижки, окрашивание, маникюр.",
  keywords: [
    "салон красоты",
    "Москва",
    "Art of Paradise",
    "маникюр",
    "стрижка",
    "Тульская",
  ],
  openGraph: {
    title: "Art of Paradise",
    description: "Премиальный салон красоты в центре Москвы",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Art of Paradise",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Духовской переулок, 17с10",
    addressLocality: "Москва",
  },
  telephone: "+79261532343",
  openingHours: "Mo-Su 00:00-23:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "292",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${garamond.variable} ${jost.variable}`}>
      <body className="bg-bg font-body text-text antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Script
          id="art-of-paradise-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
