import { Avatar, Text } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React from 'react';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: Transaction_data$key;
}

export const Transaction: React.FC<IProps> = ({ _data }) => {
  const data = useFragment(
    graphql`
      fragment Transaction_data on Transaction {
        id
        user {
          username
          firstName
          lastName
          avatarURL
        }
        itemName
        itemPrice
      }
    `,
    _data,
  );

  return (
    <Row>
      <Avatar
        size={'small'}
        source={data.user.avatarURL ? { uri: data.user.avatarURL } : {}}
        title={`${data.user.firstName[0]}${data.user.lastName[0]}`}
      />
      <Text>{data.itemName}</Text>
      <Text>{data.itemPrice}</Text>
    </Row>
  );
};
