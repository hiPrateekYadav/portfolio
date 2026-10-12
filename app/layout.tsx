import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';
import ScrollToTopOnHistoryNav from '@/components/ScrollToTopOnHistoryNav';
import { LoadingProvider } from '@/contexts/LoadingContext';

const TITLE = 'Prateek Yadav — Backend Engineer';
const DESCRIPTION = 'Backend engineer specializing in distributed systems, platform architecture, and applied AI.';

export const metadata: Metadata = {
  title: { default: TITLE, template: '%s — Prateek Yadav' },
  description: DESCRIPTION,
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, siteName: 'Prateek Yadav' },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <LoadingProvider>
          <ScrollToTopOnHistoryNav />
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
