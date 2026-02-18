import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rainha da Paz | Grupo de Oração Sinop",
    template: "%s | Rainha da Paz"
  },
  description: "Portal oficial do Grupo de Oração Rainha da Paz em Sinop/MT. Encontre informações sobre nossos encontros, eventos e formações na Paróquia Santo Antônio.",
  keywords: ["Rainha da Paz Sinop", "Grupo de Oração Sinop", "Paróquia Santo Antônio Sinop", "Renovação Carismática Católica", "RCC Sinop MT"],
  openGraph: {
    title: "Rainha da Paz | Grupo de Oração Sinop",
    description: "Um encontro de amor com o Espírito Santo na Matriz da Paróquia Santo Antônio.",
    url: "https://rainha-da-paz.vercel.app/",
    siteName: "Rainha da Paz",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rainha da Paz",
              "url": "https://rainha-da-paz.vercel.app/",
              "logo": "https://rainha-da-paz.vercel.app/logo-rainha.jpg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+5566981365456",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
