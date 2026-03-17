import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";


const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Veda AI",
  description: "Veda AI — Your Personalized AI-Powered Learning Path.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <ClerkProvider>
          <Provider>{children}</Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
