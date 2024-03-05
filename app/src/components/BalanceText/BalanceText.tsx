import { Text, TextProps, useTheme } from '@rneui/themed';
import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { formatCurrency } from 'shared/format';

interface IProps extends TextProps {
  amount: number;
  withColor?: boolean;
}

export const BalanceText: React.FC<IProps> = ({
  amount,
  withColor = true,
  ...props
}) => {
  const { theme } = useTheme();
  const style = useMemo(() => {
    const color = withColor
      ? amount > 0
        ? theme.colors.primary
        : theme.colors.secondary
      : theme.colors.black;

    return {
      color,
      fontWeight: '500',
      textAlign: 'right',
    } as TextStyle;
  }, [amount, theme, withColor]);

  return (
    <Text style={style} {...props}>
      {formatCurrency(amount)}
    </Text>
  );
};
