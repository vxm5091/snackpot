import { Platform } from 'react-native';
import { lightColors, createTheme, Theme, darkColors } from '@rneui/themed';

export const SPACING: Theme['spacing'] = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
};

const theme = createTheme({
  spacing: SPACING,
  components: {
    Card: {
      containerStyle: {
        borderWidth: 0,
        borderRadius: 10,
        marginHorizontal: 0,
      },
    },
    CardTitle: {
      style: {
        textAlign: 'left',
        color: 'black',
        marginBottom: SPACING.xs,
        fontSize: 20,
      },
    },
    CardFeaturedSubtitle: {
      style: {
        color: 'black',
      },
    },
    Text: {
      style: {
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
      },
    },
    Badge: {
      textStyle: {
        fontSize: 14,
      },
      badgeStyle: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        flex: 1,
      },
      containerStyle: {
        height: 24,
      },
    },
  },
});

export default theme;
