import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'NyayaAI — Venkatesh garu Lawyer | India\'s Intelligent Legal Ecosystem',
  description: 'NyayaAI by Venkatesh garu, Lawyer — Aruna Gen AI, Tirupati. Empowering every citizen with trusted legal intelligence.',
  keywords: ['Venkatesh garu Lawyer', 'Indian law', 'legal AI', 'Aruna Gen AI', 'Tirupati advocate', 'legal research'],
  openGraph: {
    title: 'NyayaAI — Venkatesh garu Lawyer',
    description: 'Application by Venkatesh garu, Lawyer — Aruna Gen AI, Tirupati, Andhra Pradesh.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
