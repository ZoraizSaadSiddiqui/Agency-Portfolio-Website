import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

export const metadata: Metadata = {
  title: {
    default: "Automation + Web Development Agency",
    template: "%s | Automation + Web Development Agency",
  },
  description:
    "We automate manual business processes and build the websites that run them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
