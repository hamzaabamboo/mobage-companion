import {
  AccordionItem,
  Accordion,
  Box,
  Text,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Image,
} from "@chakra-ui/react";
import { useStore } from "hooks/useStore";
import { GameInfo } from "./GameInfo";

export const GameList = () => {
  const games = useStore((store) => store.games.games);

  return (
    <Accordion allowToggle allowMultiple>
      {games.map((game) => {
        return (
          <AccordionItem key={game.id}>
            <AccordionButton>
              {game.icon && (
                <Image src={game.icon} maxW={16} maxH="auto" mr={2} />
              )}
              <Box fontSize="xl" flex={1} fontWeight="bold" textAlign="left">
                {game.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <GameInfo game={game} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
