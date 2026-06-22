import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { sendPhoneOtp } from '../../services/firebase/auth';

type PhoneLoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'PhoneLogin'>;

export function PhoneLoginScreen() {
  const navigation = useNavigation<PhoneLoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (text: string) => {
    let digits = text.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 10);

    let formatted = '';
    if (limitedDigits.length > 0) {
      formatted += limitedDigits.slice(0, 5);
    }
    if (limitedDigits.length > 5) {
      formatted += ' ' + limitedDigits.slice(5);
    }

    setPhoneNumber(formatted);
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Remove spaces and manually add the +91 prefix back for Firebase
      const rawE164 = `+91${phoneNumber.replace(/\s/g, '')}`;
      await sendPhoneOtp(rawE164);
      navigation.navigate('VerifyOtp');
    } catch (error: any) {
      Alert.alert('Error', error.message);
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
              Mobile Login
            </Text>
            <Text className="font-app text-[16px] text-text-secondary text-center">
              We will send you a verification code
            </Text>
          </View>

          <View className="bg-[#FFFFFF] rounded-[32px] p-3xl shadow-softCard border border-[#E6DBCD]">
            <Input
              label="Phone Number"
              placeholder="98765 43210"
              keyboardType="phone-pad"
              prefix="+91"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
            />

            <View className="mt-xl">
              <Button
                title="Send Code"
                onPress={handleSendOtp}
                variant="primary"
                disabled={isLoading}
                loading={isLoading}
              />
            </View>
            <View className="mt-md">
              <Button
                title="Cancel"
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
