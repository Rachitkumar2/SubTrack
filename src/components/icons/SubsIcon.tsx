import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function SubsIcon({ color = '#DDE2F2', size = 24 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H2ZM2 18H18V8H2V18ZM8 17L14 13L8 9V17ZM2 5V3H18V5H2ZM5 2V0H15V2H5ZM2 18V8V18Z" fill={color}/>
    </Svg>
  );
}
