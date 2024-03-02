import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { TSpacing, SPACING } from 'shared/design/spacing';

export interface IBoxProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
  spacing?: TSpacing;
}


export const Box: React.FC<IBoxProps> = ({
  children,
  spacing = 'm',
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, gapStyles(spacing), style]} {...props}>
      {children}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {},
});

const gapStyles = (spacing: TSpacing) =>
  ({
    gap: SPACING[spacing],
  } as ViewStyle);

