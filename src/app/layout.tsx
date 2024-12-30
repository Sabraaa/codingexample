
import "./globals.css"
export const metadata = {
  title: 'Example Project',
  description: 'A Next.js Test Project',
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