import { create } from 'zustand';

interface UIState {
  tooltip: {
    text: string;
    x: number;
    y: number;
    visible: boolean;
  };
  modalContent: React.ReactNode | null;
  modalFullScreen: boolean;
  lampOn: boolean;
  dayNight: number; // 0 = day, 1 = night
  fastForwardDayNight: (duration?: number) => Promise<void>;
  isSleeping: boolean;
  startSleep: (duration?: number) => Promise<void>;
  showTooltip: (text: string, x: number, y: number) => void;
  hideTooltip: () => void;
  openModal: (content: React.ReactNode, fullScreen?: boolean) => void;
  closeModal: () => void;
  toggleLamp: () => void;
}

export const useUIStore = create<UIState>(set => ({
  tooltip: { text: '', x: 0, y: 0, visible: false },
  modalContent: null,
  modalFullScreen: false,
  lampOn: true,
  dayNight: 0,
  isSleeping: false,

  showTooltip: (text, x, y) => set({ tooltip: { text, x, y, visible: true } }),

  hideTooltip: () => set({ tooltip: { text: '', x: 0, y: 0, visible: false } }),

  openModal: (content, fullScreen = false) =>
    set({ modalContent: content, modalFullScreen: fullScreen }),
  closeModal: () => set({ modalContent: null, modalFullScreen: false }),

  fastForwardDayNight: (duration = 3000) =>
    new Promise<void>(resolve => {
      // animate dayNight 0 -> 1 -> 0 over `duration` ms
      let start: number | null = null;
      const half = duration / 2;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        if (elapsed <= half) {
          const t = Math.min(1, elapsed / half);
          set({ dayNight: t });
          requestAnimationFrame(step);
          return;
        }
        const elapsed2 = elapsed - half;
        if (elapsed2 <= half) {
          const t = Math.max(0, 1 - elapsed2 / half);
          set({ dayNight: t });
          requestAnimationFrame(step);
          return;
        }
        // finished
        set({ dayNight: 0 });
        resolve();
      }

      requestAnimationFrame(step);
    }),

  toggleLamp: () => set(state => ({ lampOn: !state.lampOn })),
  startSleep: (duration = 3000) =>
    new Promise<void>(resolve => {
      set({ isSleeping: true });
      setTimeout(() => {
        set({ isSleeping: false });
        resolve();
      }, duration);
    }),
}));
