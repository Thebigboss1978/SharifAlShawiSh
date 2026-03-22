import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Loader2, Sparkles, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function ImageAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        
        // Extract base64 data and mime type
        const matches = base64String.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          setMimeType(matches[1]);
          setBase64Image(matches[2]);
        }
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!base64Image || !mimeType) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: 'Analyze this image in the context of Egyptian tourism and the Pyramids. Describe what you see, its historical significance if applicable, and how it relates to the AlArab Club 777 experience in Nazlet El-Semman. Be descriptive, engaging, and professional.',
            },
          ],
        },
      });

      setAnalysisResult(response.text || "Could not analyze the image.");
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult("An error occurred while analyzing the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setBase64Image(null);
    setMimeType(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Digital <span className="text-gradient-gold">Pyramids Analysis</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload a photo of the Pyramids or any Egyptian landmark. Our advanced Gemini AI will analyze it and provide historical context and insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Upload Section */}
        <div className="glass-panel p-8 rounded-3xl border border-[var(--color-pharaoh-gold)]/30 flex flex-col items-center justify-center min-h-[400px]">
          {!selectedImage ? (
            <div 
              className="w-full h-full border-2 border-dashed border-[var(--color-pharaoh-gold)]/40 rounded-2xl flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:bg-[var(--color-pharaoh-gold)]/5 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-nile-blue-light)] flex items-center justify-center mb-6">
                <Upload className="text-[var(--color-pharaoh-gold)]" size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">Upload an Image</h3>
              <p className="text-gray-400 text-sm mb-6">Drag and drop or click to browse</p>
              <button className="px-6 py-3 bg-[var(--color-pharaoh-gold)] text-black font-bold rounded-full hover:bg-[var(--color-pharaoh-gold-light)] transition-colors">
                Select File
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center">
              <div className="relative w-full aspect-video md:aspect-square max-h-[400px] rounded-2xl overflow-hidden border border-[var(--color-pharaoh-gold)]/30 mb-6">
                <img 
                  src={selectedImage} 
                  alt="Uploaded" 
                  className="w-full h-full object-contain bg-black/50"
                />
                <button 
                  onClick={clearImage}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 bg-[var(--color-pharaoh-gold)] text-black font-bold rounded-xl hover:bg-[var(--color-pharaoh-gold-light)] transition-colors disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Analyzing with Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles size={24} />
                    Analyze Image
                  </>
                )}
              </button>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Results Section */}
        <div className="glass-panel p-8 rounded-3xl border border-[var(--color-pharaoh-gold)]/30 flex flex-col">
          <h3 className="text-2xl font-serif font-bold text-[var(--color-pharaoh-gold)] mb-6 flex items-center gap-3">
            <ImageIcon size={28} />
            AI Analysis
          </h3>
          
          <div className="flex-grow bg-[var(--color-nile-blue-light)]/50 rounded-2xl p-6 border border-white/5 overflow-y-auto">
            {isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-[var(--color-pharaoh-gold)]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[var(--color-pharaoh-gold)] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="font-medium animate-pulse">Decoding the mysteries...</p>
              </div>
            ) : analysisResult ? (
              <div className="prose prose-invert prose-gold max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {analysisResult}
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
                <Sparkles size={48} className="mb-4 opacity-20" />
                <p>Upload an image and click analyze to see the AI's interpretation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
