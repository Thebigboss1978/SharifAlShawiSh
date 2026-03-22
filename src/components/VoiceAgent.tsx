import React, { useState, useEffect } from 'react';
import { useVoiceAgent } from '../hooks/useVoiceAgent';
import { Mic, MicOff, Volume2, X, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

export function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isListening, isSpeaking, transcript, response, startListening, stopListening, speak, stopSpeaking } = useVoiceAgent({
    lang: 'ar-EG',
    pitch: 0.9,
    rate: 0.95
  });

  const handleToggleListen = async () => {
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        await processVoiceInput(transcript);
      }
    } else {
      stopSpeaking();
      startListening();
    }
  };

  const processVoiceInput = async (text: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: "You are the AI assistant for AlArab Club 777, a futuristic tourism platform in Giza, Egypt (Nazlet El-Semman). You speak in a mix of Egyptian Arabic and formal Arabic, with a professional, confident, and efficient tone (like 'The Godfather'). Keep your responses concise and helpful. You help users with hotel bookings, tours, and crypto-consulting.",
        }
      });
      
      const result = await chat.sendMessage({ message: text });
      if (result.text) {
        speak(result.text);
      }
    } catch (error) {
      console.error("Error processing voice input:", error);
      speak("عذراً، هناك مشكلة في الاتصال. الرجاء المحاولة مرة أخرى."); // Sorry, connection issue
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 glass-panel rounded-2xl p-4 shadow-2xl border border-[var(--color-pharaoh-gold)]/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[var(--color-pharaoh-gold)] font-serif font-semibold">AlArab Club 777 AI</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="h-32 overflow-y-auto mb-4 text-sm flex flex-col gap-2">
              {transcript && (
                <div className="self-end bg-[var(--color-nile-blue-light)] p-2 rounded-lg rounded-tr-none text-right" dir="rtl">
                  {transcript}
                </div>
              )}
              {isProcessing && (
                <div className="self-start text-[var(--color-pharaoh-gold)] flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-xs">Thinking...</span>
                </div>
              )}
              {response && !isProcessing && (
                <div className="self-start bg-[var(--color-obsidian)] border border-[var(--color-pharaoh-gold)]/20 p-2 rounded-lg rounded-tl-none text-right" dir="rtl">
                  {response}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleToggleListen}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                    : 'bg-[var(--color-pharaoh-gold)]/20 text-[var(--color-pharaoh-gold)] hover:bg-[var(--color-pharaoh-gold)]/30'
                }`}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              {isListening ? 'Listening... Click to stop' : 'Click to speak'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
          isSpeaking ? 'bg-[var(--color-pharaoh-gold)] opacity-70 animate-pulse' : 
          isListening ? 'bg-red-500 opacity-70 animate-pulse' : 
          'bg-[var(--color-pharaoh-gold)] opacity-30 group-hover:opacity-50'
        }`}></div>
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isSpeaking ? 'border-[var(--color-pharaoh-gold)] bg-[var(--color-nile-blue)]' :
          isListening ? 'border-red-500 bg-[var(--color-nile-blue)]' :
          'border-[var(--color-pharaoh-gold)]/50 bg-[var(--color-obsidian)]'
        }`}>
          {isSpeaking ? (
            <Volume2 className="text-[var(--color-pharaoh-gold)]" size={28} />
          ) : (
            <MessageSquare className="text-[var(--color-pharaoh-gold)]" size={28} />
          )}
        </div>
      </button>
    </div>
  );
}
