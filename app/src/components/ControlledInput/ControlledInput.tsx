import { InputProps } from '@rneui/base';
import { Input, useTheme } from '@rneui/themed';
import { forwardRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native';
import { colorWithOpacity } from 'shared/format';

export interface IControlledInputProps
  extends UseControllerProps,
    Omit<InputProps, 'defaultValue' | 'ref'> {}

export const ControlledInput = forwardRef<TextInput, IControlledInputProps>(
  ({ name, rules, defaultValue, control, ...props }, ref) => {
    const { theme } = useTheme();
    const { field, fieldState } = useController({
      name,
      defaultValue,
      control,
      rules,
    });

    return (
      <Input
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        returnKeyType={'done'}
        blurOnSubmit={true}
        {...props}
        containerStyle={{
          flex: 1,
          borderBottomWidth: 0,
          alignSelf: 'center',
          
          // borderWidth: 1,
        }}
        inputContainerStyle={{
          // borderBottomWidth: 0,
          backgroundColor: fieldState.error
            ? colorWithOpacity(theme.colors.error, 0.2)
            // @ts-ignore
            : props.inputContainerStyle?.backgroundColor || undefined,
          borderRadius: 10,
          overflow: 'visible',
          borderWidth: 0.2,
          height: theme.spacing.lg,
        }}
        inputStyle={{
          textAlign: 'center',
          height: theme.spacing.lg,
        }}
        errorStyle={{
          height: 0
        }}
      />
    );
  },
);
