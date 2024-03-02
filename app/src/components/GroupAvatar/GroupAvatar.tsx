import { Avatar } from '@rneui/themed';
import { GroupAvatar_data$key } from 'core/graphql/__generated__/GroupAvatar_data.graphql';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: GroupAvatar_data$key;
}

export const GroupAvatar: React.FC<IProps> = ({ _data }) => {
  const data = useFragment(
    graphql`
      fragment GroupAvatar_data on Group {
        id
        groupName
        avatarURL
      }
    `,
    _data,
  );

  return (
    <Avatar
      size={'small'}
      source={data.avatarURL ? { uri: data.avatarURL } : {}}
      title={data.groupName}
    />
  );
};
