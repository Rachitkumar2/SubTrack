import './global.css';

import { StatusBar } from 'expo-status-bar';
import type { ReactElement } from 'react';
import { View } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App(): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <RootNavigator />
      <StatusBar style="dark" />
    </View>
  );
}
