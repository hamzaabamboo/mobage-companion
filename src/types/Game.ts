export interface Game {
  id: string;
  icon?: string;
  title: string;
  gameStamina: GameStamina[];
}

export interface GameStamina {
  id: string;
  name: string;
  icon?: string;
  regenRate: number;
  maxRegen: number;
}
