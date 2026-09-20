import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to prevent screen from locking or going to sleep
 * using the HTML5 Screen Wake Lock API.
 * Automatically re-acquires the lock on tab visibility changes and user gestures.
 */
export function useWakeLock(enabled: boolean = true) {
  const [isLocked, setIsLocked] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const sentinelRef = useRef<any>(null);

  const requestLock = useCallback(async () => {
    if (!enabled) return;

    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    try {
      // If we already hold an active sentinel, do not request again
      if (sentinelRef.current && !sentinelRef.current.released) {
        setIsLocked(true);
        return;
      }

      const sentinel = await (navigator as any).wakeLock.request('screen');
      sentinelRef.current = sentinel;
      setIsLocked(true);

      sentinel.addEventListener('release', () => {
        setIsLocked(false);
        sentinelRef.current = null;
      });
    } catch {
      // Locking can fail if battery saver is on, tab is hidden, or permission is restricted
      setIsLocked(false);
    }
  }, [enabled]);

  const releaseLock = useCallback(async () => {
    if (sentinelRef.current) {
      try {
        await sentinelRef.current.release();
      } catch {
        // Ignore release errors
      }
      sentinelRef.current = null;
    }
    setIsLocked(false);
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      setIsSupported(true);
    }

    if (!enabled) {
      releaseLock();
      return;
    }

    // Request immediately
    requestLock();

    // Re-acquire lock when app tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestLock();
      }
    };

    const handleFocus = () => {
      requestLock();
    };

    // Re-acquire on user interaction if initial mount blocked by user gesture requirement
    const handleInteraction = () => {
      if (!sentinelRef.current || sentinelRef.current.released) {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('pointerdown', handleInteraction, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('pointerdown', handleInteraction);
      releaseLock();
    };
  }, [enabled, requestLock, releaseLock]);

  return { isLocked, isSupported, requestLock, releaseLock };
}
