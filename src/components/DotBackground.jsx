import { useEffect, useRef } from 'react';
import './DotBackground.css';

const SPACING = 32;
const DOT_SIZE = 1.8;
const MOUSE_RADIUS = 30;
const PUSH = 16;
const EASE = 12;
// How much a fully displaced dot darkens/grows relative to a resting one.
const ACTIVE_ALPHA = 2.4;
const ACTIVE_GROWTH = 1.1;

const FALLBACK_COLOR = { r: 100, g: 116, b: 139, a: 0.3 };
const SENTINEL = '#010203';

/**
 * Normalises any CSS colour by round-tripping it through a canvas fillStyle,
 * which always yields '#rrggbb' or 'rgba(r, g, b, a)'. Hand-rolled regexes are
 * not enough here: the CSS minifier rewrites rgba() tokens as #rrggbbaa.
 */
const parseColor = (ctx, value) => {
  if (!value) return FALLBACK_COLOR;

  const previous = ctx.fillStyle;
  ctx.fillStyle = SENTINEL;
  ctx.fillStyle = value.trim();
  const normalized = ctx.fillStyle;
  ctx.fillStyle = previous;

  // fillStyle ignores unparseable values, so the sentinel surviving means the
  // input was invalid.
  if (normalized === SENTINEL) return FALLBACK_COLOR;

  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }

  const parts = normalized.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return FALLBACK_COLOR;
  const [r, g, b, a = 1] = parts.map(Number);
  return { r, g, b, a };
};

export default function DotBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');

    let width = 0;
    let height = 0;
    let dots = [];
    let color = FALLBACK_COLOR;
    let frameId = null;
    let resizeId = null;
    let recheckId = null;
    const mouse = { x: null, y: null };

    /*
     * Read the --dot custom property straight off <html> rather than the
     * canvas's resolved `color`. The reduced-motion rule sets
     * `transition-duration` on `*`, and since `transition-property` defaults to
     * `all`, `color` becomes a genuinely transitioned property — so
     * getComputedStyle reports the PREVIOUS colour for a frame or two after a
     * theme flip. Caching that stale value left the dots painting the old
     * theme's colour until a reload. Custom properties are not animated by that
     * rule, so this reflects the new theme immediately.
     */
    const readColor = () => {
      const token = getComputedStyle(document.documentElement)
        .getPropertyValue('--dot')
        .trim();
      color = parseColor(ctx, token || getComputedStyle(canvas).color);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { r, g, b, a } = color;

      // Resting dots share one colour, so batch them into a single path.
      // Displaced dots are drawn after, each fading up with its displacement.
      const active = [];
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.beginPath();

      for (const dot of dots) {
        const shift = Math.hypot(dot.x - dot.baseX, dot.y - dot.baseY);
        if (shift > 0.5) {
          active.push([dot, Math.min(shift / PUSH, 1)]);
          continue;
        }
        ctx.moveTo(dot.x + DOT_SIZE, dot.y);
        ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
      }

      ctx.fill();

      for (const [dot, intensity] of active) {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(a * (1 + intensity * ACTIVE_ALPHA), 1)})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_SIZE + intensity * ACTIVE_GROWTH, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const layout = () => {
      // Scale the backing store by DPR so dots stay crisp on retina/hidpi screens.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          dots.push({ baseX: x, baseY: y, x, y });
        }
      }

      readColor();
      draw();
    };

    const step = () => {
      for (const dot of dots) {
        if (mouse.x !== null) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            dot.x -= Math.cos(angle) * force * PUSH;
            dot.y -= Math.sin(angle) * force * PUSH;
            continue;
          }
        }

        dot.x += (dot.baseX - dot.x) / EASE;
        dot.y += (dot.baseY - dot.y) / EASE;
      }

      draw();
      frameId = requestAnimationFrame(step);
    };

    // The grid only moves in response to the visitor's own cursor and settles
    // the moment they stop, so it runs regardless of prefers-reduced-motion.
    const start = () => {
      if (frameId === null) frameId = requestAnimationFrame(step);
    };

    const stop = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeId);
      resizeId = requestAnimationFrame(layout);
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    // Fires for both inputs that can change the dot colour: the OS scheme, and
    // the [data-theme] attribute the toggle writes onto <html>.
    const handleThemeChange = () => {
      readColor();
      draw();
      // Safety net in case a future style change reintroduces a lagging value.
      clearTimeout(recheckId);
      recheckId = setTimeout(() => {
        readColor();
        draw();
      }, 100);
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    layout();
    start();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    scheme.addEventListener('change', handleThemeChange);

    return () => {
      stop();
      cancelAnimationFrame(resizeId);
      clearTimeout(recheckId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      scheme.removeEventListener('change', handleThemeChange);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-background" aria-hidden="true" />;
}
