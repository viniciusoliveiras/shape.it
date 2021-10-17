/* eslint-disable no-param-reassign */
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
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Header } from '../../../components/Header';
import { Input } from '../../../components/input';
import { supabase } from '../../../services/supabase';

interface EditWorkoutProps {
  workout: {
    id: string;
    nome: string;
    descricao: string;
    usuario: string;
  };
}

interface EditWorkoutData {
  name: string;
  description: string;
}

const schema = yup.object({
  name: yup.string(),
  description: yup.string().max(150, 'Máximo de 150 caracteres'),
});

export default function EditWorkout({ workout }: EditWorkoutProps) {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWorkoutData>({
    resolver: yupResolver(schema),
  });

  const editWorkout: SubmitHandler<EditWorkoutData> = async values => {
    setIsSending(true);

    if (values.name.trim() === '') {
      values.name = workout.nome;
    }

    if (values.description.trim() === '') {
      values.description = workout.descricao;
    }

    const { data } = await supabase
      .from('treino')
      .update({
        nome: values.name,
        descricao: values.description,
      })
      .eq('id', workout.id)
      .eq('usuario', workout.usuario);

    if (data) {
      router.push(`/workouts/${workout.id}`);

      toast.success('Treino editado');
    }

    setIsSending(false);
  };

  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <Header />

      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '8', lg: '10', xl: '0' }}
        mt={{ base: '24', lg: '28', xl: '32' }}
        flexDirection="column"
      >
        <Heading fontSize="3xl" mb="6" userSelect="none">
          Editar treino
        </Heading>

        <Flex
          as="form"
          flex="1"
          flexDirection="column"
          bgColor="gray.700"
          p="6"
          borderRadius="md"
          onSubmit={handleSubmit(editWorkout)}
        >
          <Input
            {...register('name')}
            label="Nome do treino"
            placeholder={workout.nome}
            error={errors.name}
          />

          <FormControl mt="4" error={errors.description}>
            <FormLabel>Descrição</FormLabel>

            <Textarea
              {...register('description')}
              bgColor="gray.900"
              focusBorderColor="yellow.500"
              minH="3xs"
              maxH="2xs"
              p="4"
              placeholder={workout.descricao}
              size="lg"
            />

            <FormErrorMessage>erro</FormErrorMessage>
          </FormControl>

          <Flex alignSelf={{ base: 'center', md: 'flex-end' }} mt="10">
            <Button
              mr="5"
              bgColor="gray.200"
              color="gray.900"
              _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
              onClick={() => router.push(`/workouts/${router.query.id}`)}
              disabled={isSending}
            >
              Cancelar
            </Button>
            <Button
              bgColor="yellow.500"
              color="gray.900"
              _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
              type="submit"
              isLoading={isSending}
              disabled={isSending}
            >
              Salvar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx.params) {
    const { id } = ctx.params;

    const workoutResponse = await supabase
      .from('treino')
      .select('*')
      .eq('id', id);

    const workout = workoutResponse?.data && workoutResponse?.data[0];

    return {
      props: { workout },
    };
  }

  return {
    props: {},
  };
};
