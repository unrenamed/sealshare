import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { OnlineStatus } from "@/components/OnlineStatus";
import { WelcomeToast } from "@/components/WelcomeToast";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SealShare: Seal & Share Secrets Securely",
  description:
    "Secure, end-to-end encrypted secret sharing directly in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="min-h-screen flex flex-col">
            <div className="flex-grow grid grid-cols-6 grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
              <div className="w-full col-span-6 row-start-2 md:col-span-4 md:col-start-2">
                {children}
              </div>
            </div>

            <footer className="w-full flex items-center justify-center border-t border-black/[.08] dark:border-white/[.1] mx-auto text-center text-xs gap-8 py-8">
              <p>
                Powered by{" "}
                <a
                  href="https://www.unkey.com/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Unkey
                </a>
              </p>
              <ThemeSwitcher />
            </footer>

            <Toaster />
            <OnlineStatus />
            <WelcomeToast />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
