import { Icon, Text, useTheme } from '@rneui/themed';
import { ControlledInput } from 'components/ControlledInput';
import { sharedStyles } from 'components/styles';
import {
  TUpdateOrderInput,
  TUserTransactionRole,
} from 'components/Transaction/types';
import { UserAvatar } from 'components/UserAvatar';
import { Row, Stack } from 'components/layout';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { UseFormStateReturn } from 'react-hook-form/dist/types';
import { ControllerFieldState } from 'react-hook-form/dist/types/controller';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { graphql, useFragment } from 'react-relay';
import { StyleSheet } from 'react-native';
import { colorWithOpacity, formatCurrency } from 'shared/format';

interface IRenderFieldProps {
  field: ControllerRenderProps<TUpdateOrderInput>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TUpdateOrderInput>;
}

interface IProps {
  _recipientData: Transaction_data$key;
  control?: Control<TUpdateOrderInput>;
  index?: number;
  role: TUserTransactionRole;
  itemNameReadonly?: string;
  itemPriceReadonly?: number;
}

export const Transaction: React.FC<IProps> = ({
  _recipientData,
  control,
  index,
  role,
  itemPriceReadonly,
  itemNameReadonly,
}) => {
  const { theme } = useTheme();

  // ------------------------------------------ Data ------------------------------------------
  const recipientData = useFragment(
    graphql`
      fragment Transaction_data on User {
        ...UserAvatar_data
        username
      }
    `,
    _recipientData,
  );


  // ------------------------------------------ Variables ------------------------------------------
  const canEdit = control && typeof index === 'number';

  // ------------------------------------------ Render ------------------------------------------
  const renderItemNameField = () => {
    if (canEdit) {
      return (
        <Controller
          name={`transactions.${index}.itemName` as const}
          control={control}
          render={({ field }) => (
            <ControlledInput
              placeholder={'Item'}
              {...field}
              disabled={role === 'reader'}
              inputContainerStyle={{
                backgroundColor:
                  role === 'payer' || role === 'recipient'
                    ? colorWithOpacity(theme.colors.success, 0.5)
                    : undefined,
              }}
            />
          )}
          rules={{
            required: true,
            minLength: 3,
          }}
        />
      );
    }
    return <Text>{itemNameReadonly || ''}</Text>;
  };

  const renderItemPriceField = () => {
    if (canEdit) {
      return (
        <Controller
          name={`transactions.${index}.itemPrice` as const}
          control={control}
          render={({ field }) => (
            <ControlledInput
              placeholder={'Price'}
              leftIcon={<Icon name={'dollar-sign'} type={'feather'} />}
              keyboardType={'numbers-and-punctuation'}
              {...field}
              value={field.value?.toString()}
              disabled={role === 'reader'}
              inputContainerStyle={{
                backgroundColor:
                  role === 'payer' || role === 'recipient'
                    ? colorWithOpacity(theme.colors.success, 0.5)
                    : undefined,
              }}
            />
          )}
          rules={{
            required: role !== 'recipient',
          }}
        />
      );
    }
    return <Text>{formatCurrency(itemPriceReadonly || 0)}</Text>;
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
          style={sharedStyles.caption}
        >
          {recipientData.username}
        </Text>
        <Row
          style={{
            alignSelf: 'stretch',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            // borderWidth: 1,
          }}
        >
          <UserAvatar
            _data={recipientData}
            size={24}
          />
          {renderItemNameField()}
          {renderItemPriceField()}
        </Row>
      </Stack>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({});
