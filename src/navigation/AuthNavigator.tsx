import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PremiumSplashScreen2026 } from '../screens/auth/PremiumSplashScreen2026';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';

export type AuthStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={PremiumSplashScreen2026} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
