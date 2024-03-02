import { Avatar } from '@rneui/themed';
import { UserAvatar_data$key } from 'core/graphql/__generated__/UserAvatar_data.graphql';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: UserAvatar_data$key;
}

export const UserAvatar: React.FC<IProps> = ({ _data }) => {
  const data = useFragment(
    graphql`
      fragment UserAvatar_data on User {
        id
        username
        firstName
        lastName
        avatarURL
      }
    `,
    _data,
  );
  

  return (
    <Avatar
      size={32}
      rounded
      source={data.avatarURL ? { uri: data.avatarURL } : {}}
      title={data.avatarURL ? undefined : `${data.firstName[0]}${data.lastName[0]}`}
    />
  );
};
