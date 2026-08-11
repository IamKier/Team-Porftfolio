import { useEffect, useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* Clipboard blocked (insecure context or denied) — the mailto link above
         is still the primary path, so fail quietly. */
    }
  };

  return (
    <button type="button" className="copy-email" onClick={copy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Copied' : email}</span>
      {/* Announce the result without shifting the visible label around. */}
      <span className="sr-only" role="status">
        {copied ? `${email} copied to clipboard` : ''}
      </span>
    </button>
  );
}
