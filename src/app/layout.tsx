import type { Metadata } from "next";

import cx from "classnames";

import { plusJakartaSans } from "./fonts";

export const metadata: Metadata = {
  title: "Frontend Mentor | Kanban Task Management Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(plusJakartaSans.variable)}>{children}</body>
    </html>
  );
}
