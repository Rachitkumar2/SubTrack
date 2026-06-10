import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function HomeIcon({ color = '#DDE2F2', size = 24 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 18" fill="none">
      <Path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill={color}/>
    </Svg>
  );
}
