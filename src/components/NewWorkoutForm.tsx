import { Flex, Input, Text, Textarea, Button } from '@chakra-ui/react';

export function NewWorkoutForm() {
  return (
    <Flex
      as="form"
      flex="1"
      flexDirection="column"
      bgColor="gray.700"
      borderRadius="2xl"
      px="16"
      py="8"
    >
      <Text fontSize="2xl" fontWeight="medium" lineHeight="9">
        Nome do treino
      </Text>
      <Input
        type="text"
        mt="2"
        border="none"
        backgroundColor="gray.900"
        height="12"
        p="4"
      />

      <Text fontSize="2xl" fontWeight="medium" lineHeight="9" mt="5">
        Descrição
      </Text>
      <Textarea
        mt="2"
        border="none"
        backgroundColor="gray.900"
        minH="36"
        maxH="56"
        p="4"
      />

      <Flex alignSelf="flex-end" mt="10">
        <Button
          mr="5"
          bgColor="gray.200"
          color="gray.900"
          _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
        >
          Cancelar
        </Button>
        <Button
          bgColor="yellow.500"
          color="gray.900"
          _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  );
}
