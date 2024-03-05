import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
}

interface ISubcomponents {
  Spaced: React.FC<IProps>;
}


export const Row: React.FC<IProps> & ISubcomponents = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={[rowStyles.container, style]} {...props}>
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


