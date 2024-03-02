import { Avatar, ListItem, Text } from '@rneui/themed';
import { UserAvatar } from 'components/UserAvatar';
import { Row, rowStyles } from 'components/layout/Row';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { StyleSheet } from 'react-native';

interface IProps {
  _data: Transaction_data$key;
  isLast?: boolean;
}

export const Transaction: React.FC<IProps> = ({ _data, isLast = false }) => {
  const data = useFragment(
    graphql`
			fragment Transaction_data on Transaction {
				id
				recipient {
					node {
						...UserAvatar_data
					}
				}
				itemName
				itemPrice
			}
    `,
    _data,
  );

  return (
    <ListItem bottomDivider={!isLast}>
      <UserAvatar _data={data.recipient.node!} />
      <ListItem.Content style={rowStyles.container}>
      <Text>{data.itemName}</Text>
      <Text>{data.itemPrice}</Text>
      </ListItem.Content>
      
    </ListItem>
  );
};

