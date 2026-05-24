import React, { useState } from 'react';
import { useAnalyzerStore } from '../store/useAnalyzerStore';
import { ImageDropzone } from '../features/analyzer/components/ImageDropzone';
import { AnnotatedScreenshot } from '../features/analyzer/components/AnnotatedScreenshot';
import { AnalysisSidebar } from '../features/analyzer/components/AnalysisSidebar';
import { Scan, Activity, Cpu, Zap } from 'lucide-react';

export const AnalyzerPage = () => {
  const { previewUrl } = useAnalyzerStore();
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lab bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Scan size={18} className="text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-sm font-bold tracking-[0.15em] text-textLight uppercase">Nilai</span>
              <span className="font-display text-sm font-bold tracking-[0.15em] text-primary uppercase">In Dong</span>
              {/* <span className="text-textMuted font-mono text-[10px] ml-1 hidden sm:inline">v2.0</span> */}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lab border border-border/40 bg-surface/50">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-[10px] text-textMuted uppercase tracking-wider">Gemini AI Online</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-textMuted">
              <StatusIndicator icon={<Cpu size={12} />} label="Neural" />
              <StatusIndicator icon={<Activity size={12} />} label="Ready" />
              <StatusIndicator icon={<Zap size={12} />} label="Fast" />
            </div>
          </div>
        </div>
      </nav>

      <div className={`flex-1 flex flex-col transition-all duration-700 ease-out ${previewUrl ? '' : 'justify-center'}`}>
        {!previewUrl && (
          <header className="text-center px-4 pt-12 md:pt-20 pb-8 md:pb-12 animate-fade-in relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-[11px] text-primary uppercase tracking-widest">UI/UX Analysis Engine</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.1] mb-6">
              <span className="text-textLight block">Scan Your</span>
              <span className="text-gradient block mt-1">Interface.</span>
            </h2>

            <p className="text-textMuted text-base sm:text-lg md:text-xl font-body font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
              Upload a screenshot. Our neural engine dissects every pixel —
              <span className="text-textLight/80"> layout, hierarchy, contrast, usability</span> —
              and maps actionable insights directly onto your design.
            </p>

            <div className="flex items-center justify-center gap-8 mt-10 text-textMuted/50">
              <div className="hidden md:block h-px w-16 bg-gradient-to-r from-transparent to-border" />
              <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span>Layout</span>
                <span className="text-primary/30">///</span>
                <span>Typography</span>
                <span className="text-primary/30">///</span>
                <span>Color</span>
                <span className="text-primary/30">///</span>
                <span>UX</span>
              </div>
              <div className="hidden md:block h-px w-16 bg-gradient-to-l from-transparent to-border" />
            </div>
          </header>
        )}

        <div className={`w-full mx-auto px-4 md:px-6 lg:px-8 pb-8 ${previewUrl ? 'max-w-[1800px] flex-1 flex flex-col' : 'max-w-4xl'}`}>
          {!previewUrl ? (
            <div className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <ImageDropzone />
            </div>
          ) : (
            <main className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-4 lg:gap-6 items-start py-4 lg:py-6 animate-fade-in flex-1">
              <div className="w-full h-full flex flex-col">
                <AnnotatedScreenshot result={result} />
              </div>
              <div className="h-full">
                <AnalysisSidebar result={result} setResult={setResult} />
              </div>
            </main>
          )}
        </div>
      </div>

      <footer className="border-t border-border/30 py-4 mt-auto">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-textMuted/40 uppercase tracking-widest">DesignLab AI /// UI/UX Analyzer</span>
          <span className="font-mono text-[10px] text-textMuted/40 uppercase tracking-widest">Powered by Gemini</span>
        </div>
      </footer>
    </div>
  );
};

const StatusIndicator = ({ icon, label }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-primary/60">{icon}</span>
    <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
  </div>
);
