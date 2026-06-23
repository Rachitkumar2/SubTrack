import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddOptionsScreen } from '../screens/subscriptions/AddOptionsScreen';
import { SubscriptionFormScreen } from '../screens/subscriptions/SubscriptionFormScreen';
import { ReceiptScannerScreen } from '../screens/subscriptions/ReceiptScannerScreen';

export type AddSubscriptionStackParamList = {
  AddOptions: undefined;
  ReceiptScanner: undefined;
  SubscriptionForm: {
    defaultName?: string;
    defaultCategory?: string;
    defaultPrice?: string;
  };
};

const Stack = createNativeStackNavigator<AddSubscriptionStackParamList>();

export function AddSubscriptionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddOptions" component={AddOptionsScreen} />
      <Stack.Screen name="ReceiptScanner" component={ReceiptScannerScreen} />
      <Stack.Screen name="SubscriptionForm" component={SubscriptionFormScreen} />
    </Stack.Navigator>
  );
}
