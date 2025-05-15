// app/layout.jsx
import "../styles/globals.css"; // Global styles (includes body, fonts, etc.)
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}