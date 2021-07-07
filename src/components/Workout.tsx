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
      px={{ md: '6', lg: '8', xl: '12' }}
      py={{ md: '5', lg: '7', xl: '9' }}
      minHeight={{ md: '44', lg: '48', xl: '56' }}
      justify="center"
      _hover={{
        cursor: 'pointer',
        opacity: '0.8',
      }}
    >
      <Flex justify="space-around" align="center">
        <Text
          fontWeight="medium"
          fontSize={{ md: 'xl', lg: '2xl', xl: '3xl' }}
          color="white"
        >
          {title}
        </Text>
        <Text fontSize={{ md: 'sm', lg: 'lg', xl: 'xl' }} color="blue.500">
          {exerciseNumber} exercícios
        </Text>
      </Flex>
      {/* {{ lg: '', xl: '' }} */}
      <Text
        maxW="96"
        textAlign="center"
        mt="5"
        fontWeight="medium"
        fontSize={{ md: 'sm', lg: 'lg', xl: 'xl' }}
        alignSelf="center"
      >
        {description}
      </Text>
    </Flex>
  );
}
