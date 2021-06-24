import { Game } from "types/Game";

export const validateGame = (game: Partial<Game>): game is Game => {
  return (
    !!game.title &&
    !!game.gameStamina?.every((s) => s.maxRegen && s.name && s.regenRate > 0)
  );
};
