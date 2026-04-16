import { Geist } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from '@/components/Footer/Footer';

const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  title: "KeenKeeper",
  description: "Keep Your Friendships Alive",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.className} h-full antialiased`}
      data-theme="light"
    >
      <body>
        <Navbar></Navbar>
        <main className="container mx-auto min-h-[50vh]">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
