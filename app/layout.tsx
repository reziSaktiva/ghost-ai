import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Ghost AI collaborative system design workspace",
};

/**
 * Renders the root HTML document with Geist fonts and Clerk authentication provider.
 *
 * @returns The root HTML element with Geist fonts applied and Clerk provider wrapping the application content.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "var(--bg-surface)",
              colorPrimary: "var(--accent-primary)",
              borderRadius: "0.75rem",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
