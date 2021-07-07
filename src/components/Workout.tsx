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
      px={{ base: '4', md: '6', lg: '8', xl: '12' }}
      py={{ base: '3', md: '5', lg: '7', xl: '9' }}
      minHeight={{ base: '40', md: '44', lg: '48', xl: '56' }}
      justify="center"
      _hover={{
        cursor: 'pointer',
        opacity: '0.8',
      }}
    >
      <Flex justify="space-around" align="center">
        <Text
          fontWeight="medium"
          fontSize={{ base: 'xl', lg: '2xl', xl: '3xl' }}
          color="white"
        >
          {title}
        </Text>
        <Text fontSize={{ base: 'sm', lg: 'lg', xl: 'xl' }} color="blue.500">
          {exerciseNumber} {exerciseNumber > 1 ? 'exercícios' : 'exercício'}
        </Text>
      </Flex>
      <Text
        maxW="96"
        textAlign="center"
        mt="5"
        fontWeight="medium"
        fontSize={{ base: 'sm', lg: 'lg', xl: 'xl' }}
        alignSelf="center"
      >
        {description}
      </Text>
    </Flex>
  );
}
