import { Button, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Game } from "types/Game";
import { GameInformationForm } from "./GameInformationForm";
import { useDispatch } from "react-redux";
import { Dispatch } from "state/index";
import { validateGame } from "src/utils/validateGames";

export const EditGame = ({
  game,
  onComplete,
}: {
  game: Game;
  onComplete: () => void;
}) => {
  const [currentEditGame, setCurrentEditGame] = useState<Partial<Game>>({});
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    setCurrentEditGame(game);
  }, [game]);

  const editGame = () => {
    if (!validateGame(currentEditGame)) return;
    dispatch.games.editGame(game.id, currentEditGame);
    onComplete();
  };

  return (
    <Box>
      <GameInformationForm
        value={currentEditGame}
        onChange={setCurrentEditGame}
      />
      <Button colorScheme="green" rightIcon={<AddIcon />} onClick={editGame}>
        Save
      </Button>
    </Box>
  );
};
