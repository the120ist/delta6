"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
const [isInteractive, setIsInteractive] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const slot = (scrollY + vh / 2) / vh;
    
    let newIndex;
    if (slot < 1.5) {
      newIndex = 0;
    } else if (slot < 3.5) {
      newIndex = 1;
    } else if (slot < 5.5) {
      newIndex = 2;
    } else {
      newIndex = 3;
    }
    setActiveIndex(newIndex);
    
    // Only enable interaction when fully on a black band
    // Slot 0 (logo): centred at 0.5, fully visible from ~0 to ~1
    // Slot 2 (statement one): centred at 2.5, fully visible from ~2 to ~3
    // Slot 4 (statement two): centred at 4.5, fully visible from ~4 to ~5
    // Slot 6 (CTA): centred at 6.5, fully visible from ~6 onwards
    const isFullyVisible = 
      (newIndex === 0 && slot < 1) ||
      (newIndex === 1 && slot >= 2 && slot < 3) ||
      (newIndex === 2 && slot >= 4 && slot < 5) ||
      (newIndex === 3 && slot >= 6);
    setIsInteractive(isFullyVisible);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <main className="bg-black">
      {/* Fixed centred content layers — only one visible at a time */}
      <div className="fixed inset-0 flex items-center justify-center px-8 pointer-events-none z-50">
        {/* Slot 0: Logo */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: activeIndex === 0 ? 1 : 0 }}
        >
          <Image
            src="/delta6-logo-white.png"
            alt="delta6"
            width={800}
            height={800}
            priority
            className="w-auto h-auto max-w-[70vw] max-h-[70vh] object-contain"
          />
        </div>

        {/* Slot 1: Statement one */}
        <p
          className="statement absolute transition-opacity duration-200"
          style={{ opacity: activeIndex === 1 ? 1 : 0 }}
        >
          Websites that work.
        </p>

        {/* Slot 2: Statement two */}
        <p
          className="statement absolute transition-opacity duration-200"
          style={{ opacity: activeIndex === 2 ? 1 : 0 }}
        >
          Hand-built. No templates.
        </p>

        {/* Slot 3: CTA */}
<div
  className="absolute flex flex-col items-start gap-2 transition-opacity duration-200"
  style={{ 
    opacity: activeIndex === 3 ? 1 : 0,
    visibility: activeIndex === 3 ? "visible" : "hidden",
    pointerEvents: activeIndex === 3 && isInteractive ? "auto" : "none",
  }}
>
  <Link 
    href="/contact" 
    className="cta-link"
  >
    <span className="chev">&gt;</span>Contact.
  </Link>
</div>
</div>
          

      {/* Scrolling bands — these are the moving layer */}
      <div className="relative">
        {/* Black */}
        <div className="h-screen bg-black" />
        {/* White wipe */}
        <div className="h-screen bg-white" />
        {/* Black */}
        <div className="h-screen bg-black" />
        {/* White wipe */}
        <div className="h-screen bg-white" />
        {/* Black */}
        <div className="h-screen bg-black" />
        {/* White wipe */}
        <div className="h-screen bg-white" />
        {/* Black (CTA rests here) */}
        <div className="h-screen bg-black" />
      </div>

      <style>{`
        .statement {
          color: #ffffff;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-align: center;
          max-width: 90%;
          font-size: clamp(2.5rem, 9vw, 9rem);
        }
        .cta-link {
          color: #ffffff;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          font-size: clamp(2rem, 7vw, 6rem);
          transition: color 0.15s ease;
          display: inline-flex;
          align-items: baseline;
          gap: 0.4em;
        }
        .cta-link:hover {
          color: var(--hot-lemon);
        }
        .chev {
          display: none;
          color: var(--hot-lemon);
          width: 0.5em;
        }
        @media (max-width: 768px) {
          .chev {
            display: inline-block;
          }
        }
      `}</style>
    </main>
  );
}