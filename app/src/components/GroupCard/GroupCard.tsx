import { Card } from '@rneui/themed';
import { GroupMember } from 'components/GroupMember';
import { GroupCard_data$key } from 'core/graphql/__generated__/GroupCard_data.graphql';
import { useMemo } from 'react';
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
  const data = useFragment(
    graphql`
      fragment GroupCard_data on Group {
        ...GroupAvatar_data
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

  // ------------------------------------------ Render ------------------------------------------
  const renderMembers = useMemo(() => {
    return data.members.edges?.map((member, i) => <GroupMember _data={member} key={i} />);
  }, [data]);

  return (
    <Reanimated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Card>
        <Card.Title>{data.groupName}</Card.Title>
        {renderMembers}
      </Card>
    </Reanimated.View>
  );
};
