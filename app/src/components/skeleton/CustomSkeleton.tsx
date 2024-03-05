import { Skeleton, useTheme } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';

export const CustomSkeleton = () => {
const { theme } = useTheme();
  
  //   TODO replace with skeleton once dimensions are known
  return (
    <View style={{
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  )
}