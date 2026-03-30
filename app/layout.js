import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Veda AI",
  description: "Veda AI — Your Personalized AI-Powered Learning Path.",
  icons: {
    icon: "/favicon1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <ClerkProvider>
          <Provider>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
