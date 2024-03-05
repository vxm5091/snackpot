import { SPACING } from 'core/theme/theme';
import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  caption: {
    fontSize: 13,
    fontWeight: '400',
  },
  scrollviewContainer: {
    paddingTop: 0,
    paddingBottom: 60,
    rowGap: SPACING.lg,
  },
});
