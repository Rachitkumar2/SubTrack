import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

const InsightIcon = ({ color = "white", size = 42.5 }) => (
  <Svg width={size} height={(size * 43) / 55} viewBox="0 0 55 43" fill="none">
    <Path d="M5 42.5C3.625 42.5 2.44792 42.0104 1.46875 41.0312C0.489583 40.0521 0 38.875 0 37.5C0 36.125 0.489583 34.9479 1.46875 33.9688C2.44792 32.9896 3.625 32.5 5 32.5C5.25 32.5 5.46875 32.5 5.65625 32.5C5.84375 32.5 6.04167 32.5417 6.25 32.625L17.625 21.25C17.5417 21.0417 17.5 20.8438 17.5 20.6562C17.5 20.4688 17.5 20.25 17.5 20C17.5 18.625 17.9896 17.4479 18.9688 16.4688C19.9479 15.4896 21.125 15 22.5 15C23.875 15 25.0521 15.4896 26.0312 16.4688C27.0104 17.4479 27.5 18.625 27.5 20C27.5 20.0833 27.4583 20.5 27.375 21.25L33.75 27.625C33.9583 27.5417 34.1562 27.5 34.3438 27.5C34.5312 27.5 34.75 27.5 35 27.5C35.25 27.5 35.4688 27.5 35.6562 27.5C35.8438 27.5 36.0417 27.5417 36.25 27.625L45.125 18.75C45.0417 18.5417 45 18.3438 45 18.1562C45 17.9688 45 17.75 45 17.5C45 16.125 45.4896 14.9479 46.4688 13.9688C47.4479 12.9896 48.625 12.5 50 12.5C51.375 12.5 52.5521 12.9896 53.5312 13.9688C54.5104 14.9479 55 16.125 55 17.5C55 18.875 54.5104 20.0521 53.5312 21.0312C52.5521 22.0104 51.375 22.5 50 22.5C49.75 22.5 49.5312 22.5 49.3438 22.5C49.1562 22.5 48.9583 22.4583 48.75 22.375L39.875 31.25C39.9583 31.4583 40 31.6562 40 31.8438C40 32.0312 40 32.25 40 32.5C40 33.875 39.5104 35.0521 38.5312 36.0312C37.5521 37.0104 36.375 37.5 35 37.5C33.625 37.5 32.4479 37.0104 31.4688 36.0312C30.4896 35.0521 30 33.875 30 32.5C30 32.25 30 32.0312 30 31.8438C30 31.6562 30.0417 31.4583 30.125 31.25L23.75 24.875C23.5417 24.9583 23.3438 25 23.1562 25C22.9688 25 22.75 25 22.5 25C22.4167 25 22 24.9583 21.25 24.875L9.875 36.25C9.95833 36.4583 10 36.6562 10 36.8438C10 37.0312 10 37.25 10 37.5C10 38.875 9.51042 40.0521 8.53125 41.0312C7.55208 42.0104 6.375 42.5 5 42.5V42.5M7.5 17.4375L5.9375 14.0625L2.5625 12.5L5.9375 10.9375L7.5 7.5625L9.0625 10.9375L12.4375 12.5L9.0625 14.0625L7.5 17.4375V17.4375M35 15L32.625 9.875L27.5 7.5L32.625 5.125L35 0L37.375 5.125L42.5 7.5L37.375 9.875L35 15V15" fill={color}/>
  </Svg>
);

