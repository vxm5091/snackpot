import { Button, Divider, Icon, Input, Text, useTheme } from '@rneui/themed';
import { BalanceText } from 'components/BalanceText';
import { UserAvatar } from 'components/UserAvatar';
import { Row } from 'components/layout/Row';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React, { Suspense, useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { View, StyleSheet } from 'react-native';
import { TransactionUpdateMutation } from 'core/graphql/__generated__/TransactionUpdateMutation.graphql';
import { useDidUpdate } from 'shared/hooks/lifecycleHooks';

interface IProps {
  _data: Transaction_data$key;
  isLast?: boolean;
  canEdit?: boolean;
}

export const Transaction: React.FC<IProps> = ({
  _data,
  isLast = false,
  canEdit = false,
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState<string | null>(null);
  const [isInputError, setIsInputError] = useState(false);

  // ------------------------------------------ Data ------------------------------------------
  const data = useFragment(
    graphql`
      fragment Transaction_data on Transaction {
        id
        globalID
        recipient {
          node {
            ...UserAvatar_data
            username
          }
        }
        itemName
        itemPrice
      }
    `,
    _data,
  );

  const [commitUpdate, isCommittingUpdate] =
    useMutation<TransactionUpdateMutation>(
      graphql`
        mutation TransactionUpdateMutation($input: UpdateTransactionInput!)
         {
          updateTransaction(input: $input) {
            #        Returning the above fragment in the mutation response tells Relay to re-render the component with the updated data
            node {
              ...Transaction_data
            }
          }
        }
      `,
    );

  // ------------------------------------------ Side Effects ------------------------------------------
  useDidUpdate(() => {
    if (newAmount && newAmount.length) {
      setIsInputError(false);
    }
  }, [newAmount]);
  // ------------------------------------------ Handlers ------------------------------------------
  const handlePressUpdate = () => {
    if (!newAmount) {
      setIsInputError(true);
      return;
    }
    
    commitUpdate({
      variables: {
        input: {
          id: data.id,
          itemPrice: +newAmount,
        },
      },
      onCompleted: () => {
        setIsEditing(false);
      },
    });
  };

  const handlePressCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handlePressEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleInputChange = (text: string) => {
    setNewAmount(text);
  };

  // ------------------------------------------ Render ------------------------------------------
  const renderEditButtons = () => {
    if (!canEdit) return null;
    if (isEditing) {
      return (
        <>
          <Button
            radius={'sm'}
            type={'solid'}
            size={'sm'}
            
            color={theme.colors.grey0}
            onPress={handlePressCancel}
            
            
          >
            <Icon name={'cancel'} color={'white'} />
          </Button>
          <Button
            radius={'sm'}
            size={'sm'}
            type={'solid'}
            loading={isCommittingUpdate}
            color={'success'}
            onPress={handlePressUpdate}
          >
            <Icon name={'check'} color={'white'} />
          </Button>
          
        </>
      );
    }
    return (
      <Button
        radius={'sm'}
        size={'sm'}
        // buttonStyle={styles.button}
        type={'solid'}
        // color={'secondary'}
        onPress={handlePressEdit}
      >
        <Icon name={'edit'} color={'white'} />
        {/*Edit*/}
      </Button>
    );
  };

  const renderBalanceField = () => {
    if (isEditing) {
      return (
        <Input
          placeholder={(data.itemPrice || 0).toString()}
          errorMessage={isInputError ? 'Enter an amount' : undefined}
          onChangeText={handleInputChange}
          containerStyle={styles.balance}
          textAlign={'right'}
        />
      );
    }
    return <BalanceText amount={data.itemPrice || 0} withColor={false} containerStyle={styles.balance} />;
  };

  return (
    <Suspense fallback={null}>
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
            flex: 1,
          }}
        >
          <UserAvatar _data={data.recipient.node!} />
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
              {data.recipient.node!.username}
            </Text>
            <Text
              style={{
                fontWeight: '500',
              }}
            >
              {data.itemName}
            </Text>
          </View>
        </Row>
        <View style={{
          marginHorizontal: theme.spacing.sm,
        }}>
        {renderBalanceField()}
          </View>
      
      </Row>
      <Row style={{ columnGap: theme.spacing.sm }}>{renderEditButtons()}</Row>
      {!isLast && <Divider />}
    </View>
      </Suspense>
  );
};


const styles = StyleSheet.create({
  button: {
    height: 32,
    width: 100,
  },
  balance: {
    minWidth: 60,
  },
});
