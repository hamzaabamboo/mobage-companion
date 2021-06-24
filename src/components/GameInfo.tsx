import {
  Box,
  Stack,
  Text,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "state/index";
import { Game } from "types/Game";
import { EditGame } from "./EditGame";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

export const GameInfo = ({ game }: { game: Game }) => {
  const [edit, setEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<Dispatch>();
  const handleDelete = () => {
    dispatch.games.removeGame(game.id);
  };
  if (edit) {
    return <EditGame game={game} onComplete={() => setEditMode(false)} />;
  }

  return (
    <>
      <Stack>
        <Stack>
          {game.gameStamina.map((stam, idx) => (
            <Text key={idx}>
              {stam.name} : 0 / {stam.maxRegen} (Fill in HH:mm)
            </Text>
          ))}
        </Stack>
        <HStack>
          <Button colorScheme="yellow" onClick={() => setEditMode(true)}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        </HStack>
      </Stack>
      <DeleteConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
      />
    </>
  );
};
