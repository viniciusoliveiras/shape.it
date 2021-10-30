import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  type?: string;
  error?: FieldError;
  labelColor?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, labelColor, type = 'text', error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={labelColor}>
          {label}
        </FormLabel>
      )}

      <ChakraInput
        name={name}
        id={name}
        type={type}
        bgColor="gray.900"
        focusBorderColor="green.500"
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
