import { Models } from "@rematch/core";
import { games } from "./games";

export interface RootModel extends Models<RootModel> {
  games: typeof games;
}

export const models: RootModel = { games };
