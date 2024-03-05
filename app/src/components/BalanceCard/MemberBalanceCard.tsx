import { useNavigation } from '@react-navigation/core';
import { Badge, Card, useTheme } from '@rneui/themed';
import { MemberBalanceRow } from 'components/BalanceCard/MemberBalanceRow';
import { Row, Spacer, Stack } from 'components/layout';
import { MemberBalanceCard_data$key } from 'core/graphql/__generated__/MemberBalanceCard_data.graphql';
import { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface IProps {
  _data: MemberBalanceCard_data$key;
}

export const MemberBalanceCard: React.FC<IProps> = ({ _data }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const data = useFragment(
    graphql`
      fragment MemberBalanceCard_data on Group {
        ...GroupAvatar_data
        id
        groupName
        members {
          edges {
            node @required(action: THROW) {
              ...MemberBalanceRow_data
              id
              balance
              user {
              node @required(action: THROW) {
                  username
								}
							}
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
  
  const payingNextUsername = sortedMembers[sortedMembers.length - 1].node.user.node.username;

  // ------------------------------------------ Render ------------------------------------------
  const renderMembers = () => {
    return sortedMembers.map((member, i, arr) => (
      <Fragment key={member.node?.id || `${i}`}>
        <MemberBalanceRow _data={member.node!} />
        <Spacer />
      </Fragment>
    ));
  };

  return (
    <Reanimated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Card
      >
          <View>
            <Card.Title>Member balance</Card.Title>
            <Card.FeaturedSubtitle
              style={{
                color: theme.colors.grey2,
                marginTop: 0,
              }}
            >
              Press on a row to see a balance breakdown
            </Card.FeaturedSubtitle>
            <Row>
              <Badge value={`${payingNextUsername} paying next`} status={'success'} />
            </Row>
          </View>
        <Stack spacing={'xs'}>
        {renderMembers()}
          </Stack>
      </Card>
    </Reanimated.View>
  );
};
