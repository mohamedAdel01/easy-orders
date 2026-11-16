import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type LoadingTuple = [service: string, isLoading: boolean];

export interface GlobalState {
  loadingStates: Record<string, boolean>;
  isGlobalLoading: boolean;
  setLoading: (arg: LoadingTuple | boolean) => void;
  clearLoading: () => void;
  isLoading: (service?: string) => boolean;
}

export const useGlobalStore = create<GlobalState>()(
  immer((set, get) => ({
    loadingStates: {},
    isGlobalLoading: false,

    setLoading: (arg) => {
      set((state) => {
        if (typeof arg === 'boolean') {
          state.isGlobalLoading = arg;
          return;
        }

        const [service, isLoading] = arg;
        if (isLoading) {
          state.loadingStates[service] = true;
        } else {
          delete state.loadingStates[service];
        }

        state.isGlobalLoading = Object.values(state.loadingStates).some(Boolean);
      });
    },

    clearLoading: () => {
      set((state) => {
        state.loadingStates = {};
        state.isGlobalLoading = false;
      });
    },

    isLoading: (service?: string) => {
      const state = get();
      if (!service) {
        return state.isGlobalLoading;
      }
      return Boolean(state.loadingStates[service]);
    },
  }))
);

// Shorthand helper matching Unity/AGENTS.md standard: globalStore.setLoading([service, true/false])
export const globalStore = {
  setLoading: (arg: LoadingTuple | boolean) => useGlobalStore.getState().setLoading(arg),
  clearLoading: () => useGlobalStore.getState().clearLoading(),
  isLoading: (service?: string) => useGlobalStore.getState().isLoading(service),
  getState: () => useGlobalStore.getState(),
};
