import { useEffect, useCallback } from 'react';

export interface ShortcutConfig {
  key: string; // e.g. '1', '2', 'm', 't', 'k', '?', 'Escape', 'Enter', ' '
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  allowInInputs?: boolean;
  description: string;
  category: 'Navigation' | 'Broadcasting' | 'Audience' | 'General';
  handler: (e: KeyboardEvent) => void;
}

// Subtle pleasant audio feedback using Web Audio API
export const playShortcutFeedbackSound = (type: 'nav' | 'action' | 'close' | 'toggle' = 'nav') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'action') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'nav') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.06); // C#5
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
};

export function useGlobalKeyboardShortcuts(
  shortcuts: ShortcutConfig[],
  options: {
    enabled?: boolean;
    soundEnabled?: boolean;
    onTriggerToast?: (message: string, keyHint: string) => void;
  } = {}
) {
  const { enabled = true, soundEnabled = true, onTriggerToast } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      for (const shortcut of shortcuts) {
        // If user is typing in an input and this shortcut is not allowed in inputs, skip
        if (isInput && !shortcut.allowInInputs) {
          continue;
        }

        const matchesKey =
          shortcut.key.toLowerCase() === e.key.toLowerCase() ||
          (shortcut.key === ' ' && e.code === 'Space') ||
          (shortcut.key === '?' && e.key === '?');

        const isCtrlOrCmdPressed = e.metaKey || e.ctrlKey;
        const matchesCtrlOrCmd = shortcut.ctrlOrCmd ? isCtrlOrCmdPressed : !isCtrlOrCmdPressed;
        const matchesShift = shortcut.shift ? e.shiftKey : true;
        const matchesAlt = shortcut.alt ? e.altKey : !e.altKey;

        if (matchesKey && matchesCtrlOrCmd && matchesShift && matchesAlt) {
          e.preventDefault();
          shortcut.handler(e);

          if (soundEnabled) {
            if (shortcut.key === 'Escape') {
              playShortcutFeedbackSound('close');
            } else if (shortcut.category === 'Navigation') {
              playShortcutFeedbackSound('nav');
            } else {
              playShortcutFeedbackSound('action');
            }
          }

          if (onTriggerToast) {
            const keyLabel = shortcut.ctrlOrCmd
              ? `⌘ + ${shortcut.key.toUpperCase()}`
              : shortcut.key.toUpperCase();
            onTriggerToast(shortcut.description, keyLabel);
          }
          break;
        }
      }
    },
    [shortcuts, enabled, soundEnabled, onTriggerToast]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
