import { useState, useEffect, useCallback, useRef } from 'react';

interface VoiceAgentOptions {
  pitch?: number;
  rate?: number;
  lang?: string;
}

export function useVoiceAgent(options: VoiceAgentOptions = {}) {
  const { pitch = 1, rate = 0.9, lang = 'ar-EG' } = options;
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = lang;

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
      
      synthesisRef.current = window.speechSynthesis;
    }
  }, [lang]);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.pitch = pitch;
      utterance.rate = rate;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setResponse(text);
      synthesisRef.current.speak(utterance);
    }
  }, [lang, pitch, rate]);

  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    response,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
}
