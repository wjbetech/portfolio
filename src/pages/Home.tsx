import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { FiChevronUp } from 'react-icons/fi';

export default function Home() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      setIsAtBottom(nearBottom);
    };

    // initial check + listeners
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <>
      <main className="pt-0">
        <Hero />
        <Projects />
        <Contact />
      </main>

      {/* Back to top button (visible only on Home route since this component renders on '/') */}
      <button
        aria-label="Back to top"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-hidden={!isAtBottom}
        className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-50 btn btn-primary btn-circle shadow-lg focus:outline-none transition-all duration-300 ${
          isAtBottom
            ? 'opacity-100 translate-y-0 pointer-events-auto animate-bounce'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        <FiChevronUp className="w-5 h-5" />
      </button>
    </>
  );
}
