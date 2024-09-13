import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/app/globals.css';
import NextAuthWrapper from "@/library/next.auth.wrapper";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Duy Toan",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AntdRegistry>
          <NextAuthWrapper>
            {children}   
          </NextAuthWrapper>
        </AntdRegistry>

      </body>
    </html>
  );
}
