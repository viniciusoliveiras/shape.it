/* eslint-disable no-use-before-define */
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Heading,
  Button,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { Header } from 'components/Header';
import { Input } from 'components/input';
import { useAuth } from 'hooks/useAuth';
import { supabase } from 'services/supabase';

interface WorkoutFormData {
  name: string;
  description?: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().max(150, 'Máximo de 150 caracteres'),
});

export default function NewWorkout() {
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
    <>
      <Head>
        <title>shape.it</title>

        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Header />

      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '8', lg: '10', xl: '0' }}
        mt={{ base: '24', lg: '28', xl: '32' }}
        flexDirection="column"
      >
        <Heading fontSize="3xl" mb="6" userSelect="none">
          Criar treino
        </Heading>

        <Flex
          as="form"
          flex="1"
          flexDirection="column"
          bgColor="gray.700"
          p="6"
          borderRadius="md"
          onSubmit={handleSubmit(createWorkout)}
        >
          <Input
            {...register('name')}
            label="Nome do treino"
            error={errors.name}
          />

          <FormControl mt="4" error={errors.description}>
            <FormLabel>Descrição</FormLabel>

            <Textarea
              {...register('description')}
              bgColor="gray.900"
              focusBorderColor="green.500"
              minH="3xs"
              maxH="2xs"
              p="4"
              size="lg"
            />

            <FormErrorMessage>erro</FormErrorMessage>
          </FormControl>

          <Flex alignSelf={{ base: 'center', md: 'flex-end' }} mt="10">
            <Button
              mr="5"
              colorScheme="gray"
              _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
              onClick={() => handleCancel()}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
              type="submit"
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
