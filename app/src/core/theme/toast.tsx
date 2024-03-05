import { Colors, useTheme } from '@rneui/themed';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { colorWithOpacity } from 'shared/format';



export const useToast = (colors: Colors) => {
  return {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, toastColorStyles('success', colors)]}
        contentContainerStyle={styles.content}
        text1Style={[styles.toastTitle]}
        text2Style={[styles.toastMessage]}
      />
    ),
    info: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, toastColorStyles('info', colors)]}
        contentContainerStyle={styles.content}
        text1Style={[styles.toastTitle]}
        text2Style={[styles.toastMessage]}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={[styles.container, toastColorStyles( 'error', colors)]}
        contentContainerStyle={styles.content}
        text1Style={[styles.toastTitle]}
        text2Style={[styles.toastMessage]}
      />
    ),
  };
}

const styles = StyleSheet.create({
  toastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  toastMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  container: {
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 8,
  },
});

const toastColorStyles = (
  type: 'success' | 'error' | 'info',
  colors: Colors
) => {
  let backgroundColor: string | undefined = undefined;
  let borderColor: string | undefined = undefined;
  switch (type) {
    case 'success':
      // color = Colors[theme].primary['200'];
      borderColor = colors.primary
      backgroundColor = colorWithOpacity(colors.searchBg, 0.8)
      break;
    case 'error':
      backgroundColor = colors.error
      borderColor = colors.error
      // borderColor = colorWithOpacity(colors.error, 0.3)
      break;
  }

  return {
    backgroundColor,
    borderColor,
  } as ViewStyle;
};
