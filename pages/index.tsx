import { Box, Stack, Flex, Text } from "@chakra-ui/react";
import { AddGame } from "components/AddGame";
import { GameInformationForm } from "components/GameInformationForm";
import { GameList } from "components/GameList";
import { useStore } from "hooks/useStore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch, store } from "state/index";

export default function Home() {
  const games = useStore((store) => store.games.games);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.games.loadGamesFromStorage();
  }, [dispatch.games]);

  return (
    <Flex minH="full" w="full" justifyContent="center">
      <Stack w={["100%", "70%"]} mt={[4, 12]}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Mobage Companion V1.0
          </Text>
        </Box>
        <Box>
          <AddGame />
        </Box>
        {games.length > 0 && (
          <>
            <Text fontSize="2xl" fontWeight="bold">
              Added Games
            </Text>
            <GameList />
          </>
        )}
      </Stack>
    </Flex>
  );
}
