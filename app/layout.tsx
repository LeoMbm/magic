import "./globals.css";

import { GeistSans } from "geist/font/sans";

let title = "Magic The Gathering";

export const metadata = {
  title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
