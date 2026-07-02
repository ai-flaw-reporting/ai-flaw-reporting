import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { QueryProvider } from "~/lib/query-provider";

export const metadata: Metadata = {
  title: "FLARE-AI: AI Flaw Reporting",
  description:
    "A community-driven platform for documenting AI vulnerabilities, biases and incidents, addressed to the appropriate organizations.",
  icons: [{ rel: "icon", url: "/icon.png", type: "image/png" }],
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
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="app-theme"
          >
            <div
              role="alert"
              className="sticky top-0 z-50 border-b border-red-300 bg-red-50 px-6 py-4 text-center text-base font-semibold text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            >
              DISCLAIMER: This site is a research preview. To provide feedback, email{" "}
              <a
                href="mailto:contact@ai-reports.org"
                className="underline hover:no-underline"
              >
                contact@ai-reports.org
              </a>
              .
            </div>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
