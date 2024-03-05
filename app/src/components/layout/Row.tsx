import { ThemeSpacing, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
  spacing?: keyof ThemeSpacing | 'none'
}

interface ISubcomponents {
  Spaced: React.FC<IProps>;
}

export const Row: React.FC<IProps> & ISubcomponents = ({
  children,
  style,
  spacing = 'md',
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        rowStyles.container,
        {
          columnGap: spacing === 'none' ? 0 : theme.spacing[spacing],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

Row.Spaced = ({ children, style, ...props }) => {
  return (
    <Row style={[rowStyles.spaced, style]} {...props}>
      {children}
    </Row>
  );
};

export const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaced: {
    justifyContent: 'space-between',
  },
});
