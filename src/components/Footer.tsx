import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { MdFitnessCenter, MdAdd, MdOutlineLogout } from 'react-icons/md';

export function Footer() {
  return (
    <Flex py="2" px="6" position="fixed" left="0" bottom="0" bgColor="gray.700">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="xl"
        >
          <MdFitnessCenter />
          <Text mt="2">Treinos</Text>
        </GridItem>

        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="xl"
        >
          <MdAdd />
          <Text mt="2" textAlign="center">
            Novo treino
          </Text>
        </GridItem>

        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="xl"
        >
          <MdOutlineLogout />
          <Text mt="2">Sair</Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}
