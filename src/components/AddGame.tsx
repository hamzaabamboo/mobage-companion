import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Game } from "types/Game";
import { GameInformationForm } from "./GameInformationForm";
import { useDispatch } from "react-redux";
import { Dispatch } from "state/index";
import { validateGame } from "src/utils/validateGames";

export const AddGame = () => {
  const [newGame, setNewGame] = useState<Partial<Game>>({});
  const dispatch = useDispatch<Dispatch>();
  const addGame = () => {
    if (!validateGame(newGame)) return;
    dispatch.games.addGame(newGame);
    setNewGame({});
  };
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Add Game
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <GameInformationForm value={newGame} onChange={setNewGame} />
          <Button colorScheme="green" rightIcon={<AddIcon />} onClick={addGame}>
            Add
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
