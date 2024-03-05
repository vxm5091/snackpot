import { Icon, Text, useTheme } from '@rneui/themed';
import { ControlledInput } from 'components/ControlledInput';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/form';
import { UserAvatar } from 'components/UserAvatar';
import { Row, Stack } from 'components/layout';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React, { useCallback } from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { UseFormStateReturn } from 'react-hook-form/dist/types';
import { ControllerFieldState } from 'react-hook-form/dist/types/controller';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { graphql, useFragment } from 'react-relay';
import { View, StyleSheet } from 'react-native';
import { colorWithOpacity, formatCurrency } from 'shared/format';

interface IRenderFieldProps {
  field: ControllerRenderProps<TUpdateOrderInput>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TUpdateOrderInput>;
}

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
            <ControlledInput placeholder={'Item'} {...field} inputContainerStyle={{
                backgroundColor: (role === 'payer' || role === 'recipient') ? colorWithOpacity(theme.colors.success, 0.5) : undefined
              }} />
          )}
          rules={{
            required: true,
            minLength: 3,
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
          render={({ field }) => (
            <ControlledInput
              placeholder={'Price'}
              leftIcon={<Icon name={'dollar-sign'} type={'feather'} />}
              keyboardType={'numeric'}
              {...field}
              value={field.value?.toString()}
              onChangeText={value => field.onChange(parseFloat(value))}
              inputContainerStyle={{
                backgroundColor: (role === 'payer' || role === 'recipient') ? colorWithOpacity(theme.colors.success, 0.5) : undefined
              }}
            />
          )}
          rules={{
            required: role === 'payer',
          }}
        />
      );
    }
    return <Text>{formatCurrency(transactionData.itemPrice!)}</Text>;
  };

  return (
    <Reanimated.View
      style={{
        flex: 1,
        overflow: 'visible',
        // borderWidth: 1,
        // paddingVertical: theme.spacing.sm,
      }}
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
        
        <Stack
          style={{
            flex: 1,
          }}
          spacing={'sm'}
        >
          <Text
            style={{
              // color: theme.colors.grey1,
              fontSize: 13,
              fontWeight: '400',
            }}
          >
            {transactionData.recipient.node!.user.node!.username}
          </Text>
          <Row
            style={{
              alignSelf: 'stretch',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              // borderWidth: 1,
            }}
          >
          <UserAvatar _data={transactionData.recipient.node!.user.node!} size={24} />
            {renderItemNameField()}
            {renderItemPriceField()}
          </Row>
        </Stack>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({});
