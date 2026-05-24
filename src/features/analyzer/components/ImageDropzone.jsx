import { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Crosshair } from 'lucide-react';
import { useAnalyzerStore } from '../../../store/useAnalyzerStore';

export const ImageDropzone = () => {
  const fileInputRef = useRef(null);
  const setFile = useAnalyzerStore(state => state.setFile);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    }
  };

  return (
    <>
      <div 
        className={`relative w-full aspect-square sm:aspect-video lg:aspect-[2/1] max-w-5xl mx-auto rounded-lab border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group overflow-hidden ${
          isDragging 
            ? 'border-primary/60 bg-primary/5 shadow-neon-sm' 
            : 'border-border/60 bg-surface/30 hover:border-primary/40 hover:bg-surface/60 hover:shadow-panel'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Tech decorative corners */}
        <div className="corner-decoration pointer-events-none" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2 opacity-30 pointer-events-none">
          <Crosshair size={12} className="text-primary" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary">Target Area</span>
        </div>

        <div className="absolute top-4 right-4 flex gap-1 pointer-events-none opacity-20">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-6 sm:p-10 transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="relative mb-6">
            <div className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center relative bg-surface transition-all duration-300 ${
              isDragging ? 'border-primary shadow-neon-sm text-primary' : 'border-border/80 text-textMuted group-hover:border-primary/50 group-hover:text-primary'
            }`}>
              <Upload size={32} className={`transition-transform duration-500 ${isDragging ? 'scale-110 -translate-y-1' : 'group-hover:scale-110 group-hover:-translate-y-1'}`} />
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 text-textLight tracking-wide">
            {isDragging ? 'Release to upload' : 'Initialize Analysis'}
          </h3>
          
          <p className="text-textMuted text-sm sm:text-base font-body max-w-md mx-auto mb-8 leading-relaxed">
            Drag & drop a high-res screenshot here, or click to browse. Supported formats: JPG, PNG, WebP.
          </p>
          
          <div className="lab-button-primary inline-flex items-center gap-2">
            <ImageIcon size={14} />
            <span>Select File</span>
          </div>
        </div>

        {/* Animated scanning line when dragging */}
        {isDragging && <div className="scanline opacity-50" />}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileSelect}
      />
    </>
  );
};
