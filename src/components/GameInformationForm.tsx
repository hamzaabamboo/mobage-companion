import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Button,
  Select,
  HStack,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Game, GameStamina } from "types/Game";

export const GameInformationForm = ({
  value,
  onChange,
}: {
  value?: Partial<Game>;
  onChange?: (game: Partial<Game>) => void;
}) => {
  const { title, icon, gameStamina } = value ?? {};

  const handleChange = (change: Partial<Game>) => {
    onChange && onChange({ ...value, ...change });
  };

  return (
    <Stack>
      <HStack>
        <Text>Game Title</Text>
        <Input
          value={title ?? ""}
          onChange={(e) => handleChange({ title: e.currentTarget.value })}
        />
      </HStack>
      <HStack>
        <Text>Icon (optional)</Text>
        <Input
          value={icon ?? ""}
          onChange={(e) => handleChange({ icon: e.currentTarget.value })}
        />
      </HStack>
      <Button
        rightIcon={<AddIcon />}
        onClick={() =>
          handleChange({
            gameStamina: gameStamina ? [...gameStamina, {} as GameStamina] : [],
          })
        }
      >
        Add Stamina Counter
      </Button>
      <Stack flexWrap="wrap" flexDirection="row">
        {gameStamina?.map((stam, gameIdx) => (
          <GameStaminaInformation
            key={stam.id}
            value={stam}
            onChange={(change) =>
              handleChange({
                gameStamina: gameStamina.map((g, idx) =>
                  idx === gameIdx ? change : g
                ),
              })
            }
            onDelete={() => {
              handleChange({
                gameStamina: gameStamina.filter((_, idx) => idx !== gameIdx),
              });
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const UNITS = [
  { name: "Seconds", value: 1000 },
  { name: "Minutes", value: 6000 },
  { name: "Hours", value: 36000 },
];

export const GameStaminaInformation = ({
  value,
  onChange,
  onDelete,
}: {
  value: GameStamina;
  onChange: (change: GameStamina) => void;
  onDelete: () => void;
}) => {
  const { name, maxRegen, icon, regenRate } = value ?? {};
  const [selectedUnit, setSelectedUnit] = useState(6000);

  const handleChange = (v: Partial<GameStamina>) => {
    return onChange({ ...value, ...v });
  };
  return (
    <Box w="50%" p={2}>
      <HStack>
        <Text>Stamina Name</Text>
        <Input
          type="text"
          value={name ?? ""}
          onChange={(v) => handleChange({ name: v.currentTarget.value })}
        />
      </HStack>
      <HStack>
        <Text>Icon (optional)</Text>
        <Input
          value={icon ?? ""}
          onChange={(e) => handleChange({ icon: e.currentTarget.value })}
        />
      </HStack>
      <HStack>
        <Text>Maximum Stamina</Text>
        <Input
          type="number"
          value={maxRegen ?? ""}
          onChange={(v) =>
            handleChange({ maxRegen: Number(v.currentTarget.value) })
          }
        />
      </HStack>
      <HStack>
        <Text>Regeneration Rate</Text>
        <Input
          type="number"
          value={regenRate / selectedUnit ?? ""}
          onChange={(v) =>
            handleChange({
              regenRate: Number(v.currentTarget.value) * selectedUnit,
            })
          }
        />
        <Select
          value={selectedUnit}
          onChange={(v) => {
            setSelectedUnit(Number(v.currentTarget.value));
            handleChange({
              regenRate:
                (regenRate / selectedUnit) * Number(v.currentTarget.value),
            });
          }}
        >
          {UNITS.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </HStack>
      <Button colorScheme="red" onClick={onDelete}>
        Delete
      </Button>
    </Box>
  );
};
