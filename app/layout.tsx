import { ReactNode } from "react";

import localFont from "next/font/local";
import "./globals.scss";

const universFont = localFont({
  src: "./fonts/univers-lt-std-57-condensed.otf",
  variable: "--font-primary", // optional CSS variable
  weight: "400", // or omit if not defined in the OTF
  style: "normal",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={universFont.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
