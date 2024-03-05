import { SPACING } from 'core/theme/theme';
import React from 'react';
import {
  Keyboard,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useDidMount } from 'shared/hooks/lifecycleHooks';

interface IProps extends ScrollViewProps {
  formRef?: React.RefObject<ScrollView>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const KeyboardAwareScrollView = ({
  style,
  contentContainerStyle,
  // extraHeight,
  children,
  formRef,
  containerStyle,
  ...props
}: IProps) => {
  const paddingSV = useSharedValue(0);

  useDidMount(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      paddingSV.value = withTiming(e.endCoordinates.height || 300);
    });

    Keyboard.addListener('keyboardDidHide', e => {
      paddingSV.value = withTiming(0);
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  });

  const animatedPadding = useAnimatedStyle(() => ({
    marginBottom: paddingSV.value,
  }));

  return (
    <Animated.View
      style={[
        {
          paddingTop: SPACING.xl,
          flex: 1,
        },
        animatedPadding,
        containerStyle,
      ]}
    >
      <ScrollView
        style={[style, styles.container]}
        contentContainerStyle={[
          styles.content,
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'interactive'}
        ref={formRef}
        {...props}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

/* ANCHOR ==================================== STYLES =========================================== */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: undefined,
  },
  content: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 60,
  },
});
