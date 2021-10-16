import {
  Flex,
  Input,
  Textarea,
  Button,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiErrorWarningFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabase';

interface WorkoutFormData {
  name: string;
  description?: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().max(150, 'Máximo de 150 caracteres'),
});

export function NewWorkoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkoutFormData>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createWorkout: SubmitHandler<WorkoutFormData> = async values => {
    setIsLoading(true);

    await supabase.from('treino').insert([
      {
        id: uuidv4(),
        nome: values.name,
        descricao: values.description,
        usuario: user?.id,
      },
    ]);

    setIsLoading(false);

    reset();

    Router.push('/workouts');

    toast.success('Treino criado');
  };

  async function handleCancel() {
    reset();
    Router.push('/workouts');
    reset();
  }

  return (
    <Flex
      as="form"
      flex="1"
      flexDirection="column"
      bgColor="gray.700"
      borderRadius="2xl"
      px={{ base: '6', md: '8', lg: '16' }}
      py={{ base: '4', md: '6', lg: '8' }}
      onSubmit={handleSubmit(createWorkout)}
    >
      <FormLabel
        fontSize="2xl"
        fontWeight="medium"
        lineHeight="9"
        htmlFor="name"
      >
        Nome do treino
      </FormLabel>
      <Input
        type="text"
        mt="2"
        border="none"
        backgroundColor="gray.900"
        height="12"
        p="4"
        id="name"
        webkit-autofill="-webkit-box-shadow: 0 0 0 30px white inset"
        error={errors.name}
        {...register('name')}
      />
      <Flex align="center" mt="2" color="red.500" fontSize="lg">
        <Text mr="2">{errors.name?.message && <RiErrorWarningFill />}</Text>
        <Text>{errors.name?.message}</Text>
      </Flex>

      <FormLabel
        fontSize="2xl"
        fontWeight="medium"
        lineHeight="9"
        mt="5"
        htmlFor="description"
      >
        Descrição
      </FormLabel>
      <Textarea
        mt="2"
        border="none"
        backgroundColor="gray.900"
        minH="36"
        maxH="56"
        p="4"
        id="description"
        {...register('description')}
      />
      <Flex align="center" mt="2" color="red.500" fontSize="lg">
        <Text mr="2">
          {errors.description?.message && <RiErrorWarningFill />}
        </Text>
        <Text>{errors.description?.message}</Text>
      </Flex>

      <Flex alignSelf={{ base: 'center', md: 'flex-end' }} mt="10">
        <Button
          mr="5"
          bgColor="gray.200"
          color="gray.900"
          _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          bgColor="yellow.500"
          color="gray.900"
          _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
          type="submit"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  );
}
