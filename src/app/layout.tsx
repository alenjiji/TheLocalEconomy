import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/** Only used inside the two programme lockups, which ship as live SVG text. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Local Economy",
  description:
    "Total transformation of your business with our one-month programme.",
  /*
   * The tab icon is the mark from the header lockup — the cyan tile and its
   * serif E — adapted for the size it is seen at. See public/favicon.svg.
   *
   * Declared here rather than through the app/icon.* file convention because
   * this build is a static export and these are plain files in /public: what
   * is written here is exactly what ships, with no generated hash in the URL.
   *
   * The SVG is what almost every browser will take, and it stays sharp at any
   * density. The PNG is there for the ones that will not read an SVG icon, and
   * favicon.ico answers the request browsers make on their own for /favicon.ico
   * before they have parsed any of this.
   */
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The inline script below adds `js` to this element before React hydrates,
       so the server and client class lists never match here by design. */
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Before any stylesheet is parsed, so a browser with an automatic
            dark theme never gets a frame in which to recolour the page. See
            the note on `:root` in globals.css. */}
        <meta name="color-scheme" content="only light" />
        {/*
          Scroll-in reveals start hidden and are released by an observer. If
          scripting is unavailable nothing would ever release them, so the
          hidden state is scoped to `html.js` and this sets that flag before
          first paint.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
