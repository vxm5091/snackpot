import { InputProps } from '@rneui/base';
import { Input, useTheme } from '@rneui/themed';
import { forwardRef } from 'react';
import {
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { TextInput } from 'react-native';

export interface IControlledInputProps
  extends UseControllerProps,
    Omit<InputProps, 'defaultValue' | 'ref'> {}

export const ControlledInput = forwardRef<TextInput, IControlledInputProps>(( {
  name,
  rules,
  defaultValue,
  control,
  ...props
}, ref) => {
  const { theme } = useTheme();
  const { field } = useController({
    name,
    defaultValue,
    control,
    rules,
  });
  
  console.info(field.value)

  return (
    <Input
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      returnKeyType={'done'}
      blurOnSubmit={true}
      {...props}
    />
  );
});
