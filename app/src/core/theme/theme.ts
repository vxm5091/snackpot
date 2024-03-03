import { Platform } from 'react-native';
import { lightColors, createTheme, Theme, darkColors } from '@rneui/themed';

const SPACING: Theme['spacing'] = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 32,
  xl: 48,
}

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
  },
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
      }
    },
    CardFeaturedSubtitle: {
      style: {
        color: 'black',
        
      },
    },
    Text: {
      style: {
        color: 'black'
      }
    }
  }
  
});

export default theme;
