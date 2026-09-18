import { useState, useCallback, useEffect } from 'react';

export function useSpeech(enabled: boolean = true) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text: string, lang: 'id-ID' | 'en-US' = 'id-ID') => {
    if (!enabled || !isSupported || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const cleanText = text.replace(/[_*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.lang = lang;
    utterance.rate = lang === 'en-US' ? 0.85 : 0.9; // Friendly, clear pacing for kids
    utterance.pitch = 1.05; // Friendly tone

    // Try finding matching voice for language
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang === 'en-US' ? 'en' : 'id';
    const voice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [enabled, isSupported]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}
