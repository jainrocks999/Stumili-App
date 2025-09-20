import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const CheckCircle = ({
  size = 100,
  strokeWidth = 5,
  duration = 1000,
  checked,
  onPress,
  item,
}) => {
  const progress = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: duration,
      easing: Easing.out(Easing.exp),
    });
  }, [checked, duration, progress]);

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset:
        2 * Math.PI * (size / 2 - strokeWidth) * (1 - progress.value),
    };
  });

  const animatedPathProps = useAnimatedProps(() => {
    const pathLength = 34;
    return {
      strokeDashoffset: pathLength * (1 - progress.value),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, {width: size, height: size}]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            stroke="#d3d3d3"
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            stroke="#4caf50"
            strokeWidth={strokeWidth}
            strokeDasharray={2 * Math.PI * (size / 2 - strokeWidth)}
            animatedProps={animatedCircleProps}
          />
          {checked ? (
            <AnimatedPath
              d={`M${size * 0.25} ${size * 0.55} L${size * 0.45} ${
                size * 0.75
              } L${size * 0.75} ${size * 0.35}`}
              fill="none"
              stroke="#4caf50"
              strokeWidth={strokeWidth}
              strokeDasharray={60} // Adjusted to better match the actual length of the path
              animatedProps={animatedPathProps}
            />
          ) : null}
        </Svg>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckCircle;
