import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
  title: "SejmViz",
  description: "Visualize the Polish Parliament",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
