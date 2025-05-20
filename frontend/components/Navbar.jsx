// components/Navbar.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import "../styles/navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Function to check auth status
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      const storedUsername = localStorage.getItem("username");
      if (token && storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername(null);
      }
    };

    // Check on mount
    checkAuth();

    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);

    // Cleanup
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setUsername(null);
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="logo-links">
        <Image
          src="/assets/Mask.png"
          alt="Shadow Slave Logo"
          width={80} // Adjust based on your logo size
          height={80}
          priority // Optional: for above-the-fold images
        />
        <p className="logo-text">Shadow Slave</p>
        <ul className="links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/plot">Plot</Link>
          </li>
          <li>
            <Link href="/characters">Characters</Link>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
          <li>
            <Link href="/author">Author</Link>
          </li>
        </ul>
      </div>
      <div className="auth">
        <ul>
          {username ? (
            <>
              <li>
                <Link href="/profile">
                  {username}
                </Link>
              </li>
              <li>
                <Link href="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}