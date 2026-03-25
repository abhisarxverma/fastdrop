import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fastdrop-ebon.vercel.app"),

  title: {
    default: "Fastdrop - Instant File Sharing to Nearby Systems",
    template: "%s | Fastdrop",
  },

  description:
    "Fastdrop is a fast, login-free file sharing tool for classrooms and labs. Instantly share files, code, and notes with nearby users.",

  keywords: [
    "file sharing",
    "classroom file sharing",
    "fast file sharing",
    "share files without login",
    "lab file sharing",
    "student file sharing",
    "nearby file sharing",
  ],

  authors: [{ name: "Fastdrop" }],

  openGraph: {
    title: "Fastdrop - Instant Nearby Sharing",
    description:
      "Share files to nearby systems instantly.",
    url: "https://fastdrop-ebon.vercel.app",
    siteName: "Fastdrop",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fastdrop - Instant File Sharing",
    description:
      "Drop files instantly. No login. Built for quick public sharing.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="PpVh76uWydI2XZPrunLXbuDOzddRYcYpo6x-1tybI8o" />
      </head>
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${dmSans.className} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full min-h-screen flex flex-col"><TooltipProvider>{children}</TooltipProvider></div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
