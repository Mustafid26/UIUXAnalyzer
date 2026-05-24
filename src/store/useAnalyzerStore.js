import { create } from 'zustand';

export const useAnalyzerStore = create((set) => ({
  file: null,
  previewUrl: null,
  activePin: null,
  setFile: (file) => {
    const previewUrl = file ? URL.createObjectURL(file) : null;
    set({ file, previewUrl, activePin: null });
  },
  setActivePin: (pinId) => set({ activePin: pinId }),
  reset: () => set({ file: null, previewUrl: null, activePin: null }),
}));
