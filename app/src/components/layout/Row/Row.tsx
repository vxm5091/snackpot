import { IBoxProps } from 'components/layout/Box';
import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { TSpacing, SPACING } from 'shared/design/spacing';

interface IProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
  spacing?: TSpacing;
}

interface ISubcomponents {
  Spaced: React.FC<IBoxProps>;
}


export const Row: React.FC<IProps> & ISubcomponents = ({
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

Row.Spaced = ({ children, style, ...props }) => {
  return (
    <Row style={[styles.spaced, style]} {...props}>
      {children}
    </Row>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaced: {
    justifyContent: 'space-between',
  },
});

const gapStyles = (spacing: TSpacing) =>
  ({
    columnGap: SPACING[spacing],
  } as ViewStyle);

