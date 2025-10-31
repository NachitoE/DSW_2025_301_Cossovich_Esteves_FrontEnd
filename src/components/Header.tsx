import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [intensity, setIntensity] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const MAX_SCROLL = 5;
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setIntensity(Math.min(y / MAX_SCROLL, 1));
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const bgAlpha = (0.06 + intensity * 0.34).toFixed(3);
  const blurPx = Math.round(intensity * 6);
  const shadowAlpha = (0.04 * intensity).toFixed(3);
  const borderAlpha = (0.06 * intensity).toFixed(3);

  return (
    <header
      className="p-4 h-20 sticky top-0 z-40 w-full flex items-center rounded-b-3xl transition-all duration-200"
      style={{
        background: `rgba(255,255,255,${bgAlpha})`,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
        boxShadow: `0 6px 20px rgba(2,6,23,${shadowAlpha})`,
        borderBottom: `1px solid rgba(2,6,23,${borderAlpha})`,
      }}
    >
      <Link to="/" className="flex items-center gap-4">
        <div className="text-5xl font-bold caveat-brush-regular tracking-tight md:tracking-wide drop-shadow-[0_0px_1px_rgba(255,255,0,1)]">
          <span className="text-lime-500">avistand</span>
          <span className="text-orange-400">oo</span>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <GoogleLogin />
      </div>
    </header>
  );
}