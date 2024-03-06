import { Text, useTheme } from '@rneui/themed';
import { BalanceText } from 'components/BalanceText';
import { Row, Stack } from 'components/layout';
import { sharedStyles } from 'components/styles';
import { formatDate } from 'shared/format';

interface IProps {
  renderAvatar?: React.ReactNode | React.ReactNode[];
  username: string;
  amount: number;
  timestamp?: string;
  description?: string;
}

export const MemberRowUI: React.FC<IProps> = ({
  timestamp,
  renderAvatar,
  amount,
  username,
  description,
}) => {
  const { theme } = useTheme();
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <Row
        style={{
          flex: 1,
        }}
      >
        {renderAvatar}
        <Stack spacing={'xs'}>
          {timestamp && (
            <Text
              style={{
                color: theme.colors.grey0,
              }}
            >
              {formatDate(timestamp)}
            </Text>
          )}
          <Text style={sharedStyles.caption}>{username}</Text>
        </Stack>
      </Row>
      {description && (
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
          }}
        >
          {description}
        </Text>
      )}
      <BalanceText amount={amount} />
    </Row>
  );
};
