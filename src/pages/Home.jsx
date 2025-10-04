import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const AnimatedTag = ({ children, delay }) => {
  const tagRef = useRef(null);

  useGSAP(() => {
    gsap.to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    });
  }, []);

  return (
    <span
      ref={tagRef}
      className="inline-block px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2 transition-all opacity-0 translate-y-5"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-accent-primary-light) 10%, transparent)",
        color: "var(--color-accent-primary-light)",
        border: "1px solid color-mix(in srgb, var(--color-accent-primary-light) 30%, transparent)",
      }}
    >
      {children}
    </span>
  );
};

export default function Home() {
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const featureRefs = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });

      tl.to(titleRef.current, { opacity: 1, y: 0 })
        .to(subtitleRef.current, { opacity: 1, y: 0 }, "-=0.6")
        .to(buttonRef.current, { opacity: 1, scale: 1, y: 0 }, "-=0.5")
        .to(featureRefs.current, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.3");
    },
    { scope: mainRef }
  );

  const features = [
    { title: "Curated Style", description: "Hand-picked items for modern living." },
    { title: "Seamless Checkout", description: "Fast, secure, and stress-free payments." },
    { title: "24/7 Support", description: "We're here to help you every step of the way." },
  ];

  return (
    <div
      ref={mainRef}
      className="relative font-inter overflow-hidden"
      style={{
        backgroundColor: "var(--color-base-dark-900)",
        color: "var(--color-base-dark-300)",
      }}
    >
      {/* Background Blobs */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        style={{ backgroundColor: "var(--color-accent-secondary-DEFAULT)" }}
      ></div>
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        style={{ backgroundColor: "var(--color-accent-primary-dark)" }}
      ></div>
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
        style={{ backgroundColor: "var(--color-accent-tertiary-DEFAULT)" }}
      ></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative z-10 flex flex-col justify-center items-center text-center px-4"
        style={{
          minHeight: "calc(100vh - 64px)", // Navbar height adjustment
        }}
      >
        <div className="max-w-4xl">

          <div className="mb-6">
            <AnimatedTag delay={0.3}>New Arrivals</AnimatedTag>
            <AnimatedTag delay={0.4}>2025 Collection</AnimatedTag>
            <AnimatedTag delay={0.5}>Free Shipping</AnimatedTag>
          </div>

          <h1
            ref={titleRef}
            className="opacity-0 translate-y-10 text-6xl md:text-8xl font-extrabold mb-4 tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage: "var(--gradient-brand)",
            }}
          >
            Elevate Your Everyday.
          </h1>

          <p
            ref={subtitleRef}
            className="opacity-0 translate-y-10 text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{
              color: "var(--color-base-dark-300)",
            }}
          >
            Discover the highest quality goods and essentials, curated for modern
            design and lasting durability. Your perfect find is waiting.
          </p>

          {/* CTA Button */}
          <Link
            ref={buttonRef}
            to="/shop"
            className="opacity-0 scale-90 translate-y-5 group inline-flex items-center justify-center font-bold px-8 py-4 rounded-full transition-all duration-300 text-lg"
            style={{
              backgroundColor: "var(--color-accent-primary-DEFAULT)",
              color: "var(--color-base-dark-900)",
              boxShadow: "0 0 20px var(--color-accent-primary-shadow)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-accent-primary-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-accent-primary-DEFAULT)";
            }}
          >
            <svg
              className="w-6 h-6 mr-2 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            Start Shopping Now
          </Link>
        </div>
      </section>

      <section
        className="relative z-10 py-20 px-4 md:px-16 border-t"
        style={{
          backgroundColor: "var(--color-base-dark-900)",
          borderColor: "var(--color-base-dark-800)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight text-transparent bg-clip-text"
            style={{
              backgroundImage: "var(--gradient-brand)",
            }}
          >
            Why Shop With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                ref={(el) => (featureRefs.current[i] = el)}
                className="opacity-0 translate-y-10 p-8 rounded-2xl shadow-xl transition-all duration-300 text-center"
                style={{
                  backgroundColor: "var(--color-base-dark-800)",
                  border: "1px solid var(--color-base-dark-700)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid var(--color-accent-primary-border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid var(--color-base-dark-700)")
                }
              >
                <div
                  className="text-4xl mb-4"
                  style={{ color: "var(--color-accent-primary-light)" }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ color: "var(--color-accent-primary-300)" }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "var(--color-base-dark-400)" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
