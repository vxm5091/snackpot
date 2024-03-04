import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { BalanceText } from 'components/BalanceText';
import {
  IMeInput,
  IPayerInput,
  meFormSchema, payerFormSchema,
} from 'components/Transaction/form';
import { UserAvatar } from 'components/UserAvatar';
import { Row } from 'components/layout/Row';
import { Transaction_data$key } from 'core/graphql/__generated__/Transaction_data.graphql';
import React, { Suspense, useCallback, useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';
import { graphql, useFragment, useMutation } from 'react-relay';
import { View, StyleSheet } from 'react-native';
import { TransactionUpdateMutation } from 'core/graphql/__generated__/TransactionUpdateMutation.graphql';
import { useDidMount, useDidUpdate } from 'shared/hooks/lifecycleHooks';
import { Transaction_meData$key } from 'core/graphql/__generated__/Transaction_meData.graphql';


interface IProps extends UseControllerProps {
  _transactionData: Transaction_data$key;
  _meData: Transaction_meData$key;
  editMode?: boolean; // if the user creates a transaction, we want to render this component in edit mode and prompt the user to at least enter itemName
  
  
  // payer = must submit itemPrice, itemName optional
  // me = must submit itemName, itemPrice optional
  // read = can't edit anything  
  context: 'payer' | 'me' | 'read'
}

export const Transaction: React.FC<IProps> = ({
  _transactionData,
  _meData,
  editMode = false,
  context,
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(editMode);
  const [isInputError, setIsInputError] = useState(false);
  
  

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
			}
    `,
    _transactionData,
  );
  
  const meData = useFragment(graphql`
    fragment Transaction_meData on User {
      id
    }
  `, _meData);

  const [commitUpdate, isCommittingUpdate] =
    useMutation<TransactionUpdateMutation>(
      graphql`
				mutation TransactionUpdateMutation($input: UpdateTransactionInput!)
				{
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
  
  // ------------------------------------------ Form ------------------------------------------
  const formMethods = useForm<IPayerInput | IMeInput>({
    mode: 'all',
    resolver: yupResolver(context === 'me' ? meFormSchema : payerFormSchema),
    shouldFocusError: true,
    defaultValues: {
      itemName: transactionData.itemName,
      itemPrice: transactionData.itemPrice || 0,
    },
  });
  

  // ------------------------------------------ Side Effects ------------------------------------------
  useDidMount(() => {
    if (!transactionData.order.node!.isActive) {
      return;
    }
    if (transactionData.recipient.node?.user.node?.id === meData.id) {
      return setMode('me');
    }
    if (transactionData.payer.node?.user.node?.id === meData.id) {
      return setMode('payer');
    }
  });
  
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
          id: transactionData.id,
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
          placeholder={(transactionData.itemPrice || 0).toString()}
          errorMessage={isInputError ? 'Enter an amount' : undefined}
          onChangeText={handleInputChange}
          containerStyle={styles.balance}
          textAlign={'right'}
        />
      );
    }
    return <BalanceText amount={transactionData.itemPrice || 0} withColor={false} containerStyle={styles.balance} />;
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
            <Text
              style={{
                fontWeight: '500',
              }}
            >
              {transactionData.itemName}
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
