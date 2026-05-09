import { useCallback } from 'react';

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'error' | 'warning' | 'success';

export function useHaptic() {
  const triggerHaptic = useCallback((style: HapticStyle = 'light') => {
    // Check if the Vibration API is supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      // Map haptic styles to vibration patterns
      const patterns: Record<HapticStyle, number | number[]> = {
        light: 10,
        medium: 20,
        heavy: 40,
        selection: [5, 10],
        error: [20, 50, 20],
        warning: [30, 50],
        success: [10, 20, 10],
      };

      navigator.vibrate(patterns[style]);
    }

    // For iOS devices that support Haptic Engine via Taptic Engine
    // This will be silently ignored on non-iOS devices
    if (typeof window !== 'undefined' && 'HapticFeedback' in window) {
      // @ts-ignore - iOS specific API
      window.HapticFeedback?.(style);
    }
  }, []);

  return { triggerHaptic };
}
