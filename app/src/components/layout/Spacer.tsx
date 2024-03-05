import { useTheme } from '@rneui/themed';
import { SPACING } from 'core/theme/theme';
import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Line, Svg } from 'react-native-svg';
import { colorWithOpacity } from 'shared/format';

interface Props {
  spacing?: number;
  withLine?: boolean;
}

export const Spacer: React.FC<Props> = React.memo(
  ({ spacing = SPACING.md, withLine = true }) => {
    const { theme } = useTheme();

    return (
      <Animated.View
        style={{
          height: spacing,
          width: '100%',
          justifyContent: 'center'
        }}
        layout={LinearTransition}
      >
        {withLine && (
          <Svg width={'100%'} height={1}>
            <Line
              x1={0}
              y1={0}
              x2={'100%'}
              y2={0}
              stroke={colorWithOpacity(theme.colors.grey0, 0.2)}
              strokeWidth={1}
            />
          </Svg>
        )}
      </Animated.View>
    );
  },
);

