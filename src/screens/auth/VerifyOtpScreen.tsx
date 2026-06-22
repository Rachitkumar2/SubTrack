import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { verifyPhoneOtp } from '../../services/firebase/auth';

type VerifyOtpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'VerifyOtp'>;

export function VerifyOtpScreen() {
  const navigation = useNavigation<VerifyOtpScreenNavigationProp>();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!code || code.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyPhoneOtp(code);
      // Navigation handled by auth store observer
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFCF0]">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 48 }}>
          
          <View className="items-center mb-3xl">
            <Text className="font-app font-bold text-heroTitle text-text-primary mb-sm text-center">
              Verify Code
            </Text>
            <Text className="font-app text-[16px] text-text-secondary text-center">
              Enter the 6-digit code sent to your phone
            </Text>
          </View>

          <View className="bg-[#FFFFFF] rounded-[32px] p-3xl shadow-softCard border border-[#E6DBCD]">
            <Input
              label="Verification Code"
              placeholder="123456"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />

            <View className="mt-xl">
              <Button
                title="Verify"
                onPress={handleVerify}
                variant="primary"
                disabled={isLoading}
                loading={isLoading}
              />
            </View>
            <View className="mt-md">
              <Button
                title="Go Back"
                onPress={() => navigation.goBack()}
                variant="secondary"
                disabled={isLoading}
              />
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
