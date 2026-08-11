/*
 * Inline icons. Stroke icons inherit `currentColor` and sit on a 24px grid;
 * brand glyphs are filled paths on their own viewBoxes.
 */

const stroke = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

export const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3.6 1.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2 6h3.2v8.4H2V6Zm5.2 0h3.07v1.15h.04c.43-.77 1.47-1.58 3.03-1.58 3.24 0 3.84 2.03 3.84 4.67v4.16h-3.2v-3.69c0-.88-.02-2.01-1.28-2.01-1.28 0-1.48.95-1.48 1.94v3.76H7.2V6Z" />
  </svg>
);

export const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M12.3 1.5h2.3l-5.03 5.75L15.5 14.5h-4.63l-3.63-4.74-4.15 4.74H.79l5.38-6.15L.75 1.5h4.75l3.28 4.34L12.3 1.5Zm-.81 11.62h1.28L4.57 2.81H3.2l8.29 10.31Z" />
  </svg>
);

export const ExternalIcon = () => (
  <svg {...stroke} width="15" height="15">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

export const SunIcon = () => (
  <svg {...stroke}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export const MoonIcon = () => (
  <svg {...stroke}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

export const MenuIcon = () => (
  <svg {...stroke} width="20" height="20">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...stroke} width="20" height="20">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
