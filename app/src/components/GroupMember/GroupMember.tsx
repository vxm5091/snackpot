import { ListItem, Text } from '@rneui/themed';
import { rowStyles } from 'components/layout/Row';
import { UserAvatar } from 'components/UserAvatar';
import { GroupMember_data$key } from 'core/graphql/__generated__/GroupMember_data.graphql';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: GroupMember_data$key;
  isLast?: boolean;
}

export const GroupMember: React.FC<IProps> = ({ _data, isLast = false }) => {
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

  if (!data.node) return null;
  
  return (
    <ListItem bottomDivider={!isLast}>
      <UserAvatar _data={data.node}/>
      <ListItem.Content style={rowStyles.container}>
        <Text>{data.node.username}</Text>
        <Text>{data.balance}</Text>
      </ListItem.Content>
      
    </ListItem>
  );
};
