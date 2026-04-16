import { Geist } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from '@/components/Footer/Footer';
import ContextProvider from '@/provider/ContextProvider';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
      <body suppressHydrationWarning>
        <Navbar></Navbar>
        <main className="container mx-auto min-h-[50vh]">
          <ContextProvider>
            {children}
          </ContextProvider>
        </main>
        <Footer></Footer>
        <ToastContainer />
      </body>
    </html>
  );
}
