import { createModel } from "@rematch/core";
import { Game } from "types/Game";
import { uuid } from "uuidv4";
import { RootModel } from "./models";

export const games = createModel<RootModel>()({
  state: {
    games: [] as Game[],
  },
  reducers: {
    addGame: (state, newGame: Game) => {
      state.games = [...state.games, { ...newGame, id: uuid() }];
      localStorage?.setItem("savedGames", JSON.stringify(state.games));
      return state;
    },
    editGame: (state, id, data: Game) => {
      state.games = state.games.map((g) => (g.id === id ? data : g));
      localStorage?.setItem("savedGames", JSON.stringify(state.games));
      return state;
    },
    removeGame: (state, id: string) => {
      state.games = state.games.filter((g) => g.id !== id);
      return state;
    },
    setGames: (state, games: Game[]) => {
      state.games = games;
      return state;
    },
  },
  effects: (dispatch) => ({
    loadGamesFromStorage: () => {
      dispatch.games.setGames(
        JSON.parse(localStorage?.getItem("savedGames") ?? "null") ?? []
      );
    },
  }),
});
