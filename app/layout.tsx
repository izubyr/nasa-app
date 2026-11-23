import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "COSMOS - Astronomy Picture of the Day",
  description: "A new view of the universe, every day.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
