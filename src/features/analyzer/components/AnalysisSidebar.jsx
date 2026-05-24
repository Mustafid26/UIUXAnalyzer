import React from 'react';
import { Upload, AlertTriangle, Loader2, BarChart3, Target, ArrowRight, RotateCcw, Zap, Eye } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { analyzeImage } from '../../../services/api';
import { useAnalyzerStore } from '../../../store/useAnalyzerStore';

export const AnalysisSidebar = ({ result, setResult }) => {
  const { file, previewUrl, activePin, setActivePin } = useAnalyzerStore();

  const { mutate, isPending, error, reset: resetMutation } = useMutation({
    mutationFn: analyzeImage,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleAnalyze = () => {
    if (!file) return;
    mutate(file);
  };

  const handleReset = () => {
    setResult(null);
    resetMutation();
    setActivePin(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-accent';
  };

  const getScoreBorder = (score) => {
    if (score >= 80) return 'border-primary/30 shadow-neon-sm';
    if (score >= 60) return 'border-warning/30';
    return 'border-accent/30 shadow-neon-red';
  };

  return (
    <div className="lab-panel p-5 md:p-6 sticky top-[80px] h-[calc(100vh-160px)] flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
      <div className="corner-decoration pointer-events-none" />
      
      {!previewUrl ? (
        <div className="text-center flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="w-20 h-20 rounded-2xl border border-border/60 flex items-center justify-center mb-6 bg-surface/50">
            <Upload className="text-textMuted/40" size={36} />
          </div>
          <p className="font-display text-sm tracking-wider text-textMuted uppercase">Awaiting Input</p>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      ) : !result && !isPending ? (
        <div className="text-center flex-1 flex flex-col justify-center relative z-10">
          <div className="w-24 h-24 rounded-2xl border border-primary/20 flex items-center justify-center mx-auto mb-6 bg-primary/5 animate-float">
            <Eye className="text-primary" size={40} />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mx-auto mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">System Ready</span>
          </div>
          
          <h3 className="text-xl font-display font-bold mb-3 text-textLight tracking-wide">Begin Analysis</h3>
          <p className="text-textMuted text-sm mb-8 px-4 font-body leading-relaxed">
            Neural engine will evaluate layout composition, visual hierarchy, color contrast, and UX patterns.
          </p>
          
          <button 
            onClick={handleAnalyze}
            className="w-full lab-button-primary py-4 text-sm flex items-center justify-center gap-3"
          >
            <Zap size={16} />
            <span>Run Analysis</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : isPending ? (
        <div className="text-center flex-1 flex flex-col justify-center relative z-10 space-y-8">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center">
              <Loader2 className="text-primary animate-spin" size={40} />
            </div>
            <div className="absolute -inset-1 rounded-2xl border border-primary/10 animate-pulse-glow opacity-50" />
          </div>
          
          <div>
            <h3 className="font-display font-bold text-base mb-2 text-textLight tracking-wider uppercase">Processing</h3>
            <p className="text-textMuted text-sm font-body">Scanning layout, hierarchy, and patterns...</p>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <ProgressStep label="Layout scan" done />
            <ProgressStep label="Typography audit" />
            <ProgressStep label="Color analysis" />
            <ProgressStep label="UX evaluation" />
          </div>
        </div>
      ) : error ? (
        <div className="text-center flex-1 flex flex-col justify-center relative z-10">
          <div className="w-20 h-20 rounded-2xl border border-accent/30 flex items-center justify-center mx-auto mb-6 bg-accent/5">
            <AlertTriangle className="text-accent" size={36} />
          </div>
          <h3 className="text-lg font-display font-bold text-accent mb-3 tracking-wider uppercase">Error</h3>
          <p className="text-sm text-textMuted mb-8 px-4 break-words leading-relaxed font-body">
            {error.response?.data?.details || error.message || "Analysis failed. Check connection and retry."}
          </p>
          <button 
            onClick={handleAnalyze}
            className="w-full lab-button-danger py-3"
          >
            Retry Analysis
          </button>
        </div>
      ) : result ? (
        <div className="flex flex-col h-full overflow-hidden animate-fade-in relative z-10">
          
          {/* Score and Summary Section */}
          <div className="shrink-0 flex gap-3 mb-4">
            <div className={`shrink-0 w-24 rounded-lab border flex flex-col items-center justify-center p-3 ${getScoreBorder(result.score)}`}>
              <span className="font-mono text-[9px] text-textMuted uppercase tracking-widest mb-1">Score</span>
              <span className={`text-4xl font-display font-black ${getScoreColor(result.score)}`}>{result.score}</span>
              <span className="font-mono text-[9px] text-textMuted">/100</span>
            </div>
            
            <div className="flex-1 rounded-lab border border-border/40 bg-surfaceAlt/50 p-3 flex flex-col relative overflow-hidden">
              <div className="flex items-center gap-1.5 mb-2">
                <BarChart3 size={12} className="text-secondary" />
                <span className="font-display text-[10px] text-secondary uppercase tracking-widest font-bold">Summary</span>
              </div>
              <div className="overflow-y-auto custom-scrollbar pr-1 flex-1 max-h-[80px]">
                <p className="text-xs font-body leading-relaxed text-textLight/80">
                  {result.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="flex-1 flex flex-col min-h-0 rounded-lab border border-border/40 bg-surfaceAlt/30 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border/30 shrink-0">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <h3 className="font-display font-bold text-xs text-textLight uppercase tracking-widest">Findings</h3>
              </div>
              <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold tracking-wider">
                {result.improvements?.length || 0}
              </span>
            </div>
            
            <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 p-3">
              {result.improvements?.map((item, index) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-lab transition-all duration-200 cursor-pointer border ${
                    activePin === item.id 
                      ? 'bg-primary/5 border-primary/30 shadow-neon-sm' 
                      : 'bg-surface/50 border-transparent hover:border-border/60 hover:bg-surface/80'
                  }`}
                  onClick={() => setActivePin(item.id)}
                  onMouseEnter={() => setActivePin(item.id)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex gap-3">
                    <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-display font-black transition-colors duration-200 ${
                      activePin === item.id ? 'bg-primary text-background' : 'bg-surfaceAlt text-textMuted border border-border/40'
                    }`}>
                      {item.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-display text-xs font-bold mb-1 tracking-wide transition-colors duration-200 uppercase ${activePin === item.id ? 'text-primary' : 'text-textLight'}`}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-body text-textMuted leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Action */}
          <div className="pt-3 shrink-0">
            <button 
              onClick={handleReset}
              className="w-full lab-button py-3 flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} />
              <span>New Analysis</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProgressStep = ({ label, done }) => (
  <div className="flex items-center gap-2">
    <div className={`w-1.5 h-1.5 rounded-full ${done ? 'bg-primary' : 'bg-border animate-pulse-glow'}`} />
    <span className={`font-mono text-[10px] uppercase tracking-widest ${done ? 'text-primary' : 'text-textMuted/50'}`}>{label}</span>
    {done && <span className="font-mono text-[9px] text-primary ml-auto">OK</span>}
  </div>
);
