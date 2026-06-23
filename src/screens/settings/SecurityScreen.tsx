import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Fingerprint, ShieldAlert } from 'lucide-react-native';

export function SecurityScreen() {
  const navigation = useNavigation();
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background-app">
      {/* Header */}
      <View className="flex-row items-center px-screenX py-md">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E6DBCD', alignItems: 'center', justifyContent: 'center' }}
        >
          <ChevronLeft size={24} color="#161C27" />
        </TouchableOpacity>
        <Text className="font-app font-bold text-[20px] text-text-primary ml-4">
          Security Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}>
        
        <View className="bg-background-surface rounded-card border border-border-warm overflow-hidden mb-6">
          <View className="flex-row items-center justify-between py-4 px-4 border-b border-border-warm">
            <View className="flex-row items-center flex-1 pr-4">
              <View className="w-10 h-10 rounded-full bg-background-appAlt items-center justify-center mr-3">
                <Fingerprint size={20} color="#6B5A52" />
              </View>
              <View className="flex-1">
                <Text className="font-app text-[16px] font-regular text-text-primary mb-1">
                  App Lock (Biometrics)
                </Text>
                <Text className="font-app text-[13px] text-text-muted">
                  Require Face ID or Fingerprint to open SubTrack.
                </Text>
              </View>
            </View>
            <Switch 
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: '#E0E9EF', true: '#A1401E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity className="flex-row items-center py-4 px-4 bg-background-surface">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full bg-background-appAlt items-center justify-center mr-3">
                <ShieldAlert size={20} color="#6B5A52" />
              </View>
              <View className="flex-1">
                <Text className="font-app text-[16px] font-regular text-text-primary mb-1">
                  Change Password
                </Text>
                <Text className="font-app text-[13px] text-text-muted">
                  Update your account password securely.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text className="text-text-muted text-[13px] font-app text-center mt-4 mx-4">
          Your data is encrypted and securely stored. We never sell or share your personal information.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
