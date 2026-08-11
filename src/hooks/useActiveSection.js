import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently nearest the top of the viewport.
 * The rootMargin trims the sticky nav off the top and most of the viewport off
 * the bottom, so a section becomes "active" as it reaches the header rather
 * than when it first peeks into view.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-68px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
