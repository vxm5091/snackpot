import { Text, useTheme } from '@rneui/themed';
import { ControlledInput } from 'components/ControlledInput';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/form';
import { UserAvatar } from 'components/UserAvatar';
import { Row } from 'components/layout/Row';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React from 'react';
import { Control, Controller } from 'react-hook-form';


import { graphql, useFragment, useMutation } from 'react-relay';
import { View, StyleSheet } from 'react-native';
import { TransactionUpdateMutation } from 'core/graphql/__generated__/TransactionUpdateMutation.graphql';

interface IProps {
  _transactionData: Transaction_data$key;
  control?: Control<TUpdateOrderInput>;
  index?: number;
  role: TUserTransactionRole;
}

export const Transaction: React.FC<IProps> = ({
  _transactionData,
  control,
  index,
  role,
}) => {
  const { theme } = useTheme();

  // ------------------------------------------ Data ------------------------------------------
  const transactionData = useFragment(
    graphql`
      fragment Transaction_data on Transaction {
        id
        recipient {
          node {
            user {
              node {
                ...UserAvatar_data
                id
                username
              }
            }
          }
        }
        itemName
        itemPrice
      }
    `,
    _transactionData,
  );

  const [commitUpdate, isCommittingUpdate] =
    useMutation<TransactionUpdateMutation>(
      graphql`
        mutation TransactionUpdateMutation($input: UpdateTransactionInput!) {
          updateTransaction(input: $input) {
            #        Returning fragments in the mutation response tells Relay to re-render any components that use those fragments
            node {
              ...Transaction_data
              group {
                node {
                  ...GroupBalanceCard_data
                }
              }
            }
          }
        }
      `,
    );
  
  console.info({ index, hasControl: !!control });

  // ------------------------------------------ Variables ------------------------------------------
  const canEdit = control && typeof index === 'number';
  
  // ------------------------------------------ Render ------------------------------------------
  const renderItemNameField = () => {
    if (canEdit) {
      return (
        <Controller
          name={`transactions[${index}].itemName` as const}
          control={control}
          render={({ field }) => (
            <ControlledInput placeholder={'Item name'} {...field} />
          )}
          rules={{
            required: true,
          }}
        />
      );
    }
    return <Text>{transactionData.itemName}</Text>;
  };

  const renderItemPriceField = () => {
    if (canEdit) {
      return (
        <Controller
          name={`transactions[${index}].itemPrice` as const}
          control={control}
          render={({ field}) => (
            <ControlledInput placeholder={'Item price'} {...field} />
          )}
          rules={{
            required: role === 'payer',
          }}
        />
      );
    }
    return <Text>{transactionData.itemPrice}</Text>;
  };

  return (
    <View
      style={{
        paddingVertical: theme.spacing.sm,
        rowGap: theme.spacing.md,
      }}
    >
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <Row
          style={{
            columnGap: theme.spacing.md,
            // flex: 1,
          }}
        >
          <UserAvatar _data={transactionData.recipient.node!.user.node!} />
          <View
            style={{
              rowGap: theme.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '300',
              }}
            >
              {transactionData.recipient.node!.user.node!.username}
            </Text>
            {renderItemNameField()}
          </View>
        </Row>
        {renderItemPriceField()}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({});
