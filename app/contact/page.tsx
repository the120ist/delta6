"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as never).toString(),
    });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Logo top-left, links home */}
      <Link href="/" className="fixed top-6 left-6 z-50 block">
        <Image
          src="/delta6-logo-white.png"
          alt="delta6"
          width={80}
          height={80}
          priority
          className="w-16 h-auto"
        />
      </Link>

      <div className="flex-1 flex items-center justify-center" style={{ paddingTop: "8rem", paddingBottom: "8rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div className="w-full max-w-2xl">
          {!submitted ? (
            <>
             <h1 className="contact-heading" style={{ marginBottom: "80px" }}>Let's start a conversation.</h1>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required />
                </div>

                <button type="submit" className="submit-button">
                  <span className="chev">&gt;</span>Send.
                </button>

                <p className="privacy-note">
                  Your details are only used to reply to you. Nothing is stored
                  or shared. Enquiries are handled by Luminance Marketing Ltd.
                </p>
              </form>
            </>
          ) : (
            <div>
              <h1 className="contact-heading mb-6">Thanks.</h1>
              <p className="thanks-body">I&apos;ll reply within a day or two.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .contact-heading {
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
          font-size: clamp(2.5rem, 7vw, 5.5rem);
        }
        .thanks-body {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: rgba(255, 255, 255, 0.7);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-field label {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .form-field input,
        .form-field textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-family: inherit;
          font-size: 1.125rem;
          padding: 0.5rem 0;
          transition: border-color 0.15s ease;
          resize: none;
        }
        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-bottom-color: var(--hot-lemon);
        }
        .submit-button {
          background: transparent;
          border: none;
          color: #ffffff;
          font-family: inherit;
          font-weight: 500;
          letter-spacing: -0.03em;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: color 0.15s ease;
          display: inline-flex;
          align-items: baseline;
          gap: 0.4em;
          align-self: flex-start;
        }
        .submit-button:hover {
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
        .privacy-note {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.5;
          max-width: 36rem;
        }
      `}</style>
    </main>
  );
}