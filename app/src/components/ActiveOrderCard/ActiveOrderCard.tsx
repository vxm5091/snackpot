import { useNavigation } from '@react-navigation/core';
import { Button, Card, Text, useTheme } from '@rneui/themed';
import { Row } from 'components/layout/Row';
import { ActiveOrderCard_data$key } from 'core/graphql/__generated__/ActiveOrderCard_data.graphql';
import { context } from 'esbuild';
import { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Reanimated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { graphql, useFragment, useMutation } from 'react-relay';
import {ActiveOrderCardCreateOrderMutation} from 'core/graphql/__generated__/ActiveOrderCardCreateOrderMutation.graphql';
import {
  ActiveOrderCardCreateTransactionMutation,
  CreateTransactionInput,
} from 'core/graphql/__generated__/ActiveOrderCardCreateTransactionMutation.graphql';

interface IProps {
  _data: ActiveOrderCard_data$key;
}

export const ActiveOrderCard: React.FC<IProps> = ({ _data }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  // ------------------------------------------ Data ------------------------------------------
  const data = useFragment(graphql`
    fragment ActiveOrderCard_data on Group {
      id
      groupName
      avatarURL
      activeOrder {
        node {
          ...Order_orderData
				}
			}
    }
  `, _data);
  
  const [commitCreatedOrder, isCommittingOrder] = useMutation<ActiveOrderCardCreateOrderMutation>(graphql`
    mutation ActiveOrderCardCreateOrderMutation($groupID: ID!) {
      createOrder(groupID: $groupID) {
        node {
          group {
            node {
              ...ActiveOrderCard_data
						}
					}
				}
      }
    }
  `);
  
  const [commitCreateTransaction, isCommittingCreateTransaction] = useMutation<ActiveOrderCardCreateTransactionMutation>(graphql`
    mutation ActiveOrderCardCreateTransactionMutation($input: CreateTransactionInput!) {
      createTransaction(input: $input) {
        node {
          group {
            node {
              ...ActiveOrderCard_data
						}
					}
        }
      }
		}
  `);
  
  
  // ------------------------------------------ Variables ------------------------------------------
  // ------------------------------------------ Handlers ------------------------------------------
  const handlePressGroupScreen = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);
  
  const handlePressCreateOrder = useCallback(() => {
    commitCreatedOrder({
      variables: {
        groupID: data.id,
      },
    });
  }, [data]);
  
  const handlePressCreateTransaction = useCallback((input: CreateTransactionInput) => {
    commitCreateTransaction({
      variables: {
        input,
      },
    });
  }, []);
  
  // ------------------------------------------ Render ------------------------------------------
  const renderNavPressable = useMemo(() => {
    return (
      <TouchableOpacity onPress={handlePressGroupScreen}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Text
          style={{
            color: theme.colors.secondary,
          }}
        >
          Go to group page
        </Text>
      </TouchableOpacity>
    );
  }, [context]);
  
  const renderActiveOrder = useMemo(() => {
    // if there is no active order, CTA to create one
    if (!data.activeOrder?.node) {
      return (
        <View>
        <Text>No active order today. Go ahead and kick things off!</Text>
        <Button onPress={handlePressCreateOrder} loading={isCommittingCreateTransaction} disabled={isCommittingCreateTransaction}>Start order</Button>
      </View>
      );
    }
    
  //   if there is an active order, does the user have a transaction?
  },[data, handlePressCreateOrder, isCommittingCreateTransaction]);
  
  return (
    <Reanimated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Card wrapperStyle={{
        rowGap: theme.spacing.xs,
      }}>
        <Row.Spaced
          style={{
            alignItems: 'flex-start',
          }}
        >
         <Card.Title>{data.groupName}</Card.Title>
          {renderNavPressable}
        </Row.Spaced>
        
      </Card>
    </Reanimated.View>
  );
  
};
