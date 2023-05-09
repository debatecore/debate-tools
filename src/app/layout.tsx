import "./globals.css";

export const metadata = {
  title: "Debate Tools",
  description: "Utilities to help with conducting of oxford format debates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
