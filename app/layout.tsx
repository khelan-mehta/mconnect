"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" ">
      <body className={" py-4 no-scrollbar"}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
