import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { SocialButton } from '../../components/common/SocialButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Smartphone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { signInWithEmail } from '../../services/firebase/auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      // Navigation is handled automatically by the RootNavigator listening to authStore
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFCF0]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 48, paddingBottom: 64 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="items-center mb-3xl">
            <Image
              source={require('../../../public/logo.png')}
              style={{ width: 64, height: 64, marginBottom: 24 }}
              resizeMode="contain"
            />
            <Text 
              className="font-app font-bold text-heroTitle text-text-primary mb-sm text-center"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Welcome Back
            </Text>
            <Text className="font-app text-[16px] text-text-secondary text-center">
              Sign in to continue tracking
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-[#FFFFFF] rounded-[32px] p-3xl shadow-softCard border border-[#E6DBCD] mb-3xl">
            <Input
              label="Email"
              placeholder="john@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              isPassword
              value={password}
              onChangeText={setPassword}
            />

            <View className="mt-xl">
              <Button
                title="Sign In"
                onPress={handleLogin}
                variant="primary"
                disabled={isLoading}
                loading={isLoading}
              />
            </View>
          </View>

          {/* Social Sign-in */}
          <View className="items-center mb-xl">
            <Text className="font-app text-caption text-text-secondary mb-lg">
              Or continue with
            </Text>

            <View className="flex-row w-full gap-4">
              <SocialButton
                title="GOOGLE"
                onPress={() => { }}
                icon={<AntDesign name="google" size={20} color="#A1401E" />}
              />
              <SocialButton
                title="MOBILE"
                onPress={() => { }}
                icon={<Smartphone size={20} color="#A1401E" />}
              />
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row items-center justify-center mt-auto pt-lg">
            <Text className="font-app text-caption text-text-secondary">
              Don't have an account?{' '}
            </Text>
            <Text 
              className="font-app font-bold text-caption text-brand-primary"
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
