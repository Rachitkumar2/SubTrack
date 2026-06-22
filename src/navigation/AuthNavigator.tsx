import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PremiumSplashScreen2026 } from '../screens/auth/PremiumSplashScreen2026';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { PhoneLoginScreen } from '../screens/auth/PhoneLoginScreen';
import { VerifyOtpScreen } from '../screens/auth/VerifyOtpScreen';

export type AuthStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  Login: undefined;
  PhoneLogin: undefined;
  VerifyOtp: undefined;
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
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Stack.Navigator>
  );
}
