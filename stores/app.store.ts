import { AppState, LoginUser } from "@/types/app_type";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface AppStore extends AppState {
  setUser: (user: LoginUser | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLocale: (locale: string) => void;
}

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
};

// ✅ 改成工厂函数，动态 import idb-keyval
const createIndexedDBStorage = (): StateStorage => ({
  getItem: async (name) => {
    const { get } = await import("idb-keyval");
    const value = await get(name);
    return value ? JSON.stringify(value) : null;
  },
  setItem: async (name, value) => {
    const { set } = await import("idb-keyval");
    await set(name, JSON.parse(value));
  },
  removeItem: async (name) => {
    const { del } = await import("idb-keyval");
    await del(name);
  },
});

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLocale: (locale: string) => set({ locale }),
    }),
    {
      name: "icms-app-storage",
      storage: createJSONStorage(createIndexedDBStorage),
      partialize: (state) => ({
        user: state.user,
        locale: state.locale,
      }),
    }
  )
);