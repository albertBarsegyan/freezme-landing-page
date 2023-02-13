import { useEffect, useRef } from "react";
import gsap, { Power1 } from "gsap";

export function CloudIcon({ x = 300 }: { x?: number }) {
  const cloudRef = useRef(null);

  useEffect(() => {
    gsap.to(cloudRef.current, {
      duration: 3,
      x,
      repeat: Infinity,
      ease: Power1.easeInOut,
      yoyo: true,
    });
  }, [x]);

  return (
    <svg ref={cloudRef} width="183" height="73" viewBox="0 0 183 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M182.129 72.05C182.876 69.5421 182.609 66.6073 180.849 64.2061C177.65 59.8306 171.891 56.1487 161.493 55.5084C161.493 55.5084 172.744 5.61676 129.232 0.387471C84.493 -5.00189 82.2001 47.6111 82.2001 47.6111C82.2001 47.6111 56.8711 19.7038 43.0602 53.6941C43.0602 53.6941 15.8116 39.9273 2.69392 56.4689C-1.25206 61.4314 -0.558838 68.048 2.80058 72.05H182.129Z"
        fill="white"
      />
    </svg>
  );
}