const SubscriptionIcon = ({ color = "#3B6D65", size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path d="M2.5 25C1.8125 25 1.22396 24.7552 0.734375 24.2656C0.244792 23.776 0 23.1875 0 22.5V10C0 9.3125 0.244792 8.72396 0.734375 8.23438C1.22396 7.74479 1.8125 7.5 2.5 7.5H22.5C23.1875 7.5 23.776 7.74479 24.2656 8.23438C24.7552 8.72396 25 9.3125 25 10V22.5C25 23.1875 24.7552 23.776 24.2656 24.2656C23.776 24.7552 23.1875 25 22.5 25H2.5ZM2.5 22.5H22.5V10H2.5V22.5ZM10 21.25L17.5 16.25L10 11.25V21.25ZM2.5 6.25V3.75H22.5V6.25H2.5ZM6.25 2.5V0H18.75V2.5H6.25ZM2.5 22.5V10V22.5Z" fill={color}/>
  </Svg>
);

const DownIcon = ({ color = "#812907", size = 25 }) => (
  <Svg width={(size * 19) / 28} height={size} viewBox="0 0 19 28" fill="none">
    <Path d="M2.5 27.5C1.8125 27.5 1.22396 27.2552 0.734375 26.7656C0.244792 26.276 0 25.6875 0 25V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H15C15.6875 0 16.276 0.244792 16.7656 0.734375C17.2552 1.22396 17.5 1.8125 17.5 2.5V6.375C17.875 6.52083 18.1771 6.75 18.4062 7.0625C18.6354 7.375 18.75 7.72917 18.75 8.125V10.625C18.75 11.0208 18.6354 11.375 18.4062 11.6875C18.1771 12 17.875 12.2292 17.5 12.375V25C17.5 25.6875 17.2552 26.276 16.7656 26.7656C16.276 27.2552 15.6875 27.5 15 27.5H2.5ZM2.5 25H15V2.5H2.5V25ZM8.75 18.75L13.75 13.75L12 12L10 13.9375V8.75H7.5V13.9375L5.5 12L3.75 13.75L8.75 18.75Z" fill={color}/>
  </Svg>
);

const FLOAT_DURATION = 3000;

function useFloatingAnimation(offset: number, delay: number = 0, staticTransforms: any[] = []) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(offset, { duration: FLOAT_DURATION, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: FLOAT_DURATION, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, [offset, delay]);

  return useAnimatedStyle(() => ({
    transform: [...staticTransforms, { translateY: translateY.value }],
  }));
}

export function BrandCard() {
  const animatedStyle = useFloatingAnimation(-12, 0);

  return (
    <Animated.View
      className="bg-brand-primary items-center justify-center shadow-heroCard absolute"
      style={[
        {
          width: 147,
          height: 310.5,
          borderRadius: 32,
          left: 20,
          top: 0,
          zIndex: 2,
        },
        animatedStyle,
      ]}
    >
      <InsightIcon />
    </Animated.View>
  );
}

interface ChipProps {
  rotated?: boolean;
}

export function MintChip({ rotated = false }: ChipProps) {
  const animatedStyle = useFloatingAnimation(
    -8,
    800,
    rotated ? [{ rotate: '6.67deg' }, { scaleY: -1 }] : []
  );

  return (
    <Animated.View
      className="bg-brand-mint items-center justify-center absolute shadow-softCard"
      style={[
        {
          width: 79.1,
          height: 131.7,
          borderRadius: 9999,
          right: 110,
          top: 60,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    >
      <View style={rotated ? { transform: [{ scaleY: -1 }] } : undefined}>
        <SubscriptionIcon />
      </View>
    </Animated.View>
  );
}

export function PeachChip({ rotated = false }: ChipProps) {
  const animatedStyle = useFloatingAnimation(
    -10,
    1600,
    rotated ? [{ rotate: '-6.67deg' }] : []
  );

  return (
    <Animated.View
      className="bg-brand-peach items-center justify-center absolute shadow-softCard"
      style={[
        {
          width: 82.2,
          height: 124.7,
          borderRadius: 9999,
          right: 15,
          top: 20,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    >
      <DownIcon />
    </Animated.View>
  );
}

export function MeterPill() {
  const animatedStyle = useFloatingAnimation(-6, 2400);

  return (
    <Animated.View
      className="bg-brand-navyDark items-center flex-row shadow-softCard absolute"
      style={[
        {
          width: 162,
          height: 96,
          borderRadius: 9999,
          right: 20,
          top: 220,
          paddingHorizontal: 20,
          zIndex: 3,
        },
        animatedStyle,
      ]}
    >
      <View
        className="bg-brand-primarySoft items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
        }}
      >
        <Check color="#FFFFFF" size={16} strokeWidth={3} />
      </View>
      <View
        className="bg-background-track ml-3 overflow-hidden"
        style={{
          width: 77.25,
          height: 6,
          borderRadius: 3,
        }}
      >
        <View
          className="bg-brand-primarySoft"
          style={{ width: '70%', height: '100%', borderRadius: 3 }}
        />
      </View>
    </Animated.View>
  );
}

export function HeroContainer({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ width: '100%', height: 350, position: 'relative' }}>
      {children}
    </View>
  );
}
