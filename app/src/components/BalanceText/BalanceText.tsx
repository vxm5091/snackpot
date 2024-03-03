import { Text, useTheme } from '@rneui/themed';
import { useMemo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { formatCurrency } from 'shared/format';

interface IProps {
  amount: number;
  withColor?: boolean;
  containerStyle?: StyleProp<ViewStyle>
}

export const BalanceText: React.FC<IProps> = ({ amount, withColor = true, containerStyle }) => {
  const { theme } = useTheme();
  const style = useMemo(() => {
    const color = withColor
      ? amount > 0
        ? theme.colors.primary
        : theme.colors.error
      : theme.colors.black;

    return {
      color,
      fontWeight: '500',
      textAlign: 'right'
    } as TextStyle;
  }, []);

  const amountStr = useMemo(() => formatCurrency(amount), []);

  return <Text style={[style, containerStyle]}>{amountStr}</Text>;
};
