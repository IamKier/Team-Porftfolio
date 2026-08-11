import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// null means "follow the OS" — no [data-theme] is written, so the page keeps
// tracking the system setting. A click pins an explicit choice instead.
const storedTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
};

export default function ThemeToggle() {
  const [choice, setChoice] = useState(storedTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia(DARK_QUERY).matches
  );

  // Only relevant while following the OS, but cheap enough to always track.
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    try {
      if (choice) {
        document.documentElement.dataset.theme = choice;
        localStorage.setItem(STORAGE_KEY, choice);
      } else {
        delete document.documentElement.dataset.theme;
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* localStorage unavailable — the attribute above still applies. */
    }
  }, [choice]);

  const resolved = choice ?? (systemDark ? 'dark' : 'light');
  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setChoice(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
