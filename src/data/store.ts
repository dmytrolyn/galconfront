import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Game {
  id: string;
  // name: string;
  // usersAmount?: number;
}

interface Data {
  nickname?: string;
  games: Game[];
  color: string;
}

interface Actions {
  setNickname: (nickname: string) => void;
  setGames: (games: Game[]) => void;
  addGame: (game: Game) => void;
  setColor: (color: string) => void;
}

export const useStore = create<Data & Actions>()(
  persist(
    (set) => ({
      nickname: undefined,
      games: [],
      color: "black",
      setNickname: (nickname) => set(() => ({ nickname })),
      setGames: (games: Game[]) => set(() => ({ games })),
      setColor: (color: string) => set(() => ({ color })),
      addGame: (game: Game) =>
        set((state) => ({ games: [...state.games, game] })),
    }),
    {
      name: "Storage",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ nickname, color }) => ({
        nickname,
        color,
      }),
    }
  )
);
