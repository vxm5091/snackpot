import { useNavigation } from '@react-navigation/core';
import { Card, Text, useTheme } from '@rneui/themed';
import { GroupMember } from 'components/GroupMember';
import { Row } from 'components/layout/Row';
import { GroupCard_data$key } from 'core/graphql/__generated__/GroupCard_data.graphql';
import { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import Reanimated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface IProps {
  _data: GroupCard_data$key;
}

export const GroupCard: React.FC<IProps> = ({ _data }) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  
  const data = useFragment(
    graphql`
      fragment GroupCard_data on Group {
        ...GroupAvatar_data
        id
        groupName
        members {
          edges {
            ...GroupMember_data
          }
        }
      }
    `,
    _data,
  );

  // ------------------------------------------ Handlers ------------------------------------------
  const handlePress = useCallback(() => {
    navigation.navigate('GroupScreen', {
      id: data.id,
    });
  }, [data]);
  
  // ------------------------------------------ Render ------------------------------------------
  const renderMembers = useMemo(() => {
    return data.members.edges?.map((member, i) => (
      <GroupMember _data={member} key={i} />
    ));
  }, [data]);
  
  return (
    <Reanimated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Card
        >
        <Row.Spaced style={{
          alignItems: 'flex-start',
        }}>
          <Card.Title>{data.groupName}</Card.Title>
          <TouchableOpacity onPress={handlePress}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Text style={{
              color: theme.colors.secondary,
            }}>Go to group page</Text>
          </TouchableOpacity>
        </Row.Spaced>
        {renderMembers}
      </Card>
    </Reanimated.View>
  );
};
