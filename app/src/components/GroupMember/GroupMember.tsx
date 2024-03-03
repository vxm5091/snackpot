import { Divider, Text, useTheme } from '@rneui/themed';
import { BalanceText } from 'components/BalanceText';
import { Row } from 'components/layout/Row';
import { UserAvatar } from 'components/UserAvatar';
import { GroupMember_data$key } from 'core/graphql/__generated__/GroupMember_data.graphql';
import { View } from 'react-native';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: GroupMember_data$key;
  isLast?: boolean;
}

export const GroupMember: React.FC<IProps> = ({ _data, isLast = false }) => {
  const {theme} = useTheme();
  
  const data = useFragment(
    graphql`
      fragment GroupMember_data on GroupMember {
        balance
        user {
          node {
          ...UserAvatar_data
          username
					}
        }
      }
    `,
    _data,
  );
  
  
  return (
    <View style={{
      paddingVertical: theme.spacing.sm,
      rowGap: theme.spacing.md,
    }} >
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Row
          style={{
            columnGap: theme.spacing.md,
          }}
        >
          <UserAvatar _data={data.user.node!} />
          <Text>{data.user.node!.username}</Text>
        </Row>
        <BalanceText amount={data.balance} />
      </Row>
      {!isLast && <Divider/>}
    </View>
  );
};
