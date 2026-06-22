import './global.css';

import { StatusBar } from 'expo-status-bar';
import type { ReactElement } from 'react';
import { View } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <StatusBar style="dark" />
      </View>
    </QueryClientProvider>
  );
}
