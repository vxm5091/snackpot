import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@rneui/themed';
import { MemberRowUI } from 'components/MemberRowUI';
import { UserAvatar } from 'components/UserAvatar';
import { MemberBalanceRow_data$key } from 'core/graphql/__generated__/MemberBalanceRow_data.graphql';
import { useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _data: MemberBalanceRow_data$key;
}

export const MemberBalanceRow: React.FC<IProps> = ({ _data }) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  
  const data = useFragment(
    graphql`
			fragment MemberBalanceRow_data on GroupMember {
				...MemberHistoryScreen_data
        balance
				user {
					node @required(action: THROW) {
						...UserAvatar_data
						username
					}
				}
			}
    `,
    _data,
  );
  
  const handlePress = useCallback(() => {
    navigation.navigate('GroupMemberHistory', {
      _data: data,
    });
  }, [data]);
  
  const renderAvatar = useMemo(() => <UserAvatar _data={data.user.node!} />, [data]);
  
  return (
    <Pressable onPress={handlePress}>
    <MemberRowUI
      amount={data.balance}
      username={data.user.node?.username || 'member'}
      renderAvatar={renderAvatar}
    />
      </Pressable>
  );
};
