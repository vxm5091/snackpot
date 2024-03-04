import { useNavigation } from '@react-navigation/core';
import { Card, Text, useTheme } from '@rneui/themed';
import { GroupMember } from 'components/GroupMember';
import { Row } from 'components/layout/Row';
import {
  GroupBalanceCard_data$key
} from 'core/graphql/__generated__/GroupBalanceCard_data.graphql';
import { context } from 'esbuild';
import { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface IProps {
  _data: GroupBalanceCard_data$key;
}

export const GroupBalanceCard: React.FC<IProps> = ({ _data }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const data = useFragment(
    graphql`
			fragment GroupBalanceCard_data on Group {
				...GroupAvatar_data
				id
				groupName
				members {
					edges {
						node {
							...GroupMember_data
							id
							balance
						}
					}
				}
			}
    `,
    _data,
  );

  // ------------------------------------------ Variables ------------------------------------------
  // sort members by balance
  const sortedMembers = useMemo(
    () =>
      [...(data.members.edges || [])].sort((a, b) => {
        const balanceA = a.node!.balance;
        const balanceB = b.node!.balance;
        return balanceB - balanceA;
      }),
    [data],
  );

  // ------------------------------------------ Handlers ------------------------------------------
  const handlePress = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);

  // ------------------------------------------ Render ------------------------------------------
  const renderMembers = () => {
    return sortedMembers.map((member, i, arr) => (
      <GroupMember _data={member.node!} key={i} isLast={i === arr.length - 1} />
    ));
  };

  

  const renderTitle = useMemo(() => {
    if (context === 'GroupScreen') {
      return (
        <>
        
        </>
      );
    }
    return <Card.Title>{data.groupName}</Card.Title>;
  }, [context]);

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
          <View><Card.Title>Member balance</Card.Title>
          <Card.FeaturedSubtitle
            style={{
              color: theme.colors.grey2,
              marginTop: 0,
            }}
          >
            Member with lowest balance will pay for next order
          </Card.FeaturedSubtitle></View>
        </Row.Spaced>
        {renderMembers()}
      </Card>
    </Reanimated.View>
  );
};
