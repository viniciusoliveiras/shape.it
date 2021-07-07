import { Flex, Text } from '@chakra-ui/react';

interface WorkoutProps {
  title: string;
  exerciseNumber: number;
  description: string;
}

export function Workout({ title, exerciseNumber, description }: WorkoutProps) {
  return (
    <Flex
      flexDirection="column"
      bgColor="gray.700"
      borderRadius="1rem"
      px="12"
      py="9"
      minHeight="56"
      justify="center"
    >
      <Flex justify="space-around" align="center">
        <Text fontWeight="medium" fontSize="3xl" color="white">
          {title}
        </Text>
        <Text fontSize="xl" color="blue.500">
          {exerciseNumber} exercícios
        </Text>
      </Flex>
      <Text
        maxW="96"
        textAlign="center"
        mt="5"
        fontWeight="medium"
        fontSize="xl"
      >
        {description}
      </Text>
    </Flex>
  );
}
