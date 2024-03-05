import { ThemeSpacing, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export interface IStackProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
  spacing?: keyof ThemeSpacing | 'none';
}

interface ISubcomponents {
  Spaced: React.FC<IStackProps>;
}

export const Stack: React.FC<IStackProps> & ISubcomponents = ({
  children,
  spacing = 'md',
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          rowGap: spacing === 'none' ? 0 : theme.spacing[spacing],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

Stack.Spaced = ({ children, style, ...props }) => {
  return (
    <Stack style={[styles.spaced, style]} {...props}>
      {children}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
  spaced: {
    justifyContent: 'space-between',
  },
});
