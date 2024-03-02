import { Divider, Text, useTheme } from '@rneui/themed';
import { Box } from 'components/layout/Box';
import { Row } from 'components/layout/Row';
import { UserAvatar } from 'components/UserAvatar';
import { GroupMember_data$key } from 'core/graphql/__generated__/GroupMember_data.graphql';
import { useMemo } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import { SPACING } from 'shared/design/spacing';
import { formatCurrency } from 'shared/format';

interface IProps {
  _data: GroupMember_data$key;
  isLast?: boolean;
}

export const GroupMember: React.FC<IProps> = ({ _data, isLast = false }) => {
  const {theme} = useTheme()
  
  const data = useFragment(
    graphql`
      fragment GroupMember_data on UserBalanceEdge {
        balance
        node {
          ...UserAvatar_data
          username
        }
      }
    `,
    _data,
  );
  
  
  
  
  // ------------------------------------------ Styles ------------------------------------------
  const balanceStyles = useMemo(() => {
    return {
      color: data.balance > 0 ? theme.colors.primary : theme.colors.error
    } as TextStyle
  }, [data])

  if (!data.node) return null;

  return (
    <Box style={{
      paddingVertical: SPACING.s,
    }} spacing={'m'}>
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Row
          style={{
            columnGap: SPACING.m,
          }}
        >
          <UserAvatar _data={data.node} />
          <Text>{data.node.username}</Text>
        </Row>
        <Text style={balanceStyles}>{formatCurrency(data.balance)}</Text>
      </Row>
      {!isLast && <Divider/>}
    </Box>
  );
};
