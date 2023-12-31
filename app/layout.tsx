import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div className="bg-sky-700 w-screen h-screen flex items-center justify-center">
        {children}
      </div>
    </html>
  );
}
