export const metadata = {
  title: "ATM Tracking",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}