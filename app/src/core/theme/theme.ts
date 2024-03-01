import { Platform } from 'react-native';
import { Button, lightColors, createTheme, ThemeProvider } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

export default theme;