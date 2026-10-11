'use client';

import { useEffect } from 'react';

// Matches PageTransition's exit animation (0.4s) plus a small buffer
const TRANSITION_MS = 450;

/**
 * Scrolls to the top when the user navigates with the browser Back/Forward buttons.
 *
 * Disables the browser's own scroll restoration, then resets scroll immediately and
 * again once the page transition has swapped in the new page.
 */
export default function ScrollToTopOnHistoryNav() {
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    let timeout: number | undefined;
    const handlePopState = () => {
      window.scrollTo(0, 0);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_MS);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.clearTimeout(timeout);
      window.history.scrollRestoration = previous;
    };
  }, []);

  return null;
}
