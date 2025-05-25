import type { Metadata } from "next";
import { Sora, Amiri } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zawajuna - Plateforme de Mariage Islamique",
  description: "Unissez-vous dans le respect de la Sunnah. Plateforme sécurisée de rencontres islamiques pour mouqabala et mariage halal.",
  keywords: "mariage islamique, mouqabala, zawaj, rencontre halal, mariage musulman, sunnah",
  authors: [{ name: "Zawajuna" }],
  openGraph: {
    title: "Zawajuna - Plateforme de Mariage Islamique",
    description: "Unissez-vous dans le respect de la Sunnah",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${amiri.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
