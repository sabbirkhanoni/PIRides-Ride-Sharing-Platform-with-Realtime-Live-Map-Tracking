import { useState, useEffect, useRef } from "react";

export function FadeUp({ children, delay = 0 }) {
  const el = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShow(true); },
      { threshold: 0.12 }
    );
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={el}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {children}
    </div>
  );
}