import { Theme } from '@rneui/themed';
import { StyleProp, TextStyle } from 'react-native';

export const sharedTextStyles = (theme: Theme): Record<string, StyleProp<TextStyle>> => ({
  caption: {
    fontSize: 13,
    fontWeight: '400',
  },
});
