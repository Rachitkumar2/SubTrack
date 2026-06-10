import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function AdobeIcon({ size = 24, color = '#E1251B' }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size * (24 / 27)} viewBox="0 0 27 24" fill="none">
      <Path
        d="M16.7733 0H26.6667V24L16.7733 0V0M9.89333 0H0V24L9.89333 0V0M13.3333 7.70667L20.9867 24H17.0933L15.28 19.5467H11.3867L13.3333 7.70667V7.70667"
        fill={color}
      />
    </Svg>
  );
}
