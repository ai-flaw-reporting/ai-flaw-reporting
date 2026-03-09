import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "AI Flaw & Incident Reporting",
  description:
    "Generate flaw, vulnerability, and incident reports for AI systems. Automatically send reports to key stakeholders.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="app-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
