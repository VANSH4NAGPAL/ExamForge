import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'ExamForge — Professional Exam Prep',
  description: 'Master your certifications with structured practice and deep analytics.',
};

import DeviceInit from '@/components/DeviceInit';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-bg text-fg antialiased">
        <DeviceInit />
        {children}
      </body>
    </html>
  );
}
